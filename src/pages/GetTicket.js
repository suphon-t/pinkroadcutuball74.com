import React, { useState } from "react"
import styled from "styled-components"

import ContentCard from "../components/ContentCard"
import Ticket from "../components/Ticket"
import OrangeButton from "../components/OrangeButton"
import vars from "../styles/vars"
import {lighten, darken} from "polished"
import { Input } from "antd"
import { useGet } from "../api"
import LoadingIcon from "../components/LoadingIcon"

const LogoutButton = styled(OrangeButton)`
  background: ${vars.darkBlue};
  border: 1px solid ${vars.darkBlue};
  color: ${vars.orange};
  margin: 40px auto;
  padding: 18px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 0px;
  &:not(:disabled) {
    &:hover,
    &:focus {
      background: ${lighten(0.08, vars.darkBlue)};
    }
    &:active {
      background: ${darken(0.1, vars.darkBlue)}
    }
  }
`

function GetTicket() {
  const { data: user } = useGet('/getuser')
  const [number, setNumber] = useState('0074')
  if (!user) {
    return <LoadingIcon />
  }
  const { name } = user.data
  const data = { number, name }
  return (
    <>
      <Input value={number} onChange={e => setNumber(e.target.value)} />
      <ContentCard style={{ padding: 16 }}>
        <Ticket data={data} style={{ borderRadius: 10 }} />
      </ContentCard>
      <LogoutButton>ออกจากระบบ</LogoutButton>
    </>
  )
}

export default GetTicket
