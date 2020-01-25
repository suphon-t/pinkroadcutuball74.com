import React from "react"
import { hydrate, render } from "react-dom"
import './i18n'

import * as serviceWorker from "./serviceWorker"

// App
import App from "./App"

const rootElement = document.getElementById("root")
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

serviceWorker.unregister()
