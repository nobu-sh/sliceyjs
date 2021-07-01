import {
  BroadcastEvalCallback,
  BroadcastEvalClusterReturn,
  ClusterStats,
  IPCEvent,
  IPCEventListener,
} from 'types'

class IPC {
  private _events = new Map<string,((...content: unknown[]) => void)[]>()
  private clusterId: number
  constructor(clusterId: number) {
    this.clusterId = clusterId
    this._listener()
  }
  private _listener(): void {
    process.on('message', (msg: IPCEvent) => {
      const event = this._events.get(msg.event)
      if (event) {
        event.forEach((cb) => {
          cb(...msg.content)
        })
      }
    })
  }
  public on(event: string, cb: (...content: unknown[]) => void): IPCEventListener {
    if (!this._events.get(event)) this._events.set(event, [])
    this._events.get(event).push(cb)
    const index = this._events.get(event).indexOf(cb)

    const removeListener = (): void => {
      this._events.get(event).splice(index, 1)
    }

    return {
      removeListener,
      index,
      event,
    }
  }
  public removeListener(event: IPCEventListener): void
  public removeListener(event: string, cb: ((...content: unknown[]) => void)): void
  public removeListener(event: IPCEventListener | string, cb?: ((...content: unknown[]) => void)): void {
    if (typeof event === 'string') {
      if (cb) {
        if (this._events.get(event)) {
          const index = this._events.get(event).indexOf(cb)
          if (index !== -1) this._events.get(event).splice(index, 1)
        }
      }
    } else {
      if (event.removeListener) event.removeListener()
      else {
        if (event.index && event.event) {
          this._events.get(event.event).splice(event.index, 1)
        }
      }
    }
  }
  public removeEventListeners(event: string): void {
    this._events.delete(event)
  }
  public removeAllListeners(): void {
    this._events = new Map()
  }
  public send(event: string, ...content: unknown[]): void {
    process.send({
      payload: "broadcast",
      data: {
        event,
        content: content || [],
      },
    })
  }
  public sendTo(cluster: number, event: string, ...content: unknown[]): void {
    process.send({
      payload: "sendTo",
      cluster,
      data: {
        event,
        content: content || [],
      },
    })
  }
  public async getAllStats(): Promise<ClusterStats[]> {
    return new Promise((res) => {
      const cb = (msg: IPCEvent) => {
        if (msg.event === "IPCClusterUtilStatsRequest--default") {
          res(msg.content as ClusterStats[])
          process.removeListener('message', cb)
        }
      }
      process.on('message', cb)
      process.send({
        payload: "ipcStatsRequest",
        cluster: this.clusterId,
      })
    })
  }
  public async broadcastEval(callback: BroadcastEvalCallback): Promise<BroadcastEvalClusterReturn[]> {
    return new Promise((res) => {
      const cb = (msg: IPCEvent) => {
        if (msg.event === "IPCClusterUtilbroadcastEvalRequest--default") {
          res(msg.content as BroadcastEvalClusterReturn[])
          process.removeListener('message', cb)
        }
      }
      process.on('message', cb)
      process.send({
        payload: "broadcastEvalRequest",
        cluster: this.clusterId,
        data: { callback: callback.toString() },
      })
    })
  }
}

export default IPC
