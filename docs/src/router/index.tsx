import * as React from "react"

import {
  BrowserRouter as MRouter,
  Route,
  Switch,
} from "react-router-dom"

import Home from '../views/Home'
import NotFound from '../views/404'

export default () => (
  <MRouter basename={process.env.NODE_ENV === 'development' ? "/" : "/sliceyjs"}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  </MRouter>
)