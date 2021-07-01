import {
  Client as DJSClient,
  // Constants,
} from 'discord.js'
import {
  ClusterPartial as SliceyClusterPartial,
  SliceyOptions,
} from 'types'
import ClusterPartial from './cluster/ClusterPartial'
import { createRangeArray } from './utils'
class Client extends DJSClient {
  public readonly token: string
  public cluster: SliceyClusterPartial | undefined = undefined
  public sliceyOptions: SliceyOptions // For Time Being
  constructor(token: string, options?: SliceyOptions) {
    super(options)
    this.sliceyOptions = this.options
    this.token = token
    if (process.env.SLICEY_CLUSTER_UTIL_ENABLED) {
      this.cluster = new ClusterPartial(this)
      this.cluster.start()
      this.sliceyOptions = Object.assign(this.sliceyOptions, {
        shardCount: this.cluster.totalShards,
        shards: createRangeArray(this.cluster.firstShardId, this.cluster.lastShardId),
      })
    }
  }

  public login(): Promise<string> {
    this.options = this.sliceyOptions

    return super.login(this.token)
  }
}

export default Client
