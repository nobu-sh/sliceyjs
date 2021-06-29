import React from 'react';
import Router from './router'

// Global Stylesheet
import "scss/global.scss"

import "./App.scss"

export default function App() {
  return (
    <div id="main">
      <div id="sidebar">
        
      </div>
      <div id="content">
        <Router />
      </div>
    </div>
  )
}
