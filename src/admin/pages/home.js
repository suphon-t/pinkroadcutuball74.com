import React from "react"

import AdminBar from "../components/AdminBar"
import StatsBar from "../components/StatsBar"
import UsersTable from "../components/UsersTable"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 64px;
`

function Home() {
  return (
    <>
      <AdminBar fixed="top" expand="lg"/>
      <Container>
        <StatsBar />
        <UsersTable />
      </Container>
    </>
  )
}

export default Home
