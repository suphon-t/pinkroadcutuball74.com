import React from "react"
import styled from "styled-components"
import { down, up } from "styled-breakpoints"

export default {
  xs: 1,
  sm: 360,
  md: 576,
  lg: 768,
  xl: 992,
  xxl: 1200,
}

export const Down = styled.div`
  display: none;

  ${({breakpoint}) => down(breakpoint)} {
    display: initial;
  }
`

export const Up = styled.div`
  display: none;

  ${({breakpoint}) => up(breakpoint)} {
    display: initial;
  }
`

export const MobileDown = props => <Down breakpoint="sm" {...props} />
export const MobileUp = props => <Up breakpoint="sm" {...props} />
export const TabletDown = props => <Down breakpoint="md" {...props} />
export const TabletUp = props => <Up breakpoint="md" {...props} />
export const DesktopDown = props => <Down breakpoint="lg" {...props} />
export const DesktopUp = props => <Up breakpoint="lg" {...props} />
