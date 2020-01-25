import React, { useEffect } from "react"

import Random from "../components/Random"
import styled from "styled-components"
import Channel from "../../utils/Channel"
import { useGet, useHttpContext } from "../../api"

const FullScreenRandom = styled(Random)`
  width: 100vw;
  height: 100vh;
`

function RandomScreen() {
  const { http } = useHttpContext()
  const { data, loading, execute: refresh } = useGet('/admin/randomhistory')
  const [current, ...previous] = data?.data || []

  useEffect(() => {
    const sendData = async () => {
      if (data?.data) {
        channel.send('yo i got these', data.data)
      }
    }

    const notify = async (type, data) => {
      await channel.send('heyyy', { type, data })
    }

    const channel = new Channel('randomScreen', async (action, payload) => {
      switch (action) {
        case 'hey im here':
          await sendData()
          break
        case 'pls give more':
          http.get('/admin/random')
            .then(async () => {
              await notify('success', {
                message: 'Random success',
              })
              refresh()
            }, async err => {
              await notify('error', {
                message: 'Random failed',
                description: err?.response?.data?.error_description || JSON.stringify(err),
              })
              await channel.send('im done')
            })
          break
        default:
          break
      }
    })
    sendData()
    return () => channel.close()
  }, [data, http, refresh])

  return <FullScreenRandom current={current} previous={previous} loading={loading} />
}

export default RandomScreen
