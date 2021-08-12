try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const djs: typeof import('discord.js') = require('discord.js')
  const version = djs.version
  if (parseInt(version.split(".")[0]) < 13) {
    throw Error("Version mismatch discord.js >=13.0.0 required")
  }
} catch (error) {
  console.log("Discord.js is required to use this library!\n", error)
}
const nodev = process.version.replace("v", "").split(".")
if (parseInt(nodev[0]) < 16) {
  throw Error("Node >=16.6.0 is required to use this package!")
} else if (parseInt(nodev[1]) < 6) {
  throw Error("Node >=16.6.0 is required to use this package!")
}

const version = process.env.npm_package_version
import Client from './Client'
import ClusterUtil from './cluster/ClusterUtil' 

export = {
  version,
  Client,
  ClusterUtil,
}
