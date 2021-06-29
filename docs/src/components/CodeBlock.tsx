import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import './CodeBlock.scss'

export default class extends React.Component<{ language: string }, { copyClicked: boolean }> {
  constructor(props: { language: string }) {
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
    )
  }
}
