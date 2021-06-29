import React from 'react';
import { v4 as uuid } from 'uuid'

import "./SideBar.scss"

import slicey from '../slicey.json'
import { SliceyJson } from "src/interfaces"
const sliceyJson: SliceyJson = slicey

interface dropdownprops {
  items: {
    name: string
    route: string
  }[]
}
interface dropdownstate {
  open: boolean
}

class Dropdown extends React.Component<dropdownprops, dropdownstate> {
  constructor(props: dropdownprops) {
    super(props)
    const location = window.location.pathname
    // console.log(locationSplit.length)
    if (this.props.items.map(i => i.route).includes(location)) {
      this.state = { open: true }
    } else {
      this.state = { open: false }
    }
    this.reverse = this.reverse.bind(this)
  }
  reverse() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const location = window.location.pathname
    const items = []
    for (const item of this.props.items) {
      let current = false
      if (location === item.route) {
        current = true
      }
      items.push(
        <a href={item.route} key={uuid()} className={`scoped-a ${ current ? "current" : "" }`}>{item.name}</a>
      )
    }


    return (
      <div>
        <div className="dropdown" onClick={this.reverse}>
          <img className={`cheveron hoverCursor ${this.state.open ? "rotate": ""}`} src="icons/chevron-down.svg" />
          <h3 className="hoverCursor">{this.props.children}</h3>
        </div>
        <div className={`dropdowncontent ${this.state.open ? "open": ""}`}>
          {items}
        </div>
      </div>
    )
  }
}

export default function SideBar() {
  const baseUrl = process.env.NODE_ENV === 'development' ? "" : "/sliceyjs"

  return (
    <div id="sidebar">
      <div className="sidebar-items">
        <Dropdown items={sliceyJson.general.map(i => {return { name: i.name, route: `${baseUrl}${i.route}`}})}>General</Dropdown>
        <Dropdown items={sliceyJson.examples.map(i => {return { name: i.name, route: `${baseUrl}${i.route}`}})}>Examples</Dropdown>
        <Dropdown items={sliceyJson.classes.map(i => {return { name: i.name, route: `${baseUrl}${i.route}`}})}>Classes</Dropdown>
      </div>
    </div>
  )
}
