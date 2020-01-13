import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./yup-init"

// components
import Register from "./pages/Register"
import RegisterSuccess from "./pages/RegisterSuccess"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import GetTicket from "./pages/GetTicket"

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
              <Route path="/login" exact component={Login} />
              <Route path="/register/success" component={RegisterSuccess} />
              <Route path="/ticket" component={GetTicket} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
