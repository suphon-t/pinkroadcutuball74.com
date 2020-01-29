import React from "react"
import styled from "styled-components"
import { between } from "polished"
import { up, down } from "styled-breakpoints"

import breakpoints from "../styles/breakpoints"

const sideMargin = between('30px', '88px', breakpoints.sm, breakpoints.md)

const Container = styled.div`
  display: block;
  margin-left: ${sideMargin};
  margin-right: ${sideMargin};

  ${down("xs")} {
    margin-left: 15px;
    margin-right: 15px;
  }

  ${up("md")} {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  ${up("xl")} {
    width: 670px;
  }
`

const ContentContainer = React.forwardRef((props, ref) => {
  return <Container ref={ref} {...props} />
})

export default ContentContainer
