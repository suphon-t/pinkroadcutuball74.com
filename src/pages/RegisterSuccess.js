import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import success from "../images/success.svg"
import "../styles/register-success.scss"

function RegisterSuccess() {
  const { t } = useTranslation()
  return (
    <>
      <div className="logo-small" />
      <div className="content-card" style={{ textAlign: 'center' }}>
        <img className="success-tick" src={success} />
        <h1>{t('register.success.title')}</h1>
        <p>{t('register.success.subtitle')}</p>
        <Link to="/" id="backtohome">
          {t('register.success.backtohome')}
        </Link>
        <button id="checkinfo">
          {t('register.success.checkinfo')}
        </button>
      </div>
    </>
  )
}

export default RegisterSuccess
