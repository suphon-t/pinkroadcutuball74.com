import React, { lazy, useEffect, useState } from "react"

import GetTicket from "./GetTicket"
import { useGet } from "../api"
import FullScreenLoading from "../components/FullScreenLoading"

const CheckIn = lazy(() => import(/* webpackPrefetch: true */ "../pages/CheckIn"))

function CheckInTicket() {
  const { loading, data, error, execute: refresh } = useGet('/getticket')
  const cachedTicket = JSON.parse(localStorage.getItem('ticket') || 'null')
  const ticket = (data && data.data[0]) || cachedTicket

  const [needsCheckin, setNeedsCheckin] = useState(false)

  useEffect(() => {
    if (data) {
      localStorage.setItem('ticket', JSON.stringify(data.data[0]))
    } else if (error) {
      if (error?.response?.data?.error === 'NOCHKIN') {
        localStorage.removeItem('ticket')
        setNeedsCheckin(true)
      }
    }
  }, [data, error])

  if (ticket) {
    return <GetTicket ticket={ticket} />
  }

  if (needsCheckin || error?.response?.data?.error === 'NOCHKIN') {
    return <CheckIn loading={loading} refresh={refresh} />
  }

  if (error) {
    throw error
  }

  return <FullScreenLoading />
}

export default CheckInTicket
