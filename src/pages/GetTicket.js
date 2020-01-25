import React, { useEffect, useState } from "react"
import ContentCard from "../components/ContentCard"
import Ticket from "../components/Ticket"

import ticketImg from "../images/ticket.png"
import ticket2x from "../images/ticket@2x.png"
import ticketWebp from "../images/ticket.webp"
import ticketWebp2x from "../images/ticket@2x.webp"
import { isHiDpi, supportsWebP } from "../utils"
import FullScreenLoading from "../components/FullScreenLoading"
import LogoutButtonFloating from "../components/LogoutButtonFloating"

function GetTicket({ ticket }) {
  let background = null
  if (supportsWebP) {
    background = isHiDpi ? ticketWebp2x : ticketWebp
  } else {
    background = isHiDpi ? ticket2x : ticketImg
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
