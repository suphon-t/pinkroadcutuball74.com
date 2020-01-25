import React from "react"
import styled from "styled-components"

import Flex from "./Flex"
import LogoutButton from "./LogoutButton"
import { up } from "styled-breakpoints"
import { Up } from "../styles/breakpoints"

const Bar = styled(Flex).attrs({
  justifyContent: 'space-evenly',
})`
  margin: 2.5rem auto 0;
`

const MobileLogout = styled(LogoutButton)`
  margin-top: 24px;
  margin-bottom: 10px;

  ${up('xl')} {
    display: none;
  }
`

function LogoutButtonBar({ children, ...props }) {
  return (
    <>
      <Bar {...props}>
        <Up breakpoint="xl">
          <LogoutButton />
        </Up>
        { children }
      </Bar>
      <Flex justifyContent="center">
        <MobileLogout />
      </Flex>
    </>
  )
}

export default LogoutButtonBar
