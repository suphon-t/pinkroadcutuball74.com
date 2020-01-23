import React, { useEffect, useCallback, useState } from "react"
import QRCode from "qrcode.react"
import moment from "moment"

import ContentCard from "../components/ContentCard"
import { useAuthContext } from "../auth"

function CheckIn() {
  const { userId } = useAuthContext()
  const [time, setTime] = useState('')

  const updateTime = useCallback(() => {
    setTime(moment().format('HH:mm:ss'))
  }, [])

  useEffect(() => {
    const clear = setInterval(() => {
      updateTime()
    }, 1000)
    updateTime()
    return () => clearInterval(clear)
  }, [updateTime])

  const qrValue = JSON.stringify({ id: userId })

  return (
    <ContentCard>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <QRCode value={qrValue} />
        { time }
      </div>
    </ContentCard>
  )
}

export default CheckIn
