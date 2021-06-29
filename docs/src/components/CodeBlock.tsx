import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import ps from 'react-syntax-highlighter/dist/esm/languages/hljs/powershell'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('typescript', ts)
SyntaxHighlighter.registerLanguage('powershell', ps)

import './CodeBlock.scss'

export default class extends React.Component<{ language: string, className?: string }, { copyClicked: boolean }> {
  constructor(props: { language: string, className?: string }) {
    super(props)
    this.copy = this.copy.bind(this)
    this.state = { copyClicked: false }
  }
  copy() {
    if (!navigator.clipboard) {
      const el = document.createElement('textarea')
      el.value = this.props.children.toString()
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    } else {
      navigator.clipboard.writeText(this.props.children.toString())
    }
    this.setState({ copyClicked: true })
    setTimeout(() => {
      this.setState({ copyClicked: false })
    }, 5000)
  }
  render() {
    return (
      <div className={this.props.className || ""}>
        <div className="codeblock">
          <div className={`copyCode ${this.state.copyClicked ? "copyClicked" : ""}`} onClick={this.copy}>
            {!this.state.copyClicked
              ? <img src="icons/copy.svg" />
              : <img src="icons/check.svg" />
            }
          </div>
          <SyntaxHighlighter customStyle={{ background: "rgba(255,255,255,0.10)", padding: "1rem", width: "100%", borderRadius: "5px", fontSize: "105%", lineHeight: "1.4rem" }} language={this.props.language} style={vs2015}>
            {this.props.children}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}
