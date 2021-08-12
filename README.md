<p align="center">
  <img align="center" width="700" height="auto" src= "./docs/public/banner.png" alt="SliceyJS" />
  <br>
  <br>
  <p align="center">
    <a href="/"><img src="https://img.shields.io/github/package-json/v/NobUwU/sliceyjs?style=for-the-badge" alt="Version"/><a/>
    <a href="/"><img src="https://img.shields.io/github/license/NobUwU/sliceyjs?style=for-the-badge" alt="License"/><a/>
    <a href="/"><img src="https://img.shields.io/github/languages/top/NobUwU/sliceyjs?style=for-the-badge" alt="Written In Typescript"/><a/>
    <a href="https://www.npmjs.com/package/sliceyjs"><img src="https://img.shields.io/npm/dt/sliceyjs?style=for-the-badge" alt="Downloads"/><a/>
    <a href="/"><img src="https://img.shields.io/github/repo-size/NobUwU/sliceyjs?label=Size&style=for-the-badge" alt="Size"/><a/>
  </p>
</p>


      
## About
SliceyJS is a utility addon for the widely used [Discord API](https://discord.com/developers/docs/intro) module, [discord.js](https://github.com/discordjs/discord.js). SliceyJS adds a handful of features the average bot developer might find useful or helpful when attempting to scale their bot to production!

- Up-to-date
- Lightweight
- Consistent
- Simple
- TS & JS support

`NOTICE`: SliceyJS is still a WIP. It only offers clustering and sharding at the moment!
      
## Installation
**Node.js 16.6.0 or newer is required.**

```sh-session
npm i discord.js
```
      
```sh-session
npm i sliceyjs
```
      
## Basic Usage
```js
const { Intents } = require('discord.js');
const { Client } = require('sliceyjs');

const bot = new Client('token', { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

bot.login()
```
## Links

- [Documentation](https://nobuwu.github.io/sliceyjs/)
- [Discord Dev Portal](https://discord.com/developers/docs/intro)
- [Discord.js](https://discord.js.org/#/)
- [Github](https://github.com/nobuwu/sliceyjs)
- [NPM](https://www.npmjs.com/package/sliceyjs)
