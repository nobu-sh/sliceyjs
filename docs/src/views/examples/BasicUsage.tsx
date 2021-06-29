import React from 'react';
import CodeBlock from '../../components/CodeBlock'

const examplejs =
`const { Intents } = require('discord.js');
const { Client } = require('sliceyjs');

const bot = new Client('token', { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on('ready', () => {
  console.log(\`Logged in as \${bot.user.tag}!\`);
});

bot.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

bot.login()`
const examplets =
`import { Intents } from 'discord.js'
import { Client } from 'sliceyjs'

const bot = new Client('token', { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on('ready', () => {
  console.log(\`Logged in as \${bot.user.tag}!\`);
});

bot.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

bot.login()`

import "./BasicUsage.scss"

export default function App() {
  return (
    <div>
      <h1 id="butitle">Basic Usage</h1>
      <br />
      <p id="budes">This will create a bot using <a href="https://nobuwu.github.io/sliceyjs/classes/client">Slicey's Client</a> that will respond with "pong" whenever ping is sent in chat. Right now SliceyJS is still a work in progress so the Client will be the exact same as discord.js Client except the token is passed through the client constructor rather than the login method.</p>
      <br />
      <code id="bujs" className="inline">Javascript</code>
      <CodeBlock className="spacecode" language="javascript">{examplejs}</CodeBlock>
      <br />
      <code id="buts" className="inline">Typescript</code>
      <CodeBlock className="spacecode" language="typescript">{examplets}</CodeBlock>
    </div>
  )
}
