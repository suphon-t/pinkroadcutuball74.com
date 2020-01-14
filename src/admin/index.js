import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import Home from "./pages/home"
import RandomScreen from "./pages/RandomScreen"

function Admin() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact component={Home} />
      <Route path={`${path}/random`} component={RandomScreen} />
    </Switch>
  )
}

export default Admin
