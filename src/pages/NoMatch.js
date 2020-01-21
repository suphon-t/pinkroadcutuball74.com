import React from "react"
import ContentCard from "../components/ContentCard"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Result } from "antd"

import OrangeButton from "../components/OrangeButton"

function NoMatch() {
  const { t } = useTranslation()
  return (
    <ContentCard>
      <Result
        status="404"
        title="404"
        subTitle={t('noMatch.subtitle')}
        extra={
          <Link style={{ display: 'inline-block' }} to="/">
            <OrangeButton>{t('noMatch.returnHome')}</OrangeButton>
          </Link>
        }
      />
    </ContentCard>
  )
}

export default NoMatch
