import React from "react"
import { Icon } from "antd"
import styled from "styled-components"

function LoadingIcon(props) {
  return <Icon type="loading" spin {...props} />
}

export default styled(LoadingIcon)`
  display: block;
  margin: auto;

  color: white;
  font-size: 100px;
`
