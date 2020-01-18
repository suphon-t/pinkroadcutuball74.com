import React, { useState, useEffect } from "react"

import Random from "../components/Random"
import styled from "styled-components"
import Channel from "../../utils/Channel"

const FullScreenRandom = styled(Random)`
  width: 100vw;
  height: 100vh;
`

function RandomScreen() {
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])
  const [current, ...previous] = results

  useEffect(() => {
    const channel = new Channel('randomScreen', (action, payload) => {
      if (action === 'results') {
        if (payload) {
          setLoading(false)
          setResults(payload)
          channel.send('received')
        }
      }
    })
    channel.send('opened')
    return () => channel.close()
  }, [])

  return <FullScreenRandom current={current} previous={previous} loading={loading} />
}

export default RandomScreen
