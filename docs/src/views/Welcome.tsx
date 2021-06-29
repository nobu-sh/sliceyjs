import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import CodeBlock from '../components/CodeBlock'

import './Welcome.scss'

const exampleJS = 
`const test = "123"
if (test.startsWith("1")) {
    console.log("WOW I NEVER EXPECTED THIS")
}`

export default function App() {
    return (
        <div className="align-center">
            <img id="welcome-logo" src="banner.png" />
            <div id="welcome-tags">
                <a href="/"><img src="https://img.shields.io/github/package-json/v/NobUwU/sliceyjs?style=for-the-badge" alt="Version"/></a>
                <a href="/"><img src="https://img.shields.io/github/license/NobUwU/sliceyjs?style=for-the-badge" alt="License"/></a>
                <a href="/"><img src="https://img.shields.io/github/languages/top/NobUwU/sliceyjs?style=for-the-badge" alt="Written In Typescript"/></a>
                <a href="https://www.npmjs.com/package/sliceyjs"><img src="https://img.shields.io/npm/dt/sliceyjs?style=for-the-badge" alt="Downloads"/></a>
                <a href="/"><img src="https://img.shields.io/github/repo-size/NobUwU/sliceyjs?label=Size&style=for-the-badge" alt="Size"/></a>
            </div>
            <div id="welcome-content">
                <h2>About</h2>
                <div className="spacer" />
                <p>Example Of <code className="inline">Inline Text</code> Not too Shabby</p>
                <br/>
                <p>Example Of</p>
                <CodeBlock language="javascript">{exampleJS}</CodeBlock>
            </div>
        </div>
    )
}
