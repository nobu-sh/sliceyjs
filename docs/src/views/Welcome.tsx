import React from 'react';
import CodeBlock from '../components/CodeBlock'
import LinkTo from '../components/LinkTo'
import './Welcome.scss'

const basicUsage =
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

export default function App() {
    return (
        <div className="align-center">
            <img id="welcome-logo" src="banner.png" />
            <div id="welcome-tags">
                <a href="/"><img src="https://img.shields.io/github/package-json/v/NobUwU/sliceyjs?style=for-the-badge" alt="Version"/></a>
                <a href="/"><img src="https://img.shields.io/github/license/NobUwU/sliceyjs?style=for-the-badge" alt="License"/></a>
                <a href="/"><img src="https://img.shields.io/github/languages/top/NobUwU/sliceyjs?style=for-the-badge" alt="Written In Typescript"/></a>
                <a href="https://www.npmjs.com/package/sliceyjs" target="_blank"><img src="https://img.shields.io/npm/dt/sliceyjs?style=for-the-badge" alt="Downloads"/></a>
                <a href="/"><img src="https://img.shields.io/github/repo-size/NobUwU/sliceyjs?label=Size&style=for-the-badge" alt="Size"/></a>
            </div>
            <div id="welcome-content">
                <h2 id="welcome-about" className="medium">About</h2>
                <div className="spacer" />
                <p id="welcome-about-des" className="colorOffset light">SliceyJS is a utility addon for the widely used <LinkTo to="https://discord.com/developers/docs/intro">Discord API</LinkTo> module, <LinkTo to="https://discord.js.org/#/">discord.js</LinkTo>. SliceyJS adds a handful of features the average bot developer might find useful or helpful when attempting to scale their bot to production!</p>
                <ul id="welcome-about-list" className="colorOffset light">
                    <li>Up-to-date</li>
                    <li>Lightweight</li>
                    <li>Consistent</li>
                    <li>Simple</li>
                    <li>TS & JS support</li>
                </ul>
                <p id="welcome-about-notice" className="colorOffset light"><span className="inline">NOTICE</span>: SliceyJS is still a WIP. It only offers clustering and sharding at the moment!</p>
                <br />
                <h2 id="welcome-installation" className="medium">Installation</h2>
                <div className="spacer" />
                <p id="welcome-installation-node-version" className="colorOffset"><b>Node.js 14.0.0+ is required.</b></p>
                <CodeBlock className="npm-install" language="powershell">npm install sliceyjs</CodeBlock>
                <CodeBlock language="powershell">npm install discord.js</CodeBlock>
                <br />
                <h2 id="welcome-basic-usage" className="medium">Basic Usage</h2>
                <div className="spacer" />
                <CodeBlock language="javascript">{basicUsage}</CodeBlock>
                <br />
                <h2 id="welcome-links" className="medium">Links</h2>
                <div className="spacer" />
                <ul id="welcome-links-list">
                    <li><LinkTo to="https://discord.com/developers/docs/intro">Discord Dev Portal</LinkTo></li>
                    <li><LinkTo to="https://discord.js.org/#/">Discord.js</LinkTo></li>
                    <li><LinkTo to="https://github.com/nobuwu/sliceyjs">Github</LinkTo></li>
                    <li><LinkTo to="https://www.npmjs.com/package/sliceyjs">NPM</LinkTo></li>
                </ul>
            </div>
        </div>
    )
}
