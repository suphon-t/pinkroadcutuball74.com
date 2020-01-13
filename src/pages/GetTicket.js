import React, { useState } from "react"
import ContentCard from "../components/ContentCard"
import Ticket from "../components/Ticket"
import { Input } from "antd"

function GetTicket() {
  const [number, setNumber] = useState('0074')
  const [name, setName] = useState('คุณจุฬา ยืนหนึ่ง')
  const data = { number, name }
  return (
    <>
      <Input value={number} onChange={e => setNumber(e.target.value)} />
      <Input value={name} onChange={e => setName(e.target.value)} />
      <ContentCard style={{ padding: 0 }}>
        <Ticket data={data} style={{ borderRadius: 10 }} />
      </ContentCard>
    </>
  )
}

export default GetTicket
