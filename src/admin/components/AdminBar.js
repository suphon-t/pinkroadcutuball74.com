import React from "react"
import styled from "styled-components"
import { PageHeader, Button } from "antd"
import { useHistory, Link } from "react-router-dom"

const Bar = styled.div`
  box-shadow: 0 12px 45px -22px rgba(0, 0, 0, .35);
`

function AdminBar() {
  const history = useHistory()
  return (
    <Bar>
      <PageHeader
        onBack={history.goBack}
        title="CUTUBALL Admin Dashboard"
        extra={[
          <Link key="1" to="/logout">
            <Button type="primary">Logout</Button>
          </Link>,
        ]} />
    </Bar>
  )
}
export default AdminBar
