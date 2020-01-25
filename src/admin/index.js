import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { createGlobalStyle } from "styled-components"

import AdminHome from "./pages/AdminHome"
import RandomScreen from "./pages/RandomScreen"
import RandomControl from "./pages/RandomControl"

const AdminGlobalStyle = createGlobalStyle`
  body {
    background: white;
  }

  #background {
    display: none;
  }
`

function Admin() {
  let { path } = useRouteMatch();
  return (
    <>
      <AdminGlobalStyle />
      <Switch>
        <Route path={path} exact component={AdminHome} />
        <Route path={`${path}/random`} component={RandomScreen} />
        <Route path={`${path}/control`} component={RandomControl} />
      </Switch>
    </>
  )
}

export default Admin
