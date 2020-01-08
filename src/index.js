import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

// THEME
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/muiTheme"

// App
import App from "./App"

// Render function
const render = Component => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>,
    document.getElementById("root")
  )
}

// Render Once
render(App)

serviceWorker.unregister()
