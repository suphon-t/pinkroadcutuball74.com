import React from "react"
import styled from "styled-components"

import background from "../images/background.svg"
import backgroundLand from "../images/background-land.svg"

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;

  flex-direction: column-reverse;
`

const Art = styled.img`
  width: 100%;

  object-fit: cover;
  content: url(${background});

  @media screen and (orientation: landscape) {
    content: url(${backgroundLand});
  }
`

function Background() {
  return (
    <Container id="background">
      <Art alt="" />
    </Container>
  )
}

export default Background
