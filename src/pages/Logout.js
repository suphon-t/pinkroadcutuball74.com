import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import { useAuthContext } from "../auth"

function Logout() {
  const history = useHistory()
  const { logout } = useAuthContext()
  useEffect(() => {
    logout()
    history.replace('/')
  }, [logout, history])
  return null
}

export default Logout
