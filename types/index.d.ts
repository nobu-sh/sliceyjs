/* eslint-disable @typescript-eslint/no-explicit-any */
import DJS from 'discord.js'
import { EventEmitter } from 'events'

declare class Client extends DJS.Client {
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
declare class ClusterUtil extends EventEmitter {
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
  /**
   * Broadcast a callback to all clusters and get the return values from each callback
   * 
   * Can be sync or async
   */
  broadcastEval(cb: BroadcastEvalCallback): Promise<BroadcastEvalClusterReturn[]>
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
export interface ClusterUtilIPC {
  /**
   * Create New Event Listener
   */
  on(event: string, cb: (...content: unknown[]) => void): IPCEventListener
  /**
   * Remove Specific Listener From Specific Event
   */
  removeListener(event: IPCEventListener): void
  /**
   * Remove Specific Listener From Specific Event
   */
  removeListener(event: string, cb: ((...content: unknown[]) => void)): void
  /**
   * Remove Specific Listener From Specific Event
   */
  removeListener(event: IPCEventListener | string, cb?: ((...content: unknown[]) => void)): void
  /**
   * Remove All Listeners For A Specific Event
   */
  removeEventListeners(event: string): void
  /**
   * Remove All Listners For All Events
   */
  removeAllListeners(): void
  /**
   * Send Event To All Clusters
   */
  send(event: string, ...content: unknown[]): void
  /**
   * Send Event To Specific Cluster
   */
  sendTo(cluster: number, event: string, ...content: unknown[]): void
  /**
   * Get All Cluster Stats
   */
  getAllStats(): Promise<ClusterStats[]>
  /**
   * Broadcast a callback to all clusters and get the return values from each callback
   * 
   * Can be sync or async
   */
  broadcastEval(cb: BroadcastEvalCallback): Promise<BroadcastEvalClusterReturn[]>
}

export type BroadcastEvalCallback = (client: Client) => any

export interface BroadcastEvalPayloadPartial extends ProcessEventPartials {
  data: {
    callback: string
  }
}

export interface BroadcastEvalReturnPayloadPartial extends ProcessEventPartials {
  data: BroadcastEvalClusterReturn
}

export interface BroadcastEvalClusterReturn {
  cluster: number
  totalShards: number
  shards: [number, number]
  totalClusters: number
  failed: boolean
  result: any | null
  error: Error | null
}

export interface ProcessEventPartials {
  payload: string
  data?: any
  cluster?: number
  [key: string]: any
}
export interface IPCEvent {
  event: string
  content?: unknown[]
}
export interface IPCEventListener {
  removeListener: (() => void)
  index: number
  event: string
}
export interface ClusterErrorEvent {
  clusterShards: [number, number]
  clusterId: number
  message: string
  error: Error
}
export interface ClusterWarnEvent {
  clusterShards: [number, number]
  clusterId: number
  message: string
}
export interface ClusterInfoEvent {
  clusterShards: [number, number]
  clusterId: number
  message: string
}
export interface ShardDisconnectEvent {
  clusterShards: [number, number]
  clusterId: number
  shardId: number
  event: DJS.CloseEvent
}

export interface ShardReadyEvent {
  clusterShards: [number, number]
  clusterId: number
  shardId: number
  message: string
}

export interface ShardResumeEvent {
  clusterShards: [number, number]
  clusterId: number
  shardId: number
  message: string
}

export interface ShardReconnectingEvent {
  clusterShards: [number, number]
  clusterId: number
  shardId: number
  message: string
}

export interface ShardErrorEvent {
  clusterShards: [number, number]
  clusterId: number
  shardId: number
  error: Error
}
export interface ClusterDeathEvent {
  clusterShards: [number, number]
  clusterId: number
  message: string
  code: number
  signal: string
}
export interface ClusterUtilEvents {
  info: [string]
  error: [Error|string]
  clusterDeath: [ClusterDeathEvent]
  clusterError: [ClusterErrorEvent]
  clusterWarn: [ClusterWarnEvent]
  clusterInfo: [ClusterInfoEvent]
  shardDisconnect: [ShardDisconnectEvent]
  shardReady: [ShardReadyEvent]
  shardResume: [ShardResumeEvent]
  shardReconnecting: [ShardReconnectingEvent]
  shardError: [ShardErrorEvent]
}
export interface ClusterUtilOptions {
  clusters?: number
  shards?: number
  firstShardId?: number
  lastShardId?: number
  ignoreClusterError?: boolean
}
export interface ClusterPartial {
  readonly totalShards: number
  readonly firstShardId: number
  readonly lastShardId: number
  readonly id: number
  readonly totalClusters: number
  /**
   * IPC, Used To Send And Recieve Events From Other Clusters
   */
  readonly ipc: ClusterUtilIPC
  /**
   * Starts Cluster Manager Listeners
   * 
   * There is no need to ever call this method
   */
  start(): void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SliceyOptions extends DJS.ClientOptions {

}
export interface DiscordBotGateway {
  url: string
  shards: number
  session_start_limit: {
    total: number
    remaining: number
    reset_after: number
    max_concurrency: number
  }
}

export interface ClusterStats {
  id: number
  guilds?: number
  users?: number
  uptime?: number
  ram?: number
  shards?: ShardStats[]
  largeGuilds?: number
  exclusiveGuilds?: number
}

export interface ShardStats {
  id: number
  status: number
  latency: number
}
