import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { createGlobalStyle } from "styled-components"

import AdminHome from "./pages/AdminHome"
import RandomShow from "./pages/RandomShow"
import RandomBackend from "./pages/RandomBackend"

const AdminGlobalStyle = createGlobalStyle`
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
        <Route path={`${path}/random`} component={RandomShow} />
        <Route path={`${path}/control`} component={RandomBackend} />
      </Switch>
    </>
  )
}

export default Admin
