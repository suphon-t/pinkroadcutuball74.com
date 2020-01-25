import { useState, useCallback, useEffect, useMemo } from "react"
import qs from "qs"

import HttpProvider, { useHttpContext } from "./HttpProvider"
import mockData from "./mockData"

export { HttpProvider, useHttpContext }

export function useFakePost(url) {
  const { setPromise, ...rest } = usePromise()
  const execute = useCallback(body => {
    return setPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockData[url]) {
          alert(`post to ${url}\n${JSON.stringify(body)}`)
          resolve(mockData[url])
        } else {
          reject('404 not found')
        }
      }, 300)
    }))
  }, [url, setPromise])
  return { ...rest, execute }
}

export function useFakeGet(url) {
  const { setPromise, ...result } = usePromise()
  const execute = useCallback(() => {
    return setPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockData[url]) {
          resolve(mockData[url])
        } else {
          reject('404 not found')
        }
      }, 300)
    }))
  }, [url, setPromise])
  useEffect(() => {
    execute()
  }, [url, execute])
  return { ...result, execute }
}

export function usePromise() {
  const [state, setState] = useState({})
  const { data, error } = state

  useEffect(() => {
    if (!state.promise) {
      return
    }

    let canceled = false
    const { promise, resolve, reject } = state
    promise
      .then(data => {
        if (!canceled) {
          resolve(data)
          setState({ data })
        }
      })
      .catch(error => {
        if (!canceled) {
          reject(error)
          setState({ error })
        }
      })
    return () => canceled = true
  }, [state])

  const setPromise = useCallback(promise => {
    return new Promise((resolve, reject) => {
      setState(({ data }) => ({ data, promise, resolve, reject }))
    })
  }, [])

  const callAsync = useCallback(func => {
    setPromise(func())
  }, [setPromise])

  return { loading: !!state.promise, data, error, setPromise, callAsync }
}

export function usePostStatus(url, isJson = true) {
  const { http } = useHttpContext()
  const { setPromise, ...result } = usePromise()
  const execute = useCallback(body => {
    if (isJson) {
      return setPromise(http.post(url, body))
    } else {
      return setPromise(http.post(url, qs.stringify(body)))
    }
  }, [http, isJson, url, setPromise])
  return { ...result, execute }
}

export function useGet(url, params = {}) {
  const paramsJson = JSON.stringify(params)
  const paramsMemo = useMemo(() => JSON.parse(paramsJson), [paramsJson])
  const { http } = useHttpContext()
  const { setPromise, ...result } = usePromise()
  const execute = useCallback(() => {
    return setPromise(http.get(url, { params: paramsMemo }))
  }, [http, url, paramsMemo, setPromise])
  useEffect(() => {
    execute()
  }, [url, execute])
  return { ...result, execute }
}
