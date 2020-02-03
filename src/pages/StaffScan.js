import React, { useCallback, useEffect, useState } from "react"
import QrReader from "react-qr-reader"
import qs from "qs"

import { notification, Modal, Typography, Button } from "antd"
import { useTimeFormat } from "../utils"
import { usePostStatus } from "../api"
import styled, { createGlobalStyle } from "styled-components"
import vars from "../styles/vars"
import { useHistory, Link } from "react-router-dom"
import ContentContainer from "../components/ContentContainer"
import CustomPageHeader from "../components/CustomPageHeader"
import CurrentTime from "../components/CurrentTime"
import OrangeButton from "../components/OrangeButton"
import ButtonBar from "../components/ButtonBar"

const { Title, Text } = Typography

const GlobalStyle = createGlobalStyle`
  #background {
    background: ${vars.white} !important;

    & > div {
      display: none;
    }
  }
`

const BottomBar = styled.div`
  height: 80px;

  text-align: center;
  color: ${vars.darkBlue};
  font-size: 24px;
`

const Container = styled.div`
  margin: 40px 0;
  padding-bottom: 100%;
  position: relative;
  box-shadow: 0px 10px 48px 10px rgba(0,0,0,0.35);

  & > :first-child {
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

function StaffScan() {
  const history = useHistory()
  const [url, setUrl] = useState(window.location.href)
  const [scanInfo, setScanInfo] = useState(undefined)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const qrData = extractQrData(url)
    if (qrData?.userId !== scanInfo?.userId) {
      const newInfo = qrData && {
        ...qrData,
        scanTime: new Date().getTime()
      }
      setScanInfo(newInfo)
      if (newInfo) {
        setModalVisible(true)
      }
    }
  }, [url, scanInfo])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const { loading, execute: sendCheckin } = usePostStatus('/staff/checkin', false)

  const checkin = useCallback(async info => {
    const { userId } = info
    try {
      await sendCheckin({ id: userId })
      notification['success']({
        message: `Checked in ${userId}`,
      })
    } catch (err) {
      if (err?.response?.data) {
        notification['error']({
          message: `Failed to check in ${userId}`,
          description: err?.response?.data.error_description,
        })
      } else {
      notification['error']({
          message: `Failed to check in ${userId}`,
          description: JSON.stringify(err),
        })
      }
    }
    history.replace('/staff/scan')
    setModalVisible(false)
  }, [sendCheckin, history])

  useEffect(() => {
    if (scanInfo && Math.abs(scanInfo.gen - scanInfo.scanTime) < 5000) {
      checkin(scanInfo)
    }
  }, [checkin, scanInfo])

  const handleScan = useCallback(data => {
    setUrl(data)
  }, [])

  const handleError = useCallback(() => {}, [])

  const genTime = useTimeFormat(scanInfo?.gen)
  const scanTime = useTimeFormat(scanInfo?.scanTime)

  return (
    <>
      <GlobalStyle />
      <CustomPageHeader
        onBack={history.goBack}
        title="Scan"
        extra={[
          <Link key="1" to="/logout">
            <Button type="primary">Logout</Button>
          </Link>,
        ]}
        />
      <ContentContainer>
        <Container>
          { !modalVisible && <QrReader
            delay={300}
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%' }}
          /> }
        </Container>
        <BottomBar>
          <CurrentTime />
        </BottomBar>
      </ContentContainer>
      <Modal
        title="Check in"
        onCancel={closeModal}
        footer={null}
        visible={modalVisible}>
        <Title>{scanInfo?.userId}</Title>
        <Text
          style={{ fontSize: 20 }}
          level={3}
          type={
            getTextType(scanInfo?.gen, scanInfo?.scanTime)
          }
          >
          Gen: {genTime}
        </Text>
        <br />
        <Text
          style={{ fontSize: 20 }}
          level={3}
        >
          Scan: {scanTime}
        </Text>
        <ButtonBar style={{ marginTop: 16 }}>
          <OrangeButton background="#40edc2" color="white" disabled={loading} onClick={() => checkin(scanInfo)}>
            { loading ? 'Saving...' : 'Check in'}
          </OrangeButton>
        </ButtonBar>
      </Modal>
    </>
  )
}

function extractQrData(url) {
  try {
    const parts = url.split('?')
    const data = qs.parse(parts[1])
    return {
      ...data,
      gen: parseInt(data.gen),
    }
  } catch {
    return undefined
  }
}

function getTextType(time1, time2) {
  const diff = Math.abs(time1 - time2)
  if (diff < 5000) {
    return undefined
  } else if (diff < 10000) {
    return 'warning'
  } else {
    return 'danger'
  }
}

export default StaffScan
