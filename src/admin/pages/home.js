import React from "react"

import AdminBar from "../components/AdminBar"
import StatsBar from "../components/StatsBar"

function Home() {
  return (
    <>
      <AdminBar fixed="top" expand="lg"/>
      <StatsBar />
    </>
    )
}

export default Home
