/* eslint-disable @typescript-eslint/no-explicit-any */
import DJS from 'discord.js'
import { EventEmitter } from 'events'
import {
  ClusterPartial,
  ClusterStats,
  ClusterUtilEvents,
  ClusterUtilOptions,
  IPCEvent,
  SliceyOptions,
} from './slicey'
declare module "sliceyjs" {
  export const version: string
  /**
   * SliceyJS Custom Client Extension Of DJS Client
   */
  export class Client extends DJS.Client {
    /**
     * Client Token
     */
    readonly token: string
    /**
     * Client Cluster Partial.
     * @returns `undefined` if not using ClusterUtil.
     */
    readonly cluster: ClusterPartial | undefined
    /**
     * Options Passed To Slicey Client
     * @todo Add More
     */
    readonly sliceyOptions: SliceyOptions
    constructor (token: string, options?: SliceyOptions)
    /**
     * Connect Client To Gateway
     */
    login(): Promise<string>
  }
  /**
   * Cluster Utility. Used To Cluster And Shard Client
   */
  export class ClusterUtil extends EventEmitter {
    constructor(token: string, file: string, options: ClusterUtilOptions)
    /**
     * Launch ClusterUtil
     */
    launch(): Promise<void>
    /**
     * Broadcast to all clusters
     */
    broadcast(message: IPCEvent): void
    /**
     * Send to a specific cluster
     */
    sendTo(cluster: number, message: IPCEvent): void
    /**
     * Get all stats. Only works on master proc.
     * 
     * Use `ClusterUtil#isMaster` to check if the proc is master or child
     */
    getAllStats(): Promise<ClusterStats[]>
    /**
     * Get specfic cluster stats. Only works on master proc.
     * 
     * Use `ClusterUtil#isMaster` to check if the proc is master or child
     */
    getClusterStats(clusterId: number): Promise<ClusterStats | undefined>
    /**
     * Check if current process is master process
     */
    isMaster(): boolean
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
