/* eslint-disable @typescript-eslint/no-explicit-any */
import DJS from 'discord.js'
import { EventEmitter } from 'events'
export interface ProcessEventPartials {
  payload: string
  data?: Record<string, unknown>
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
  error: unknown
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
export interface ClusterUtilEvents {
  clusterError: [ClusterErrorEvent]
  clusterWarn: [ClusterWarnEvent]
  clusterInfo: [ClusterInfoEvent]
  shardDiconnect: [ShardDisconnectEvent]
  shardReady: [ShardReadyEvent]
  shardResume: [ShardResumeEvent]
  shardReconnecting: [ShardReconnectingEvent]
  shardError: [ShardErrorEvent]
}

export interface ClusterUtil extends EventEmitter {
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
  register(event: string, cb: (msg: IPCEvent) => void): IPCEventListener
  unregister(event: IPCEventListener): void
  unregister(event: string, cb: ((msg: IPCEvent) => void)): void
  unregister(event: IPCEventListener | string, cb?: ((msg: IPCEvent) => void)): void
  unregisterEvent(event: string): void
  unregisterAll(): void
  broadcast(event: string, msg: unknown): void
  sendTo(cluster: number, event: string, msg: unknown): void
}
export interface ClusterPartial {
  readonly shards: number
  readonly totalShards: number
  readonly firstShardId: number
  readonly lastShardId: number
  readonly id: number
  readonly totalClusters: number
  readonly ipc: ClusterUtilIPC
  /**
   * Starts Cluster Manager Listeners
   * 
   * There is no need to ever call this method
   */
  start(): void
}
export interface Client extends DJS.Client {
  // readonly cluster: ClientCluster | undefined
  readonly token: string
  readonly cluster: ClusterPartial
  readonly options: DJS.ClientOptions
  login(): Promise<string>
}
