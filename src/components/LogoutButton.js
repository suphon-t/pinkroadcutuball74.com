import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import OrangeButton from "./OrangeButton"

function LogoutButton(props) {
  const { t } = useTranslation()
  return (
    <Link to="/logout">
      <OrangeButton background="#e0e0e0" {...props}>{t("logout")}</OrangeButton>
    </Link>
  )
}

export default LogoutButton
