import React from 'react';
import CodeBlock from '../../components/CodeBlock'

const tsInd =
`import { Client } from 'sliceyjs'
import { SliceyOptions } from 'sliceyjs'

const clientOptions: SliceyOptions = {
  restSweepInterval: 3000
}

const bot = new Client("Legit Token", clientOptions)

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
    <div>
      <h1>Typedefs</h1>
      <br />
      <p>When using typescript you may end up in a predicament where you need type definitions from Slicey so typescript and the IDE know what properties and methods will be on an object, and so forth.</p>
      <br />
      <code className="inline">index.ts</code>
      <CodeBlock className="spacecode" language="typecript">{tsInd}</CodeBlock>
    </div>
  )
}
