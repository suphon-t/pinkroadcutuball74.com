import React from "react"
import { useTranslation } from "react-i18next"

import Login from "./Login"
import Field from "../components/Field"

function TicketLogin() {
  const { t } = useTranslation()

  return (
    <Login
      title="login.edtitle"
      subtitle="login.edsubtitle"
      buttonTitle="login.edsubmit"
      target="/ticket">
      { loading => <>
        <Field name="username" title={t("idNumber")} pattern="\d+|admin" disabled={loading} />
        <Field name="password" title={t("phoneNumber")} type="tel" disabled={loading} />
      </> }
    </Login>
  )
}

export default TicketLogin
