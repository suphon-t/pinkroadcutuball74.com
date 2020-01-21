import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

import { down, up } from "styled-breakpoints"
import { between } from "polished"
import breakpoints from "../../styles/breakpoints"



const Bar = styled.div`
  display: block;
  margin: 0 
  padding: 80px 36px 40px 80px;
  display: flex;

  background: ${vars.white};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 0px;
`
const Title = styled.h1`
  margin:10px 0 10px 0;
  color: ${vars.darkBlue};
  font-weight: medium;
  font-size: 40px;
  line-height: 60px;
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
`
function AdminBar() {
  return <Bar>
    <Title>CUTUBALL Admin Dashboard</Title>
  </Bar>
}
export default AdminBar
