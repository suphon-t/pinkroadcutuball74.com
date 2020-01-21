import React from "react"
import ContentCard from "../components/ContentCard"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import OrangeButton from "../components/OrangeButton"

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
