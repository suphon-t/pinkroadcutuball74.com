import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"

import { ReactComponent as Success } from "../images/success.svg"
import styled from "styled-components"
import vars from "../styles/vars"
import { landingRoute } from "../utils"

const BackToHome = styled(OrangeButton)`
  margin: 100px auto 0 auto;
`

const CheckInfo = styled(OrangeButton).attrs({
  background: '#e0e0e0'
})`
  margin: 24px auto 54px auto;
`

const Title = styled.h1`
  margin-top: 36px;

  color: ${vars.darkBlue};
  font-weight: bold;
  font-size: 30px;
  line-height: 45px;
`

const Subtitle = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  color: ${vars.grey4};
`

function RegisterSuccess() {
  const { t } = useTranslation()
  return (
    <>
      <ContentCard id="register-success" style={{ textAlign: 'center' }}>
        <Success style={{ marginTop: 80 }} />
        <Title>{t('register.success.title')}</Title>
        <Subtitle>{t('register.success.subtitle')}</Subtitle>
        <Link to={landingRoute}>
          <BackToHome>{t('register.backtohome')}</BackToHome>
        </Link>
        <Link to="/login">
          <CheckInfo>{t('register.checkinfo')}</CheckInfo>
        </Link>
      </ContentCard>
    </>
  )
}

export default RegisterSuccess
