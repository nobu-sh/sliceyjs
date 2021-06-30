/* eslint-disable @typescript-eslint/no-explicit-any */
import DJS from 'discord.js'
export interface ProcessEventPartials {
  payload: string
  data?: Record<string, unknown>
  cluster?: number
  [key: string]: any
}
export interface IPCEvent {
  event: string
  msg?: any
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
export interface ClusterUtilIPC {
  /**
   * Register New Listener
   */
  register(event: string, cb: (msg: IPCEvent) => void): IPCEventListener
  /**
   * Unregister Old Listener
   */
  unregister(event: IPCEventListener): void
  /**
   * Unregister Old Listener
   */
  unregister(event: string, cb: ((msg: IPCEvent) => void)): void
  /**
   * Unregister Old Listener
   */
  unregister(event: IPCEventListener | string, cb?: ((msg: IPCEvent) => void)): void
  /**
   * Unregister All Listeners For An Event
   */
  unregisterEvent(event: string): void
  /**
   * Unregister Everything
   */
  unregisterAll(): void
  /**
   * Broadcast To All Clusters
   */
  broadcast(event: string, msg: unknown): void
  /**
   * Send To Specific Cluster
   */
  sendTo(cluster: number, event: string, msg: unknown): void
  /**
   * Get All Cluster Stats
   */
  getAllStats(clusterId: number): Promise<ClusterStats[]>
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
