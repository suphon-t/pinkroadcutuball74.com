import React, { lazy, useEffect } from "react"

import GetTicket from "./GetTicket"
import { useGet } from "../api"
import FullScreenLoading from "../components/FullScreenLoading"

const CheckIn = lazy(() => import(/* webpackPrefetch: true */ "../pages/CheckIn"))

function CheckInTicket() {
  const { data, error, execute: refresh } = useGet('/getticket')
  const cachedTicket = JSON.parse(localStorage.getItem('ticket') || 'null')
  const ticket = (data && data.data[0]) || cachedTicket

  useEffect(() => {
    if (data) {
      localStorage.setItem('ticket', JSON.stringify(data.data[0]))
    } else if (error) {
      localStorage.removeItem('ticket')
    }
  }, [data, error])

  if (!ticket && !error) {
    return <FullScreenLoading />
  }

  if (error) {
    if (error?.response?.data?.error === 'NOCHKIN') {
      return <CheckIn refresh={refresh} />
    } else {
      throw error
    }
  }
  return <GetTicket ticket={ticket} />
}

export default CheckInTicket
