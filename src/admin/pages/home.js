import React, { useState } from "react"
import styled from "styled-components"

import AdminBar from "../components/AdminBar"
import StatsBar from "../components/StatsBar"
import UsersTable from "../components/UsersTable"

const Container = styled.div`
  margin: 0 64px;
`

function Home() {
  const [showCheckedIn, setShowCheckedIn] = useState(false)
  return (
    <>
      <AdminBar fixed="top" expand="lg"/>
      <Container>
        <StatsBar showCheckedIn={showCheckedIn} setShowCheckedIn={setShowCheckedIn} />
        <UsersTable showCheckedIn={showCheckedIn} />
      </Container>
    </>
  )
}

export default Home
