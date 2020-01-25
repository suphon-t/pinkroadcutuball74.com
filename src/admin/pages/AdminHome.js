import React, { useState } from "react"

import Layout from "./Layout"
import StatsBar from "../components/StatsBar"
import UsersTable from "../components/UsersTable"

function AdminHome() {
  const [showCheckedIn, setShowCheckedIn] = useState(false)

  return (
    <Layout style={{ margin: 0 }}>
      <StatsBar style={{ margin: '0 64px' }} showCheckedIn={showCheckedIn} setShowCheckedIn={setShowCheckedIn} />
      <UsersTable showCheckedIn={showCheckedIn} />
    </Layout>
  )
}

export default AdminHome
