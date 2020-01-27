import React from "react"
import { useTranslation } from "react-i18next"

import BaseLogin from "./BaseLogin"
import Field from "../components/Field"

function Login() {
  const { t } = useTranslation()

  return (
    <BaseLogin title={t('login.title')} subtitle={t('login.subtitle')}>
      { loading => <>
        <Field name="username" title={t("idNumber")} pattern="\d*" disabled={loading} />
        <Field name="password" title={t("phoneNumber")} type="tel" disabled={loading} />
      </> }
    </BaseLogin>
  )
}

export default Login
