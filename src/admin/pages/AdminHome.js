import React, { useState } from "react"

import Layout from "./Layout"
import StatsBar from "../components/StatsBar"
import UsersTable from "../components/UsersTable"
import SafeArea from "../../components/SafeArea"

function AdminHome() {
  const [showCheckedIn, setShowCheckedIn] = useState(false)

  return (
    <Layout style={{ margin: 0 }}>
      <SafeArea left right>
        <StatsBar style={{ margin: '0 64px' }} showCheckedIn={showCheckedIn} setShowCheckedIn={setShowCheckedIn} />
      </SafeArea>
      <UsersTable showCheckedIn={showCheckedIn} />
    </Layout>
  )
}

export default AdminHome
