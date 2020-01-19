import React from "react"
import ContentCard from "../components/ContentCard"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import vars from "../styles/vars"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import OrangeButton from "../components/OrangeButton"
import { Link } from "react-router-dom"

function NoMatch() {
  const { t } = useTranslation()
  return (
    <ContentCard style={{ textAlign: 'center' }}>
      <Title>{t('noMatch.title')}</Title>
      <Subtitle>{t('noMatch.subtitle')}</Subtitle>
      <Link style={{ display: 'inline-block', marginTop: 16 }} to="/">
        <OrangeButton>{t('noMatch.returnHome')}</OrangeButton>
      </Link>
    </ContentCard>
  )
}

export default NoMatch
