import React from "react"

import BaseLogin from "./BaseLogin"
import Field from "../components/Field"

function Login() {
  return (
    <BaseLogin title="Admin login">
      { loading => <>
        <Field name="username" title="Username" disabled={loading} />
        <Field name="password" title="Password" type="password" disabled={loading} />
      </> }
    </BaseLogin>
  )
}

export default Login
