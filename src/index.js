import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

// ROUTER
import { ConnectedRouter } from "connected-react-router"

// THEME
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from "./theme/muiTheme"

// REDUX
import { Provider } from "react-redux"
import configureStore, { history } from "./store/configureStore"

// App
import App from "./App"

// Create Store
const store = configureStore()

// Render function
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Component />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  )
}

// Render Once
render(App)

serviceWorker.unregister()
