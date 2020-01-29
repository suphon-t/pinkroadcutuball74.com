import React from "react"
import styled from "styled-components"
import { Typography, Icon } from "antd"

import ContentContainer from "./ContentContainer"
import vars from "../styles/vars"

const { Text } = Typography

const Container = styled(ContentContainer)`
  padding-top: 30px;
  padding-bottom: 24px;

  text-align: center;
`

const StyledText = styled(Text)`
  color: ${vars.grey5};
  font-weight: 300;

  a {
    color: ${vars.grey6};
  }
`

function Footer() {
  return (
    <Container>
      <StyledText>
        <a href="https://www.thinc.in.th">© 2020 Thinc.</a> — <a href="https://github.com/paphonb/pinkroadcutuball74.com"><Icon type="github" /></a>
      </StyledText>
    </Container>
  )
}

export default Footer
