import React from 'react';
import { v4 as uuid } from 'uuid'
import { Link, useHistory } from 'react-router-dom'
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

type History = ReturnType<typeof useHistory>
interface dropdownstate {
  open: boolean
  // routerhistory?: History
}
class Dropdown extends React.Component<dropdownprops, dropdownstate> {
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
        <Link key={uuid()} to={item.route} className={`scoped-a sidebar-link ${ current ? "current" : "" }`}>{item.name}</Link>
      )
    }


    return (
      <div>
        <div className="dropdown" onClick={this.reverse}>
          <h3 className="hoverCursor">{this.props.children}</h3>
          <img className={`cheveron hoverCursor ${this.state.open ? "rotate": ""}`} src="icons/chevron-down.svg" />
        </div>
        <div className={`dropdowncontent ${this.state.open ? "open": ""}`}>
          {items}
        </div>
      </div>
    )
  }
}

export default function SideBar() {
  // const baseUrl = process.env.NODE_ENV === 'development' ? "" : "/sliceyjs"
  const borger = React.useState(false)
  const currentWidth = React.useState(window.innerWidth)

  const history = useHistory()
  history.listen((location) => {
    document.dispatchEvent(new Event("RouteChanged:RerenderSideNav"))
  })

  window.addEventListener('resize', () => {
    currentWidth[1](window.innerWidth)
  })


  return (
    <div id="i-m-da-sidebar" className={`sidebar ${currentWidth[0] < 901 ? "BORGERMODE" : ""} ${borger[0] ? "active" : ""}`}>
      <div className="sidebar-items">
        <Dropdown items={sliceyJson.general.map(i => {return { name: i.name, route: /*`${baseUrl}${*/i.route/*}`*/}})}>General</Dropdown>
        <Dropdown items={sliceyJson.examples.map(i => {return { name: i.name, route: /*`${baseUrl}${*/i.route/*}`*/}})}>Examples</Dropdown>
        <Dropdown items={sliceyJson.classes.map(i => {return { name: i.name, route: /*`${baseUrl}${*/i.route/*}`*/}})}>Classes</Dropdown>
        <Dropdown items={[]}>Typedefs</Dropdown>
      </div>
    </div>
  )
}
