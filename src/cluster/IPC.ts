import { EventEmitter } from "events"
import {
  IPCEvent,
  IPCEventListener,
} from 'types/slicey'

class IPC extends EventEmitter {
  private _events = new Map<string,((msg: IPCEvent) => void)[]>()
  constructor() {
    super()
    this._listener()
  }
  private _listener(): void {
    process.on('message', (msg: IPCEvent) => {
      const event = this._events.get(msg.event)
      if (event) {
        event.forEach((cb) => {
          cb(msg)
        })
      }
    })
  }
  public register(event: string, cb: (msg: IPCEvent) => void): IPCEventListener {
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
  public unregister(event: IPCEventListener): void
  public unregister(event: string, cb: ((msg: IPCEvent) => void)): void
  public unregister(event: IPCEventListener | string, cb?: ((msg: IPCEvent) => void)): void {
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
  public unregisterEvent(event: string): void {
    this._events.delete(event)
  }
  public unregisterAll(): void {
    this._events = new Map()
  }
  public broadcast(event: string, msg: unknown = {}): void {
    process.send({
      payload: "broadcast",
      data: {
        event,
        msg,
      },
    })
  }
  public sendTo(cluster: number, event: string, msg: unknown = {}): void {
    process.send({
      payload: "sendTo",
      cluster,
      data: {
        event,
        msg,
      },
    })
  }
}

export default IPC
