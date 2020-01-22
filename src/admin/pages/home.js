import React from "react"

import AdminBar from "../components/AdminBar"
import StatsBar from "../components/StatsBar"
import DataTable from "../components/DataTable"
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
        <DataTable />
      </Container>
    </>
  )
}

export default Home
