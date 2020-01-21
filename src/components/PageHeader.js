import React from "react"

import Title from "./Title"
import Subtitle from "./Subtitle"
import styled from "styled-components"
import { up } from "styled-breakpoints"

const Container = styled.div`
  ${up('xl')} {
    ${Title} {
      font-size: 45px;
    }

    ${Subtitle} {
      font-size: 20px;
    }
  }
`

function PageHeader({ className, title, subtitle }) {
  return (
    <Container className={className}>
      <Title children={title} />
      <Subtitle children={subtitle} />
    </Container>
  )
}

export default PageHeader
