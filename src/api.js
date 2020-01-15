import { useState, useCallback, useEffect } from "react"
import qs from "qs"

import http from "./utils/http"

const mockData = {
  '/register': () => {
    return { success: true }
  }
}

export function useFakePost(url) {
  const [loading, setPromise] = usePromiseStatus()
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
  return [loading, execute]
}

export function usePromiseStatus() {
  const [state, setState] = useState(null)
  useEffect(() => {
    if (!state) {
      return
    }

    let canceled = false
    const { promise, resolve, reject } = state
    promise
      .then(value => {
        if (!canceled) {
          resolve(value)
          setState(null)
        }
      })
      .catch(err => {
        if (!canceled) {
          reject(err)
          setState(null)
        }
      })
    return () => canceled = true
  }, [state])

  const setPromise = useCallback(promise => {
    return new Promise((resolve, reject) => {
      setState({ promise, resolve, reject })
    })
  }, [])
  return [!!state, setPromise]
}

export function usePostStatus(url) {
  const [loading, setPromise] = usePromiseStatus()
  const execute = useCallback(body => {
    return setPromise(http.post(url, qs.stringify(body)))
  }, [url, setPromise])
  return [loading, execute]
}
