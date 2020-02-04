import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { useGet } from "../../api"
import Random from "../components/Random"
import Channel from "../../utils/Channel"

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background: linear-gradient(209.11deg, #F9C455 21.96%, #EE7398 89.62%);
`

const FullScreenRandom = styled(Random)`
  width: 100vw;
  height: 100vh;
`

export const initialScreenState = {
  hidden: true,
}

function RandomShow() {
  const { data, execute: refresh } = useGet('/admin/randomhistory')
  const [current, ...previous] = data?.data || []
  const [screenState, setScreenState] = useState(initialScreenState)

  useEffect(() => {
    const channel = new Channel('randomScreen', async (action, payload) => {
      switch (action) {
        case 'pls refresh':
          refresh()
          break
        case 'u there?':
          channel.send('hey im here')
          break
        case 'heres ur state':
          setScreenState(payload)
          break
        default:
          break
      }
    })
    channel.send('hey im here')
    return () => channel.close()
  }, [refresh])

  return (
    <Background>
      { !screenState.hidden && <FullScreenRandom current={current} previous={previous} noBackground /> }
    </Background>
  )
}

export default RandomShow
