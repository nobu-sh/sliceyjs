import React from 'react';
import Router from './router'
import SideBar from './components/SideBar'

// Global Stylesheet
import "scss/global.scss"

import "./App.scss"

export default function App() {
  console.log(window.location.pathname)
  return (
    <div id="main">
      <SideBar />
      <div id="content">
        <Router />
      </div>
    </div>
  )
}
