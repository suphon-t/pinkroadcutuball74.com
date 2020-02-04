import React, { useEffect, useState, useCallback, useRef } from "react"
import { notification, Switch, Row, Col, Typography } from "antd"

import RandomControl from "./RandomControl"
import { useGet } from "../../api"
import CustomModal from "../../components/CustomModal"
import { formatQueueNumber } from "../../utils"
import styled from "styled-components"
import Channel from "../../utils/Channel"
import { initialScreenState } from "./RandomShow"
import Layout from "./Layout"
import SafeArea from "../../components/SafeArea"

const { Title } = Typography

function RandomRemote() {
  const { data, execute: refresh } = useGet('/admin/randomhistory')
  const { data: randomResult, error: randomError, loading, execute: random } = useGet('/admin/random', {}, false)
  const [modalVisible, setModalVisible] = useState(false)
  const [screenState, setScreenState] = useState(initialScreenState)
  const channelRef = useRef(null)

  useEffect(() => {
    const channel = new Channel('randomScreen', async (action, payload) => {
      switch (action) {
        case 'hey im here':
          // Trigger state update to resend
          setScreenState(state => ({ ...state }))
          notification['success']({
            message: 'Screen found',
          })
          break
        default:
          break
      }
    })
    channel.send('u there?')
    channelRef.current = channel
    return () => {
      channelRef.current = null
      channel.close()
    }
  }, [refresh])

  useEffect(() => {
    channelRef.current && channelRef.current.send('heres ur state', screenState)
  }, [screenState])

  useEffect(() => {
    if (randomResult?.data) {
      channelRef.current && channelRef.current.send('pls refresh')
      refresh()
      setModalVisible(true)
    }
  }, [randomResult, refresh])

  useEffect(() => {
    if (randomError) {
      notification['error']({
        message: 'Random failed',
        description: randomError?.response?.data?.error_description || JSON.stringify(randomError),
      })
    }
  }, [randomError])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <Layout>
      <SafeArea all>
        <Row gutter={16}>
          <Col xs={24} lg={18}>
            <RandomControl data={data?.data} loading={loading} randomAgain={random} />
          </Col>
          <Col xs={0} lg={6} style={{ marginTop: 16 }}>
            <Title>Screen control</Title>
            Shown: <Switch defaultChecked={!screenState.hidden} onChange={checked => setScreenState(state => ({ ...state, hidden: !checked }))} />
          </Col>
        </Row>
        <ResultModal data={randomResult?.data} visible={modalVisible} onCancel={closeModal} />
      </SafeArea>
    </Layout>
  )
}

const Number = styled.h1`
  font-size: 96px;
  font-weight: 600;
  text-align: center;
`

const Name = styled.h2`
  font-size: 36px;
  text-align: center;
`

function ResultModal({ data, ...props }) {
  return (
    <CustomModal {...props}>
      <Number>{formatQueueNumber(data?.number)}</Number>
      <Name>{data?.name}</Name>
    </CustomModal>
  )
}

export default RandomRemote
