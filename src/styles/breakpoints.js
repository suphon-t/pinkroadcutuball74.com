import React from "react"
import styled from "styled-components"
import { down, up } from "styled-breakpoints"

export default {
  xs: '1px',
  sm: '360px',
  md: '576px',
  lg: '768px',
  xl: '992px',
  xxl: '1200px',
  xxxl: '1440px',
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
