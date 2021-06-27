import {
  Client as DJSClient,
  ClientOptions,
} from 'discord.js'
import {
  ClusterPartial as SliceyClusterPartial,
} from 'types/slicey'

class Client extends DJSClient {
  public readonly token: string
  public readonly cluster: SliceyClusterPartial | undefined = undefined
  public readonly options: ClientOptions // For Time Being
  // public readonly cluster: ClientCluster | undefined = undefined
  constructor(token: string, options?: ClientOptions) {
    super()
    this.options = options
    this.token = token
  }

  public async login(): Promise<string> {
    if (this.cluster) {
      this.cluster.start()
    }

    return await super.login(this.token)
  }
}

export default Client
