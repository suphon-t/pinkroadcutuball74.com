
import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// component
import Demo from "./components/Demo"
import Register from "./pages/register"

const Admin = lazy(() => import('./admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Demo} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
