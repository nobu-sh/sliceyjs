import * as React from "react"
import { v4 as uuid } from 'uuid'

import {
  Route,
  Switch,
} from "react-router-dom"

import Welcome from '../views/Welcome'
import NotFound from '../views/404'
import ClassTemplate from '../views/Class'
import Basic from '../views/examples/BasicUsage'
import Multi from '../views/examples/Multithreading'
import TypeDef from '../views/examples/Typedefs'
import IPC from '../views/examples/IPC'

import slicey from '../slicey.json'
import { SliceyJson } from "src/interfaces"
const sliceyJson: SliceyJson = slicey

export default function Router() {
  const classRoutes = []
  for (const sclass of sliceyJson.classes) {
    classRoutes.push(
      <Route exact path={`${sclass.route}`} key={uuid()}>
        <ClassTemplate sliceyClass={sclass}></ClassTemplate>
      </Route>
    )
  }

  return (
    <Switch>

      {/* General Routes */}
      <Route exact path="/" component={Welcome} />

      {/* Example Routes */}
      <Route exact path="/examples/basic-usage" component={Basic} />
      <Route exact path="/examples/multithreading" component={Multi} />
      <Route exact path="/examples/ipc" component={IPC} />
      <Route exact path="/examples/typedefs" component={TypeDef} />

      {/* Creates Route For Each Class In Slicey.json */}
      {classRoutes}

      {/* 404 */}
      <Route path="*" component={NotFound} />
    </Switch>
  )
}