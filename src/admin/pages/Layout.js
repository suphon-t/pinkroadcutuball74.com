import React from "react"
import styled from "styled-components"

import AdminBar from "../components/AdminBar"

const Container = styled.div`
  margin: 0 64px;
`

function Layout({ children, ...props }) {
  return (
    <>
      <AdminBar />
      <Container {...props}>
        { children }
      </Container>
    </>
  )
}

export default Layout
