import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthContext } from "../auth"

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuthContext()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? children : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
