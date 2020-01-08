import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import Home from "./pages/home"

function Admin() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact component={Home} />
    </Switch>
  )
}

export default Admin
