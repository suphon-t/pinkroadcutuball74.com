import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

import { down, up } from "styled-breakpoints"
import { between } from "polished"
import breakpoints from "../../styles/breakpoints"


const sideMargin = between('30px', '88px', breakpoints.sm, breakpoints.md)

const Bar = styled.div`
  display: block;
  margin: 0 ${sideMargin} 30px ${sideMargin};
  padding: 20px 36px 28px 36px;

  background: ${vars.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px;

  ${down("xs")} {
    margin: 0 15px 30px 15px;
  }

  ${up("md")} {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`
const Title = styled.h1`
  margin-top: 36px;

  color: ${vars.darkBlue};
  font-weight: bold;
  font-size: 30px;
  line-height: 45px;
`
function AdminBar() {
  return <Bar>
    <Title>CUTUBALL Admin Dashboard</Title>
  </Bar>
}

export default AdminBar
