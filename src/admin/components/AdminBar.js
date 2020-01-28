import React from "react"
import styled from "styled-components"
import { Button } from "antd"
import { useHistory, Link } from "react-router-dom"

import BlurBehind from "../../components/BlurBehind"
import SafeArea from "../../components/SafeArea"
import { Up, Down } from "../../styles/breakpoints"
import CustomPageHeader from "../../components/CustomPageHeader"

const Bar = styled(BlurBehind)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;

  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 12px 45px -22px rgba(0, 0, 0, .35);
`

function AdminBar() {
  const history = useHistory()

  const header = (
    <SafeArea top left right>
      <CustomPageHeader
        onBack={history.goBack}
        title={(
          <>
            <Up breakpoint="md">CUTUBALL Admin Dashboard</Up>
            <Down breakpoint="sm">Admin</Down>
          </>
        )}
        extra={[
          <Link key="1" to="/logout">
            <Button type="primary">Logout</Button>
          </Link>,
        ]}
      />
    </SafeArea>
  )

  return (
    <>
      <Bar>{ header }</Bar>
      <div style={{ visibility: 'hidden' }}>{ header }</div>
    </>
  )
}
export default AdminBar
