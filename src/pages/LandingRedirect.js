import React from "react"
import { useAuthContext } from "../auth"
import { Redirect } from "react-router-dom"

import { isStandalone } from "../utils"
import Landing from "./Landing"

function LandingRedirect() {
  const { isAuthenticated } = useAuthContext()
  
  if (isStandalone && isAuthenticated) {
    return <Redirect to="/user" />
  }

  return <Landing />
}

export default LandingRedirect
