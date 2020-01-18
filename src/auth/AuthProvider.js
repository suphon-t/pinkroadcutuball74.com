import React, { createContext, useEffect, useState, useCallback } from "react"

export const AuthContext = createContext()

function AuthProvider(props) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))
  const isAuthenticated = !!token

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

  const value = { isAuthenticated, token, login, logout }

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider