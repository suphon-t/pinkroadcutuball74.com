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
  const isStaff = isAdmin || role === 'staff'

  // Callback functions
  const login = useCallback(token => setToken(token), [])
  const logout = useCallback(() => setToken(null), [])

  // Validate and persist the token
  useEffect(() => {
    if (tokenData) {
      if (new Date().getTime() > tokenData.exp * 1000) {
        logout()
      } else {
        localStorage.setItem('access_token', token)
      }
    } else {
      localStorage.removeItem('access_token')
      localStorage.removeItem('ticket')
    }
  }, [token, tokenData, logout])

  const value = { isAuthenticated, isAdmin, isStaff, role, token, userId, login, logout }

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
