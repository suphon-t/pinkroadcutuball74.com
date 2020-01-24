import React, { useCallback, useEffect, useState, useMemo } from "react"
import QrReader from "react-qr-reader"
import qs from "qs"

import ContentCard from "../components/ContentCard"
import ButtonBar from "../components/ButtonBar"
import { notification, Icon } from "antd"
import { useCurrentTime } from "../utils"
import { useFakePost } from "../api"
import styled from "styled-components"
import vars from "../styles/vars"

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

  const { loading, execute: sendCheckin } = useFakePost('/admin/checkin')

  const checkin = useCallback(async () => {
    if (!userId) return
    try {
      await sendCheckin({ userId })
      notification['success']({
        message: `Checked in ${userId}`,
      })
    } catch (err) {
      notification['error']({
        message: JSON.stringify(err),
      })
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
  )
}

export default StaffScan
