import React, { useEffect, useState, useCallback } from "react"
import { Button } from "antd"

import { usePromise } from "../../api"
import Channel from "../../utils/Channel"

function RandomControl() {
  const [received, setReceived] = useState(false)
  const { data, loading, setPromise } = usePromise()

  useEffect(() => {
    setPromise(new Promise(resolve => resolve([])))
  }, [setPromise])

  const fakeRandom = useCallback(() => {
    const next = `${Math.round(Math.random() * 8999) + 1000}`
    setPromise(new Promise(resolve => resolve([next, ...data])))
  }, [setPromise, data])
  
  useEffect(() => {
    const channel = new Channel('randomScreen', action => {
      if (action === 'opened') {
        channel.send('results', data)
      }
      if (action === 'received') {
        setReceived(true)
      }
    })
    setReceived(false)
    channel.send('results', data)
    return () => channel.close()
  }, [data])

  return (
    <div>
      Received: {`${received}`}<br />
      <Button type="primary" onClick={fakeRandom} disabled={loading}>Fake random</Button>
    </div>
  )
}

export default RandomControl
