import React, { createContext, useEffect, useState, useCallback } from "react"

import http from "../utils/http"

export const AuthContext = createContext()

function AuthProvider(props) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))
  const isAuthenticated = !!token

  // Persist the token and set authorization header to use it
  useEffect(() => {
    if (token === null) {
      localStorage.removeItem('access_token')
    } else {
      localStorage.setItem('access_token', token)
    }
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }, [token])

  // Add an interceptor to logout when receiving 401
  useEffect(() => {
    const logoutInterceptor = http.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response.status === 401) {
          setToken(null)
        }
        return Promise.reject(error)
      })
    return () => http.interceptors.response.eject(logoutInterceptor)
  }, [])

  // Callback functions
  const login = useCallback(token => setToken(token), [])
  const logout = useCallback(() => setToken(null), [])

  const value = { isAuthenticated, login, logout }

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
