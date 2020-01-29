import React from "react"
import styled from "styled-components"

import SafeArea from "./SafeArea"
import BlurBehind from "./BlurBehind"

const StatusBar = styled(BlurBehind)`
  position: fixed;
  top: 0;
  width: 100%;
  height: env(safe-area-inset-top);
  z-index: 2;

  background: rgba(51, 51, 51, 0.3);
`

function StatusBarLayout({ className, children }) {
  return (
    <>
      <StatusBar />
      <SafeArea all className={className}>
        {children}
      </SafeArea>
    </>
  )
}

export default StatusBarLayout
