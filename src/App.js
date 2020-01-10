import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Layout } from "antd"

// component
import Register from "./pages/Register"
import Landing from "./pages/landing"

import "./App.css"

const { Content } = Layout

const Admin = lazy(() => import('./admin'))

function App() {
  return (
    <Content className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Content>
  )
}

export default App
