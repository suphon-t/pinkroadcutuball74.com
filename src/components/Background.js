import React from "react"
import styled from "styled-components"

import background from "../images/background.svg"
import backgroundLand from "../images/background-land.svg"

const Art = styled.img`
  position: absolute;
  bottom: 0;
  width: 100vw;
  z-index: -99;

  object-fit: cover;
  content: url(${background});

  @media screen and (orientation: landscape) {
    content: url(${backgroundLand});
  }
`

function Background() {
  return <Art alt="" />
}

export default Background
