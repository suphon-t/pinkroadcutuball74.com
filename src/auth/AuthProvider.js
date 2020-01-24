import React, { createContext, useEffect, useState, useCallback, useMemo } from "react"

import { parseToken } from "../utils"

export const AuthContext = createContext()

function AuthProvider(props) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))
  const tokenData = useMemo(() => {
    return parseToken(token)
  }, [token])
  const isAuthenticated = !!token
  const userId = tokenData?.sub
  const role = tokenData?.role
  const isAdmin = role === 'admin'

  // Persist the token
  useEffect(() => {
    if (token === null) {
      localStorage.removeItem('access_token')
    } else {
      localStorage.setItem('access_token', token)
    }
  }, [token])

  // Callback functions
  const login = useCallback(token => setToken(token), [])
  const logout = useCallback(() => setToken(null), [])

  const value = { isAuthenticated, isAdmin, role, token, userId, login, logout }

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
