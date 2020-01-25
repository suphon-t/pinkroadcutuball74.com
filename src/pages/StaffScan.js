import React, { useCallback, useEffect, useState, useMemo } from "react"
import QrReader from "react-qr-reader"
import qs from "qs"

import ContentCard from "../components/ContentCard"
import ButtonBar from "../components/ButtonBar"
import { notification, Icon } from "antd"
import { useCurrentTime } from "../utils"
import { usePostStatus } from "../api"
import styled from "styled-components"
import vars from "../styles/vars"
import LogoutButtonFloating from "../components/LogoutButtonFloating"

const LoadingIcon = styled(Icon)`
  display: block;

  color: ${vars.pink};
  font-size: 48px;
`

const BottomBar = styled(ButtonBar)`
  height: 80px;

  align-items: center;
  color: ${vars.darkBlue};
  font-size: 24px;
`

function StaffScan() {
  const time = useCurrentTime()
  const [url, setUrl] = useState(window.location.href)
  const userId = useMemo(() => {
    if (!url) return undefined
    const parts = url.split('?')
    if (parts.length !== 2) return undefined
    return qs.parse(parts[1]).userId
  }, [url])

  const { loading, execute: sendCheckin } = usePostStatus('/staff/checkin', false)

  const checkin = useCallback(async () => {
    if (!userId) return
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
  }, [userId, sendCheckin])

  useEffect(() => {
    checkin()
  }, [checkin])

  const handleScan = useCallback(data => {
    setUrl(data)
  }, [])

  const handleError = useCallback(() => {

  }, [])

  return (
    <>
      <ContentCard>
        <QrReader
          delay={300}
          onScan={handleScan}
          onError={handleError}
          style={{ width: '100%' }}
        />
        <BottomBar>
          { time }
          { loading && <LoadingIcon type="loading" /> }
        </BottomBar>
      </ContentCard>
      <LogoutButtonFloating />
    </>
  )
}

export default StaffScan
