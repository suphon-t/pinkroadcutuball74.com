import React from "react"
import ReactDOM from "react-dom"
import './i18n'

import * as serviceWorker from "./serviceWorker"

// App
import App from "./App"

ReactDOM.render(
  <App />,
  document.getElementById("root")
)

serviceWorker.unregister()
