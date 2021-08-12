import React from 'react';
import CodeBlock from '../../components/CodeBlock'
import LinkTo from '../../components/LinkTo'

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

bot.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

bot.login()`

export default function App() {
  return (
    <div>
      <h1 id="butitle" className="bold">Basic Usage</h1>
      <br />
      <p id="budes" className="colorOffset light">This will create a bot using <LinkTo to="/classes/client">Slicey's Client</LinkTo> that will respond with "pong" whenever ping is sent in chat. Right now SliceyJS is still a work in progress so the Client will be the exact same as discord.js Client except the token is passed through the client constructor rather than the login method.</p>
      <br />
      <code id="bujs" className="inline">Javascript</code>
      <CodeBlock className="spacecode" language="javascript">{examplejs}</CodeBlock>
      <br />
      <code id="buts" className="inline">Typescript</code>
      <CodeBlock className="spacecode" language="typescript">{examplets}</CodeBlock>
    </div>
  )
}
