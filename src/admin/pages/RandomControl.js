import React, { useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import { List, Card, Typography, Button, notification } from "antd"

import FullScreenLoading from "../../components/FullScreenLoading"
import Channel from "../../utils/Channel"
import Layout from "./Layout"
import vars from "../../styles/vars"
import SafeArea from "../../components/SafeArea"

const { Title } = Typography

const TopPanel = styled.div`
  margin: 24px 0;
`

function RandomControl() {
  const [connecting, setConnecting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [channel, setChannel] = useState(null)
  const [data, setData] = useState([])

  const randomAgain = useCallback(() => {
    setLoading(true)
    channel.send('pls give more')
  }, [channel])

  useEffect(() => {
    const channel = new Channel('randomScreen', (action, payload) => {
      switch (action) {
        case 'yo i got these':
          setConnecting(false)
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
    <Layout>
      { connecting ? <FullScreenLoading color={vars.pink} /> : (
        <SafeArea all>
          <TopPanel>
            <Button type="primary" shape="round" size="large" onClick={randomAgain} loading={loading}>Random again</Button>
          </TopPanel>
          <Title>Previous entries</Title>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card>
                  <List.Item.Meta
                    title={item.number}
                    description={item.name}
                  />
                </Card>
              </List.Item>
            )}
          />
        </SafeArea>
      ) }
    </Layout>
  )
}

export default RandomControl
