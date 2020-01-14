import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import "./yup-init"

// components
import Register from "./pages/Register"
import RegisterSuccess from "./pages/RegisterSuccess"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import GetTicket from "./pages/GetTicket"

// style
import breakpoints from "./styles/breakpoints"
import background from "./images/background.svg"
import "./styles/app.scss"

// lazy
const Admin = lazy(() => import("./admin"))

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
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/register/success" component={RegisterSuccess} />
                <Route path="/ticket" component={GetTicket} />
                <Route path="/admin" component={Admin} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </Content>
      </ThemeProvider>
    </>
  )
}

export default App
