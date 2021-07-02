import React from 'react';
import CodeBlock from '../../components/CodeBlock'
import ScrollToLink from '../../components/ScrollToLink'

const pingPongExample =
`const { Client } = require('sliceyjs')
const { Intents } = require('discord.js');

// Create New Client
const bot = new Client('Legit Token', { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// On Bot Ready
bot.on('ready', async () => {

  // Log Bot Successfully Logged In
  console.log(\`Logged in as \${bot.user.tag}!\`)

  // Check If The Bot Was Launched With The ClusterUtil
  if (bot.cluster) {

    // Log We Are Using ClusterUtil
    console.log("Bot Launched Using ClusterUtil")

    // Register Listener For The Event "PING"
    bot.cluster.ipc.on("PING", (clusterId) => {
      // When we recieve the PING event, it will come with a cluster id parameter
      // We are going to use this to send a PONG event back to the cluster that requested the PING with the cluster id
      bot.cluster.ipc.sendTo(clusterId, "PONG", bot.cluster.id)
    })

    // Register Listener For The Event "PONG"
    bot.cluster.ipc.on("PONG", (clusterId) => {
      // When we recieve the PONG event, it comes with the cluster id of the cluster "pinged"
      // This is because in the ping event listener we are sending a pong event back with the cluster id
      console.log("\\"PONG\\" from cluster", clusterId, "Requested by cluster", bot.cluster.id)
    })

    // We only want to send the "PING" event if it is cluster 0
    // Otherwise all clusters will be pinging eachother simultaneously
    // And it will be harder to tell what it going on
    if (bot.cluster.id === 0) {
      // Set Interval to send the "PING" event every 5 seconds
      setInterval(() => {
        // Send "PING" event with the cluster id so the other clusters know where to send the pong event to
        bot.cluster.ipc.send("PING", bot.cluster.id)
      }, 5000)
    }

  }
})

// Connect Bot To Websocket
bot.login()`

const beExample = 
`const { Client } = require('sliceyjs')
const { Intents } = require('discord.js');

// Create New Client
const bot = new Client('Legit Token', { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// On Bot Ready
bot.on('ready', async () => {

  // Log Bot Successfully Logged In
  console.log(\`Logged in as \${bot.user.tag}!\`)

  // Check If The Bot Was Launched With The ClusterUtil
  if (bot.cluster) {

    // Log We Are Using ClusterUtil
    console.log("Bot Launched Using ClusterUtil")

    // Call broadcastEval
    const results = await bot.cluster.ipc.broadcastEval((client) => {
      // Get Cached Guilds Size
      const guilds = client.guilds.cache.size
      // Get Cached Users Size
      const users = client.users.cache.size
      // Get Cached Channels Size
      const channels = client.channels.cache.size

      // Return Results
      return {
        guilds,
        users,
        channels,
      }
    })

    // Log Results
    console.log(results)

  }
})

// Connect Bot To Websocket
bot.login()`

const correct =
`// Correct Usage No Outside Scopes/Dependents
broadcastEval((client) => {
  // Return Guilds Cache Size
  return client.guilds.cache.size
})`

const incorrect =
`const guildName = "Cool Guild"

// Incorrect Usage, Scoping Variable Outside Of Function
broadcastEval((client) => {
  // Return Boolean if Guild Exist
  return client.guilds.cache.map(guild => guild.name).includes(guildName)
})`

export default function App() {
  return (
    <div>
      <h1 className="bold">Utilizing IPC</h1>
      <br />
      <p className="colorOffset light">IPC is the key feature for comminucating from one process to another. To put it into visual, when you have your bot multithreaded this means there are multiple processes of your bot... This also means that data that you need on one process may actually be on another process. IPC allows communication via events between all processes to resolve this issue.</p>
      <br />
      <p className="colorOffset light"><code className="inline">NOTICE</code> IPC will only work when using <a href="https://nobuwu.github.io/sliceyjs/classes/clusterutil">ClusterUtil</a> to <a href="https://nobuwu.github.io/sliceyjs/examples/multithreading">multithread</a> your bot</p>
      <br />
      <ScrollToLink id="examples-ipc-ping-pong"><h2 className="medium">Friendly Game Of Ping-Pong</h2></ScrollToLink>
      <div className="spacer"></div>
      <p className="colorOffset light">In this example we will be registering listeners to send a "ping" event to every cluster and every pinged cluster will respond with "pong".</p>
      <br />
      <p className="colorOffset light"><code className="inline">WARN</code> The more clusters you have open for this example, the more spam that the console will receive!</p>
      <br />
      <code id="buts" className="inline">bot.js</code>
      <CodeBlock className="spacecode" language="javascript">{pingPongExample}</CodeBlock>
      <br />
      <ScrollToLink id="examples-ipc-use-cases"><h2 className="medium">Use Cases</h2></ScrollToLink>
      <div className="spacer"></div>
      <p className="colorOffset light">You might be thinking <i>"okay cool IPC where or why would I use this"</i>. Welllll.... its a complicated area to explain, especially for newcomers. However think of it as registering custom functions on every Cluster, say you need to get a specific guild that is not the current one you are executing the command in. Well you are going to need to use IPC to "register a function" on every cluster to attempt to get that guild otherwise you'll run into the issue of not being able to get guild even though the bot is in that guild.</p>
      <br />
      <ScrollToLink id="examples-ipc-broadcast-eval"><h2 className="medium">Broadcast Eval's</h2></ScrollToLink>
      <div className="spacer"></div>
      <p className="colorOffset light">Its highly recommended you don't use this and just use IPC events instead... However, we also provide a broadcast evaluation method which will eval your code on every cluster and return an array of results from every cluster</p>
      <br />
      <p className="colorOffset light">As great and amazing this may sound, it comes with one major handicap. You cannot use scopes outside of the function you provide for the broadcast eval. What does this exactly mean? Well you cant use any variables, classes, functions, methods, etc that are declared outside of the function. See usages below for more info.</p>
      <br />
      <ScrollToLink id="examples-ipc-broadcast-eval-example"><h3 className="medium">Example</h3></ScrollToLink>
      <br />
      <code className="inline">bot.js</code>
      <CodeBlock className="spacecode" language="javascript">{beExample}</CodeBlock>
      <br />
      <ScrollToLink id="examples-ipc-broadcast-eval-usages"><h3 className="medium">Usages</h3></ScrollToLink>
      <br />
      <code className="inline">Correct</code>
      <CodeBlock className="spacecode" language="javascript">{correct}</CodeBlock>
      <br />
      <code className="inline">Incorrect</code>
      <CodeBlock className="spacecode" language="javascript">{incorrect}</CodeBlock>
    </div>
  )
}
