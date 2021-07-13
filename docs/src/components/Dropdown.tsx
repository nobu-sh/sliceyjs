import React from 'react'
import { v4 as uuid } from 'uuid'
import { Link, useHistory } from 'react-router-dom'

import "./Dropdown.scss"

interface dropdownprops {
  items: {
    name: string
    route: string
  }[]
}

interface dropdownstate {
  open: boolean
  // routerhistory?: History
}
export default class Dropdown extends React.Component<dropdownprops, dropdownstate> {
  history: typeof useHistory
  constructor(props: dropdownprops) {
    super(props)
    const location = window.location.pathname
    // console.log(locationSplit.length)
    if (this.props.items.map(i => i.route).includes(location)) {
      this.state = { open: true }
    } else {
      this.state = { open: false }
    }
    // this.stateuseHistory()

    this.state = { open: true }
    // this.state = { open: this.state.open, routerhistory: useHistory() }

    this.reverse = this.reverse.bind(this)
  }
  reverse() {
    this.setState({ open: !this.state.open })
  }
  reAssignCurrent() {
    // Slightest Delay Possible So Window Location Can Update In Time
    setTimeout(() => {
      const links = document.getElementsByClassName("sidebar-link") as HTMLCollectionOf<HTMLElement>
      for (const link of links) {
        const location = window.location.pathname
        if (link.getAttribute('href') !== location) {
          link.classList.remove('current')
        } else {
          link.classList.add('current')
        }
      }
    },0)
  }
  componentDidMount() {
    document.addEventListener("RouteChanged:RerenderSideNav", this.reAssignCurrent)
  }
  componentWillUnmount() {
    document.removeEventListener("RouteChanged:RerenderSideNav", this.reAssignCurrent)
  }
  render() {
    const location = window.location.pathname
    const items = []
    for (const item of this.props.items) {
      let current = false
      if (location === `/sliceyjs${item.route}`) {
        current = true
      }
      items.push(
        <a key={uuid()} href={`/sliceyjs${item.route}`} className={`scoped-atsx dropdown-link ${ current ? "currenttsx" : "" }`}>{item.name}</a>
      )
    }


    return (
      <div>
        <div className="dropdowntsx" onClick={this.reverse}>
          <h3 className="hoverCursortsx">{this.props.children}</h3>
          <img className={`cheverontsx hoverCursor ${this.state.open ? "rotatetsx": ""}`} src="icons/chevron-down.svg" />
        </div>
        <div className={`dropdowncontenttsx ${this.state.open ? "opentsx": ""}`}>
          {items}
        </div>
      </div>
    )
  }
}