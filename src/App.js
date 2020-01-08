import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// component
import Demo from "./component/Demo"

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Demo} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
