import React, { useEffect, useState, useCallback } from "react"
import { notification } from "antd"

import Channel from "../../utils/Channel"
import RandomControl from "./RandomControl"

function RandomRemote() {
  const [loading, setLoading] = useState(false)
  const [channel, setChannel] = useState(null)
  const [data, setData] = useState(undefined)

  const randomAgain = useCallback(() => {
    setLoading(true)
    channel.send('pls give more')
  }, [channel])

  useEffect(() => {
    const channel = new Channel('randomScreen', (action, payload) => {
      switch (action) {
        case 'yo i got these':
          setLoading(false)
          setData(payload)
          break
        case 'im done':
          setLoading(false)
          break
        case 'heyyy':
          const { type, data } = payload
          notification[type](data)
          break
        default:
          break
      }
    })
    channel.send('hey im here')
    setChannel(channel)
    return () => channel.close()
  }, [])

  return (
    <RandomControl data={data} loading={loading} randomAgain={randomAgain} />
  )
}

export default RandomRemote
