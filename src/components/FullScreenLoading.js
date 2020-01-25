import React from "react"
import styled, { keyframes } from "styled-components"

import LoadingIcon from "./LoadingIcon"

const delayedFadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

export default styled.div.attrs(({ theme, ...props }) => ({
  children: <LoadingIcon {...props} />,
}))`
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;

  animation: ${delayedFadeIn} .5s;
`
