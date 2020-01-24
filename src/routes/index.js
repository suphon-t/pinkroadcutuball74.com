import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled, { keyframes } from "styled-components"

import { UserRoute, AdminRoute } from "./RouteTypes"

import LoadingIcon from "../components/LoadingIcon"
import Landing from "../pages/Landing"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Logout from "../pages/Logout"
import RegisterSuccess from "../pages/RegisterSuccess"
import GetTicket from "../pages/GetTicket"
import User from "../pages/User"
import NoMatch from "../pages/NoMatch"
import AdminLogin from "../pages/AdminLogin"

const CheckIn = lazy(() => import("../pages/CheckIn"))
const Admin = lazy(() => import("../admin"))
const RandomScreen = lazy(() => import("../admin/pages/RandomScreen"))

const delayedFadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const Loading = styled.div.attrs({
  children: <LoadingIcon />,
})`
  display: flex;
  height: 100vh;

  animation: ${delayedFadeIn} .5s;
`

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading fullscreen />}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/success" component={RegisterSuccess} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <UserRoute path="/user">
            <User />
          </UserRoute>
          <UserRoute path="/checkin">
            <CheckIn />
          </UserRoute>
          <UserRoute path="/ticket">
            <GetTicket />
          </UserRoute>
          <Route path="/admin/login" component={AdminLogin} />
          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>
          <AdminRoute path="/adminext/random">
            <RandomScreen />
          </AdminRoute>
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
