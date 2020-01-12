import React from "react"
import { useTranslation } from "react-i18next"

function RegisterSuccess() {
  const { t } = useTranslation()
  return (
    <>
      <div className="logo-small" />
      <div className="content-card">
        <h1>{t('register.success.title')}</h1>
      </div>
    </>
  )
}

export default RegisterSuccess
