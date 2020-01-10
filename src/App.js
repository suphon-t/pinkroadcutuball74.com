import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// component
import Register from "./pages/register"
import Landing from "./pages/landing"

const Admin = lazy(() => import('./admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
