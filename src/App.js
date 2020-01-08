
import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// component
import Demo from "./component/Demo"

const Admin = lazy(() => import('./admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Demo} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
