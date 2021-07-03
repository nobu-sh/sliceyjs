import React from 'react';
import Router from './router'
import SideBar from './components/SideBar'
import {
  BrowserRouter,
} from 'react-router-dom'
// Global Stylesheet
import "scss/global.scss"

import "./App.scss"

function borgerMenuOn() {
  const menu = document.getElementById("i-m-da-sidebar")
  menu.classList.add("active")
}
function borgerMenuOff() {
  const menu = document.getElementById("i-m-da-sidebar")
  menu.classList.remove("active")
}

export default function App() {
  const currentWidth = React.useState(window.innerWidth)

  window.addEventListener('resize', () => {
    currentWidth[1](window.innerWidth)
  })

  // console.log(window.location)

  const query = new URLSearchParams(window.location.search)

  setTimeout(() => {
    const element = document.getElementById(query.get("scrollTo"))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },10)

  // console.log(window.location.pathname)
  return (
    <div id="main">
      <BrowserRouter basename="/sliceyjs">
        <SideBar />
        <img className={`openMenu ${ currentWidth[0] < 901 ? "on" : "" }`} src="icons/chevron-down.svg" onClick={borgerMenuOn} />
        <div id="content" onClick={borgerMenuOff}>
          <Router />
        </div>
      </BrowserRouter>
    </div>
  )
}
