import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import "./yup-init"

import { AuthProvider } from "./auth"
import { HttpProvider } from "./api"
import Routes from "./routes"
import Background from "./components/Background"

// style
import breakpoints from "./styles/breakpoints"
import "./styles/app.scss"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Prompt;
    font-weight: normal;
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
        <Background />
        <Content>
          <Routes />
        </Content>
      </ThemeProvider>
    </Providers>
  )
}

export default App
