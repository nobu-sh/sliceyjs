import { EventEmitter } from 'events'
import nodeCluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length
import {
  ClusterStats,
  ClusterUtilOptions, IPCEvent, ProcessEventPartials,
} from 'types/slicey'
import {
  getGateway,
  createRangeArray,
  chunk,
} from '../utils'
import path from 'path'
import { ClusterUtilPayloadIgnoreList } from '../Constants'
class ClusterUtil extends EventEmitter {
  private _token: string
  private _file: string
  private _totalShards: number = null
  private _totalClusters: number = numCPUs
  private _firstShardId = 0
  private _lastShardId = 0
  private _ignoreClusterError: boolean
  private _clusters = new Map<number, {
    workerId: number
    lastShardId: number
    firstShardId: number
  }>()
  private _workers = new Map<number, number>()

  constructor (token: string, file: string, options: ClusterUtilOptions) {
    super()
    this._token = token
    this._file = file
    if (options) {
      this._totalShards = options.shards || null
      this._totalClusters = options.clusters || numCPUs
      this._firstShardId = options.firstShardId || 0
      this._lastShardId = options.lastShardId || 0
      this._ignoreClusterError = options.ignoreClusterError || false
    }

    // Alot of stuff based off of listening for responses
    process.setMaxListeners(Infinity)
    nodeCluster.setMaxListeners(Infinity)
  }
  public isMaster(): boolean {
    return nodeCluster.isMaster
  }
  private preStart(): void {
    process.nextTick(async () => {
      this.emit("info", "ClusterUtil has started")
      if (!this._totalShards) {
        const gateway = await getGateway(this._token)
        this._totalShards = gateway.shards
      }
      if (this._totalClusters > this._totalShards) {
        if (!this._ignoreClusterError) {
          console.error(new Error("More clusters open than shards, reducing cluster amount to shard amount"))
        }
        this._totalClusters = this._totalShards
      }

      if (this._lastShardId === 0) this._lastShardId = this._totalShards - 1

      this.emit("info", `Calculations Complete, Starting ${this._totalShards} Shards Across ${this._totalClusters} Clusters`)

      nodeCluster.setupMaster({
        silent: false,
      })

      this.start()
    })
  }
  private async awaitResponse(): Promise<boolean> {
    return new Promise((res) => {
      const cb = (w, msg) => {
        if (msg.payload && msg.payload === "shardsStarted") {
          res(true)
          nodeCluster.removeListener('message', cb)
        }
      }
      nodeCluster.on('message', cb)
    })
  }
  private async start(): Promise<void> {
    const shards = chunk(createRangeArray(this._firstShardId, this._lastShardId), this._totalClusters)
    for (const chunk of shards) {
      const clusterId = shards.indexOf(chunk)
      const firstShardId = Math.min(...chunk)
      const lastShardId = Math.max(...chunk)
      
      const worker = nodeCluster.fork({
        SLICEY_CLUSTER_UTIL_ENABLED: true,
        SLICEY_TOTAL_SHARDS: this._totalShards,
        SLICEY_FIRST_SHARD_ID: firstShardId,
        SLICEY_LAST_SHARD_ID: lastShardId,
        SLICEY_CLUSTER_ID: clusterId,
        SLICEY_TOTAL_CLUSTER: this._totalClusters,
      })

      const cluster = this._clusters.get(clusterId)
      this._clusters.set(clusterId, Object.assign(cluster || {}, {
        firstShardId,
        lastShardId,
        workerId: worker.id,
      }))
      this._workers.set(worker.id, clusterId)

      await this.awaitResponse()
    }
    this.emit("info", "All clusters have launched")
  }
  private registerErrorHandlers(): void {
    process.on('uncaughtException', err => {
      this.emit("error", err)
    })
  }
  private registerPayloads(): void {
    nodeCluster.on('message', async(worker, message: ProcessEventPartials) => {
      if (message.payload) {
        if (ClusterUtilPayloadIgnoreList.includes(message.payload)) return
        const clusterId = this._workers.get(worker.id)
        try {
          this.payloads[message.payload](message, clusterId)
        } catch (error) {
          this.emit("error", `Failed to execute payload function, may be because not valid payload event | ERR: ${error}`)
        }
      }
    })
  }
  private registerWorkerHandles(): void {
    nodeCluster.on('disconnect', worker => {
      const clusterId = this._workers.get(worker.id)
      const cluster = this._clusters.get(clusterId)
      this.emit("clusterWarn", {
        clusterID: clusterId,
        shards: [cluster.firstShardId, cluster.lastShardId],
        message: "Cluster Disconnected",
      })
    })
    nodeCluster.on('exit', (worker, code, signal) => {
      this.restartCluster(worker, code, signal)
    })
  }
  private async restartCluster(worker: nodeCluster.Worker, code: number, signal: string): Promise<void> {
    const clusterId = this._workers.get(worker.id)
    const cluster = this._clusters.get(clusterId)
    this.emit("clusterDeath", {
      shards: [cluster.firstShardId, cluster.lastShardId],
      clusterID: clusterId,
      message: `Cluster Died, Attempting Restart`,
      code: code,
      signal: signal,
    })
    this.emit("clusterInfo", {
      shards: [cluster.firstShardId, cluster.lastShardId],
      clusterID: clusterId,
      message: `Restarting Cluster`,
    })

    const newWorker = nodeCluster.fork({
      SLICEY_CLUSTER_UTIL_ENABLED: true,
      SLICEY_TOTAL_SHARDS: this._totalShards,
      SLICEY_FIRST_SHARD_ID: cluster.firstShardId,
      SLICEY_LAST_SHARD_ID: cluster.lastShardId,
      SLICEY_CLUSTER_ID: clusterId,
      SLICEY_TOTAL_CLUSTER: this._totalClusters,
    })
    
    this._workers.delete(worker.id)
    this._clusters.set(clusterId, Object.assign(cluster, { workerId: newWorker.id }))
    this._workers.set(newWorker.id, clusterId)
    
    await this.awaitResponse()

  }
  public async launch(): Promise<void> {
    if (this.isMaster()) {
      this.registerErrorHandlers()
      this.preStart()
    } else if (nodeCluster.isWorker) {
      try {
        import(path.resolve(this._file))
      } catch {
        throw Error("Could not find the file specified in ClusterUtil. Try using path and creating an absolute path!")
      }
    }
    this.registerPayloads()
    this.registerWorkerHandles()
  }
  private payloads = {
    info: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('info', data)
    },
    error: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('error', data)
    },
    clusterDeath: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('clusterDeath', data)
    },
    clusterError: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('clusterError', data)
    },
    clusterWarn: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('clusterWarn', data)
    },
    clusterInfo: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('clusterInfo', data)
    },
    shardDisconnect: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('shardDisconnect', data)
    },
    shardReady: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('shardReady', data)
    },
    shardResume: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('shardResume', data)
    },
    shardReconnecting: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('shardReconnecting', data)
    },
    shardError: (message: ProcessEventPartials): void => {
      const data = message.data
      this.emit('shardError', data)
    },
    broadcast: (message: ProcessEventPartials): void => {
      this.broadcast(message.data as unknown as IPCEvent, 0)
    },
    sendTo: (message: ProcessEventPartials): void => {
      this.sendTo(message.cluster, message.data as unknown as IPCEvent)
    },
    ipcStatsRequest: async (message: ProcessEventPartials): Promise<void> => {
      this.sendTo(message.cluster, {
        event: "IPCClusterUtilStatsRequest--default",
        msg: await this.getAllStats(),
      })
    },
  }
  public broadcast(message: IPCEvent, i?: number): void {
    if (i === undefined || i === null) {
      i = 0
    }
    const cluster = this._clusters.get(i)
    if (cluster) {
      nodeCluster.workers[cluster.workerId].send(message)
      this.broadcast(message, i += 1)
    }
  }
  public sendTo(clusterId: number, message: IPCEvent): void {
    const cluster = this._clusters.get(clusterId)
    if (cluster) {
      const worker = nodeCluster.workers[cluster.workerId]
      if (worker) {
        worker.send(message)
      }
    }
  }
  public async getAllStats(): Promise<ClusterStats[]> {
    // const currentClusters = new Number(this._clusters.size)
    const responses = []
    for (const cluster of this._clusters.values()) {
      function getStat() {
        return new Promise((res) => {
          const cb = (w, m) => {
            if (m.payload === "stats") {
              res(m.data)
              nodeCluster.removeListener('message', cb)
            }
          }
          nodeCluster.on('message', cb)
          nodeCluster.workers[cluster.workerId].send({ payload: "stats" })
        })
      }

      responses.push(await getStat())
    }

    return Promise.all(responses)
  }
  public async getClusterStats(clusterId: number): Promise<ClusterStats | undefined> {
    return new Promise((res) => {
      const cluster = this._clusters.get(clusterId)
      if (!cluster) return res(undefined)

      const cb = (w, m) => {
        if (m.payload === "stats") {
          res(m.data)
          nodeCluster.removeListener('message', cb)
        }
      }
      nodeCluster.on('message', cb)
      nodeCluster.workers[cluster.workerId].send({ payload: "stats" })
    })
  }
}

export default ClusterUtil
