import {
  ClusterPartial as SliceyClusterPartial,
  ClusterUtilIPC,
  ProcessEventPartials,
} from 'types/slicey'
import IPC from './IPC'
import Client from 'Client'
class ClusterPartial implements SliceyClusterPartial {
  private _client: Client
  // public readonly shards: number
  public readonly totalShards: number = undefined
  public readonly firstShardId: number = undefined
  public readonly lastShardId: number = undefined
  public readonly id: number = undefined
  public readonly totalClusters: number = undefined
  public readonly ipc: ClusterUtilIPC = new IPC()
  private started = false
  constructor(client: Client) {
    this._client = client
    // this.shards = process.env.slicey_
    this.totalShards = parseInt(process.env.SLICEY_TOTAL_SHARDS)
    this.firstShardId = parseInt(process.env.SLICEY_FIRST_SHARD_ID)
    this.lastShardId = parseInt(process.env.SLICEY_LAST_SHARD_ID)
    this.id = parseInt(process.env.SLICEY_CLUSTER_ID)
    this.totalClusters = parseInt(process.env.SLICEY_TOTAL_CLUSTER)

    // Alot of stuff based off of listening for responses
    process.setMaxListeners(Infinity)
  }
  private errorHandle(): void {
    process.on('uncaughtException', (err) => {
      process.send({
        payload: 'clusterError',
        data: {
          clusterShards: [this.firstShardId, this.lastShardId],
          clusterId: this.id,
          message: "Uncaught Exception",
          error: err,
        },
      })
    })
    process.on('unhandledRejection', (err: Error) => {
      process.send({
        payload: "clusterError",
        data: {
          clusterShards: [this.firstShardId, this.lastShardId],
          clusterId: this.id,
          message: "Unhandled Rejection",
          error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        },
      })
    })
  }
  private registerPayloads(): void {
    process.on('message', (msg: ProcessEventPartials) => {
      if (msg.payload) {
        try {
          this.payloads[msg.payload](msg)
        } catch (err) {
          process.send({
            payload: 'clusterError',
            data: {
              clusterShards: [this.firstShardId, this.lastShardId],
              clusterId: this.id,
              message: `Failed to execute payload function, may be because not valid payload event | ERR: ${err}`,
              error: err,
            }, 
          })
        }
      }
    })
  }

  private registerClientListeners(): void {
    this._client.on('shardDisconnect', (event, id) => {
      process.send({
        payload: "shardDisconnect",
        data: {
          clusterId: this.id,
          event,
          shardId: id,
          clusterShards: [this.firstShardId, this.lastShardId],
        },
      })
    })
      .on('shardReady', (id) => {
        process.send({
          payload: "shardReady",
          data: {
            clusterId: this.id,
            message: "Shard is ready",
            shardId: id,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .on('shardResume', (id) => {
        process.send({
          payload: "shardResume",
          data: {
            clusterId: this.id,
            message: "Shard has resumed",
            shardId: id,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .on('shardReconnecting', (id) => {
        process.send({
          payload: "shardReconnecting",
          data: {
            clusterId: this.id,
            message: "Shard is reconnecting",
            shardId: id,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .on('shardError', (err, id) => {
        process.send({
          payload: "shardError",
          data: {
            clusterId: this.id,
            error: err,
            shardId: id,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .on('warn', (message) => {
        process.send({
          payload: "clusterWarn",
          data: {
            clusterId: this.id,
            message,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .on('error', (err) => {
        process.send({
          payload: "clusterError",
          data: {
            clusterId: this.id,
            message: "Client Error Occured",
            error: err,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
      })
      .once('ready', () => {
        process.send({
          payload: "clusterInfo",
          data: {
            clusterId: this.id,
            message: `Shards ${this.firstShardId} - ${this.lastShardId} are ready`,
            clusterShards: [this.firstShardId, this.lastShardId],
          },
        })
        process.send({ payload: "shardsStarted" })
      })
  }

  public start(): void {
    if (!this.started) {
      this.errorHandle()
      this.registerPayloads()
      this.registerClientListeners()
      this.started = true
    }
  }

  private payloads = {
    stats: (): void => {
      const shards = []
      for (const shard of this._client.ws.shards.values()) {
        shards.push({
          id: shard.id,
          status: shard.status,
          latency: shard.ping,
        })
      }
      process.send({
        payload: "stats",
        data: {
          id: this.id,
          guilds: this._client.guilds.cache.size,
          users: this._client.users.cache.size,
          uptime: this._client.uptime,
          ram: process.memoryUsage().rss,
          shards,
          largeGuilds: this._client.guilds.cache.filter(g => g.large),
          voiceConnections: this._client.voice.connections.size,
          exclusiveGuilds: this._client.guilds.cache.filter(g => g.members.cache.filter(m => m.user.bot).size === 1).size,
        },
      })
    },
  }
}

export default ClusterPartial
