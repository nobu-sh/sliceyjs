import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import CodeBlock from '../components/CodeBlock'

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
                <h2 id="welcome-about">About</h2>
                <div className="spacer" />
                <p id="welcome-about-des">SliceyJS is a utility addon for the widely used <a target="_blank" href="https://discord.com/developers/docs/intro">Discord API</a> module, <a target="_blank" href="https://discord.js.org/#/">discord.js</a>. SliceyJS adds a handful of features the average bot developer might find useful or helpful when attempting to scale their bot to production!</p>
                <ul id="welcome-about-list">
                    <li>Up-to-date</li>
                    <li>Lightweight</li>
                    <li>Consistent</li>
                    <li>Simple</li>
                    <li>TS & JS support</li>
                </ul>
                <p id="welcome-about-notice"><span className="inline">NOTICE</span>: SliceyJS is still a WIP. It only offers clustering and sharding at the moment!</p>
                <br />
                <h2 id="welcome-installation">Installation</h2>
                <div className="spacer" />
                <p id="welcome-installation-node-version"><b>Node.js 14.0.0+ is required.</b></p>
                <CodeBlock className="npm-install" language="powershell">npm install sliceyjs</CodeBlock>
                <CodeBlock language="powershell">npm install discord.js</CodeBlock>
                <br />
                <h2 id="welcome-basic-usage">Basic Usage</h2>
                <div className="spacer" />
                <CodeBlock language="javascript">{basicUsage}</CodeBlock>
                <br />
                <h2 id="welcome-links">Links</h2>
                <div className="spacer" />
                <ul id="welcome-links-list">
                    <li><a href="https://discord.com/developers/docs/intro" target="_blank">Discord Dev Portal</a></li>
                    <li><a href="https://discord.js.org/#/" target="_blank">Discord.js</a></li>
                    <li><a href="https://github.com/nobuwu/sliceyjs" target="_blank">Github</a></li>
                    <li><a href="https://www.npmjs.com/package/sliceyjs" target="_blank">NPM</a></li>
                </ul>
            </div>
        </div>
    )
}
