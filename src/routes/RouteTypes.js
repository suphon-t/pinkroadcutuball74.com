import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthContext } from "../auth"

function RedirectRoute({ children, dest, ...rest}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const redirectTo = dest()
        if (redirectTo) {
          return <Redirect to={{
            pathname: redirectTo,
            state: { from: location },
          }} />
        } else {
          return children
        }
      }}
    />
  )
}

export function PrivateRoute({ dest, ...rest }) {
  const { isAuthenticated } = useAuthContext()
  return (
    <RedirectRoute
      {...rest}
      dest={() => (!isAuthenticated && '/login') || dest?.()}
    />
  )
}

export function UserRoute({ dest, ...rest }) {
  const { isAdmin } = useAuthContext()
  return (
    <PrivateRoute
      {...rest}
      dest={() => (isAdmin && '/admin') || dest?.()}
    />
  )
}

export function AdminRoute({ dest, ...rest }) {
  const { isAdmin } = useAuthContext()
  return (
    <PrivateRoute
      {...rest}
      dest={() => (!isAdmin && '/user') || dest?.()}
    />
  )
}
