import React from "react"
import { Icon } from "antd"
import styled from "styled-components"
import vars from "../styles/vars"

function LoadingIcon(props) {
  return <Icon type="loading" spin {...props} />
}

export default styled(LoadingIcon)`
  display: block;
  margin: auto;

  color: ${({ color }) => color || vars.white};
  font-size: 100px;
`
