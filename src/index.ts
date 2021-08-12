const version = "1.0.1"
import Client from './Client'
import ClusterUtil from './cluster/ClusterUtil' 

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const djs: typeof import('discord.js') = require('discord.js')
  const version = djs.version
  if (parseInt(version.split(".")[0]) < 12) {
    throw Error("Version mismatch discord.js >=12.0.0 required")
  }
} catch (error) {
  console.log("Discord.js is required to use this library!\n", error)
}

export = {
  version,
  Client,
  ClusterUtil,
}
