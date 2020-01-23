import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { down } from "styled-breakpoints"

import OrangeButton from "./OrangeButton"

const StyledLink = styled(Link).attrs({ background: '#e0e0e0'})`
  margin: 34px auto 0 auto;

  ${down("lg")} {
    display: none;
  }
`

function BackButton(props) {
  const { t } = useTranslation()
  return (
    <StyledLink to="/">
      <OrangeButton background="#e0e0e0" {...props}>{t("register.back")}</OrangeButton>
    </StyledLink>
  )
}

export default BackButton
