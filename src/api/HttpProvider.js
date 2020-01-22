import React, { createContext, useMemo, useContext } from "react"
import axios from "axios"

import { useAuthContext } from "../auth"
import config from "../config"

const HttpContext = createContext()

function HttpProvider(props) {
  const { token, logout } = useAuthContext()
  const instance = useMemo(() => {
    const instance = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    instance.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response.status === 401) {
          logout()
        }
        return Promise.reject(error)
      })
    return instance
  }, [token, logout])
  return (
    <HttpContext.Provider value={{ http: instance }} {...props} />
  )
}

export default HttpProvider

export function useHttpContext() {
  return useContext(HttpContext)
}
