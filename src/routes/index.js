import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "../pages/Landing"
import Register from "../pages/Register"
import Login from "../pages/Login"
import RegisterSuccess from "../pages/RegisterSuccess"
import GetTicket from "../pages/GetTicket"

const Admin = lazy(() => import("../admin"))

function Routes() {
  return (
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
  )
}

export default Routes
