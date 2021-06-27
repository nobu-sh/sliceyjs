/* eslint-disable @typescript-eslint/no-explicit-any */
import DJS from 'discord.js'
import { EventEmitter } from 'events'
import {
  ClusterPartial,
  ClusterUtilEvents,
} from './slicey'
declare module "sliceyjs" {
  export const version: string
  export class Client extends DJS.Client {
    readonly token: string
    readonly cluster: ClusterPartial | undefined
    readonly options: DJS.ClientOptions
    constructor (token: string, options?: DJS.ClientOptions)
    login(): Promise<string>
  }
  export class ClusterUtil extends EventEmitter {
    constructor(token: string, file: string, options: unknown)
    on<K extends keyof ClusterUtilEvents>(event: K, listener: (...args: ClusterUtilEvents[K]) => void): this
    on<S extends string | symbol>(
      event: Exclude<S, keyof ClusterUtilEvents>,
      listener: (...args: any[]) => void, 
    ): this
    once<K extends keyof ClusterUtilEvents>(event: K, listener: (...args: ClusterUtilEvents[K]) => void): this
    once<S extends string | symbol>(
      event: Exclude<S, keyof ClusterUtilEvents>,
      listener: (...args: any[]) => void, 
    ): this
    emit<K extends keyof ClusterUtilEvents>(event: K, listener: (...args: ClusterUtilEvents[K]) => void): boolean
    emit<S extends string | symbol>(
      event: Exclude<S, keyof ClusterUtilEvents>,
      listener: (...args: any[]) => void, 
    ): boolean
  }
}
