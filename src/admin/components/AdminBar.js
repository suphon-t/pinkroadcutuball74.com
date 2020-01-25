import React from "react"
import styled from "styled-components"
import { PageHeader, Button } from "antd"
import { useHistory, Link } from "react-router-dom"
import vars from "../../styles/vars"

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;

  background: ${vars.white};
  box-shadow: 0 12px 45px -22px rgba(0, 0, 0, .35);
`

function AdminBar() {
  const history = useHistory()

  const header = (
    <PageHeader
      onBack={history.goBack}
      title="CUTUBALL Admin Dashboard"
      extra={[
        <Link key="1" to="/logout">
          <Button type="primary">Logout</Button>
        </Link>,
      ]}
    />
  )

  return (
    <>
      <Bar>{ header }</Bar>
      <div style={{ opacity: 0 }}>{ header }</div>
    </>
  )
}
export default AdminBar
