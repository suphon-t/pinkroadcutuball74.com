import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "../pages/Landing"
import Register from "../pages/Register"
import Login from "../pages/Login"
import RegisterSuccess from "../pages/RegisterSuccess"
import GetTicket from "../pages/GetTicket"
import PrivateRoute from "./PrivateRoute"
import User from "../pages/User"

const Admin = lazy(() => import("../admin"))

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/success" component={RegisterSuccess} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/ticket">
            <GetTicket />
          </PrivateRoute>
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
