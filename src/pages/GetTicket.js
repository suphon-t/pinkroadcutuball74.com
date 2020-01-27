import React, { useEffect, useState } from "react"
import ContentCard from "../components/ContentCard"
import Ticket from "../components/Ticket"

import ticketImg from "../images/ticket.jpg"
import ticket2x from "../images/ticket@2x.jpg"
import { isHiDpi, useWindowDimensions } from "../utils"
import FullScreenLoading from "../components/FullScreenLoading"
import LogoutButtonFloating from "../components/LogoutButtonFloating"

function GetTicket({ ticket }) {
  const { width } = useWindowDimensions()
  // Small: 368x491, @2x: 738x982
  // Large: 638x851, @2x: 1276x1702
  const largeTicket = width >= 992
  const useHiDpi = isHiDpi && largeTicket

  const background = useHiDpi ? ticket2x : ticketImg

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const img = new Image()
    img.onload = () => setLoading(false)
    img.src = background
  }, [background])

  return (
    <>
      { loading && <FullScreenLoading /> }
      <ContentCard style={{ padding: 16 }} loading={loading}>
        <Ticket data={ticket} background={background} style={{ borderRadius: 10 }} />
      </ContentCard>
      <div style={{ opacity: loading ? 0 : 1 }}>
        <LogoutButtonFloating />
      </div>
    </>
  )
}

export default GetTicket
