import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Layout } from "antd"

// component
import Register from "./pages/Register"
import RegisterSuccess from "./pages/RegisterSuccess"
import Landing from "./pages/landing"

import "./styles/app.scss"

const Admin = lazy(() => import('./admin'))

function App() {
  return (
    <>
      <div className="background" />
      <div className="background art" />
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/register" exact component={Register} />
              <Route path="/register/success" exact component={RegisterSuccess} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
