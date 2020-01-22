import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { createGlobalStyle } from "styled-components"

import Home from "./pages/home"
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
        <Route path={path} exact component={Home} />
        <Route path={`${path}/random`} component={RandomControl} />
      </Switch>
    </>
  )
}

export default Admin
