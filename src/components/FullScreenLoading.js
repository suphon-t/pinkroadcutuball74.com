import React from "react"
import styled, { keyframes } from "styled-components"

import LoadingIcon from "./LoadingIcon"

const delayedFadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

export default styled.div.attrs({
  children: <LoadingIcon />,
})`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 99;

  animation: ${delayedFadeIn} .5s;
`
