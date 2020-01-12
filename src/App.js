import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./yup-init"

// components
import Register from "./pages/Register"
import RegisterSuccess from "./pages/RegisterSuccess"
import Landing from "./pages/Landing"

// style
import "./styles/app.scss"

// lazy
const Admin = lazy(() => import("./admin"))

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
