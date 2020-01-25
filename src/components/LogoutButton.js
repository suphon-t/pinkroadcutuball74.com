import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import OrangeButton from "./OrangeButton"
import vars from "../styles/vars"
import Flex from "./Flex"

function LogoutButton() {
  const { t } = useTranslation()
  return (
    <Flex justifyContent="center">
      <Link to="/logout" style={{ marginBottom: 30 }}>
        <OrangeButton background={vars.darkBlue} color={vars.orange}>{t("logout")}</OrangeButton>
      </Link>
    </Flex>
  )
}

export default LogoutButton
