import { useState, useCallback } from "react"

const mockData = {
  '/register': () => {
    return { success: true }
  }
}

export function usePost(url) {
  const [result, setResult] = useState([null, null, false]) // data, error, loading
  const execute = useCallback(payload => new Promise((resolve, reject) => {
    setResult([null, null, true])
    setTimeout(() => {
      if (mockData[url]) {
        console.log('test')
        alert(`posted to ${url}\n${JSON.stringify(payload)}`)
        setResult([mockData[url](payload), null, false])
        resolve()
      } else {
        setResult([null, '404 not found', false])
        reject('404 not found')
      }
    }, 300)
  }), [url])
  return [execute, ...result]
}
