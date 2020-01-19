import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import "./yup-init"

import { AuthProvider } from "./auth"
import { HttpProvider } from "./api"
import Routes from "./routes"

// style
import breakpoints from "./styles/breakpoints"
import background from "./images/background.svg"
import backgroundLand from "./images/background-land.svg"
import "./styles/app.scss"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Prompt;
    font-weight: normal;
  }
`

const Background = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;

  background: linear-gradient(180deg, #f9c455 0%, #ee7398 35.42%);
  background-attachment: fixed;
  flex-direction: column-reverse;
`

const BackgroundArt = styled.img`
  width: 100%;

  object-fit: cover;
  content: url(${background});

  @media screen and (orientation: landscape) {
    content: url(${backgroundLand});
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`

function Providers({ children }) {
  return (
    <AuthProvider>
      <HttpProvider>
        {children}
      </HttpProvider>
    </AuthProvider>
  )
}

function App() {
  return (
    <Providers>
      <GlobalStyle />
      <ThemeProvider theme={{ breakpoints }}>
        <Background>
          <BackgroundArt />
        </Background>
        <Content>
          <Routes />
        </Content>
      </ThemeProvider>
    </Providers>
  )
}

export default App
