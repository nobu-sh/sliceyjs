import React from 'react';
import CodeBlock from '../../components/CodeBlock'

const jsPack = {
  "name": "testslicey",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "discord.js": "^12.5.3",
    "sliceyjs": "^1.0.1"
  },
}
const indexSimple =
`const { ClusterUtil } = require('sliceyjs')
const path = require('path')

const manager = new ClusterUtil('Legit Token', path.resolve('./bot.js'), {
  ignoreClusterError: true
})

manager.on('info', (info) => {
  console.log("[INFO]:", info)
})
  .on('error', (err) => {
    console.error("[ERROR]:", error)
  })
  .on('clusterInfo', (cinfo) => {
    console.log("[CLUSTERINFO]:", cinfo)
  })
  .on('shardReady', (shard) => {
    console.log("[SHARDREADY]:", shard)
  })

manager.launch()`
const botSimple = 
`const { Client } = require('sliceyjs')
const bot = new Client('Legit Token')

bot.on('ready', () => {
  console.log(\`Logged in as \${bot.user.tag}!\`)
  console.log("Cluster ID? :", bot.cluster ? bot.cluster.id : undefined)
})

bot.login()`
export default function App() {
  return (
    <div>
      <h1 id="mtitle">Multithreading</h1>
      <br />
      <p id="mdes">By default nodejs runs on only one thread. When attempting to handle multiple websocket connections this could become an issue as that single thread will begin to become stressed with all the incoming payloads from the websocket connections. Thus Slicey has multithreading which uses nodes <a href="https://nodejs.org/api/cluster.html#cluster_cluster">Cluster</a> module to spread your shards across multiple threads.</p>
      <br />
      <h2>ClusterUtil</h2>
      <div className="spacer"></div>
      <p>Examples in javascipt, typescript is same concept just replace requires with imports.</p>
      <br />
      <code className="inline">package.json</code>
      <CodeBlock className="spacecode" language="json">{JSON.stringify(jsPack, undefined, 2)}</CodeBlock>
      <br />
      <code className="inline">index.js</code>
      <CodeBlock className="spacecode" language="javascript">{indexSimple}</CodeBlock>
      <br />
      <code className="inline">bot.js</code>
      <CodeBlock className="spacecode" language="javascript">{botSimple}</CodeBlock>
      <br />
      <h2>Woah, Slow Down....</h2>
      <div className="spacer"></div>
      <p>So whats happening? Well you created a new cluster manager using <a href="https://nobuwu.github.io/sliceyjs/classes/clusterutil">ClusterUtil</a>. ClusterUtil then does all the needed calculations on how many shards to open for your bot and how many clusters are needed. Once that is done Slicey begins to create copies of the master process and passes the required info needed to your <a href="https://nobuwu.github.io/sliceyjs/classes/clusterutil">Client</a> in each process. Then once the bot is ready it sends "Logged in as USERNAME". You will also notice another thing under that, that says "Cluster ID? : ". This is because when <a href="https://nobuwu.github.io/sliceyjs/classes/clusterutil">ClusterUtil</a> passes the needed info to your <a href="https://nobuwu.github.io/sliceyjs/classes/clusterutil">Client</a>, it also gets passed another object. <a href="https://nobuwu.github.io/sliceyjs/classes/clusterpartial">ClusterPartial</a> which gives you access to the current process copy's info and <a href="https://nobuwu.github.io/sliceyjs/classes/ipc">IPC</a> which allows the current process copy to communicate with other process copies or rather "clusters".</p>
    </div>
  )
}
