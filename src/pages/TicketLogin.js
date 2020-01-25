import React from "react"
import { useTranslation } from "react-i18next"

import BaseLogin from "./BaseLogin"
import Field from "../components/Field"

function TicketLogin() {
  const { t } = useTranslation()

  return (
    <BaseLogin
      title={t('login.edtitle')}
      subtitle={t('login.edsubtitle')}
      buttonTitle="login.edsubmit"
      target="/ticket">
      { loading => <>
        <Field name="username" title={t("idNumber")} pattern="\d+|admin" disabled={loading} />
        <Field name="password" title={t("phoneNumber")} type="tel" disabled={loading} />
      </> }
    </BaseLogin>
  )
}

export default TicketLogin
