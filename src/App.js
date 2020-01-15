import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import "./yup-init"

// components
import Routes from "./routes"

// style
import breakpoints from "./styles/breakpoints"
import background from "./images/background.svg"
import "./styles/app.scss"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Prompt;
    font-weight: normal;
  }
`

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;

  background: linear-gradient(180deg, #f9c455 0%, #ee7398 35.42%);
  background-attachment: fixed;
`

const BackgroundArt = styled(Background)`
  background: none;

  @media screen and (orientation: portrait) {
    background: url(${background}) bottom no-repeat;
    background-attachment: fixed;
    background-size: contain;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ breakpoints }}>
        <Background />
        <BackgroundArt />
        <Content>
          <Routes />
        </Content>
      </ThemeProvider>
    </>
  )
}

export default App
