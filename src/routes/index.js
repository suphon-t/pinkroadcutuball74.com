import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { UserRoute, AdminRoute, StaffRoute } from "./RouteTypes"

import Landing from "../pages/Landing"
import Login from "../pages/Login"
import TicketLogin from "../pages/TicketLogin"
import Logout from "../pages/Logout"
import RegisterSuccess from "../pages/RegisterSuccess"
import User from "../pages/User"
import NoMatch from "../pages/NoMatch"
import AdminLogin from "../pages/AdminLogin"
import CheckInTicket from "../pages/CheckInTicket"
import FullScreenLoading from "../components/FullScreenLoading"
import { isEventDay } from "../utils"
import SafeArea from "../components/SafeArea"

const Register = lazy(() => import(/* webpackPrefetch: true */ "../pages/Register"))
const StaffScan = lazy(() => import("../pages/StaffScan"))
const Admin = lazy(() => import("../admin"))

function UserRoutes() {
  return (
    <SafeArea all>
      <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/success" component={RegisterSuccess} />
          { isEventDay ? <Route path="/login" component={TicketLogin} /> : <Route path="/login" component={Login} /> }
          <Route path="/logout" component={Logout} />
          <UserRoute path="/user">
            <User />
          </UserRoute>
          <UserRoute path="/ticket">
            <CheckInTicket />
          </UserRoute>
          <StaffRoute path="/staff/scan">
            <StaffScan />
          </StaffRoute>
          <Route path="/admin/login" component={AdminLogin} />
          <Route component={NoMatch} />
      </Switch>
    </SafeArea>
  )
}

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoading />}>
        <Switch>
          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>
          <Route component={UserRoutes} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
