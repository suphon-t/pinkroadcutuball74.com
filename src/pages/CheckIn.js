import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { withContentRect } from "react-measure"
import QRCode from "qrcode.react"
import { Icon } from "antd"

import { useAuthContext } from "../auth"
import { useCurrentTime } from "../utils"
import CenterAlign from "../components/CenterAlign"
import ContentCard from "../components/ContentCard"
import Flex from "../components/Flex"
import ButtonBar from "../components/ButtonBar"
import vars from "../styles/vars"

const Container = styled.div`
  margin: 36px 0;
`

const Title = styled.h1`
  color: ${vars.darkBlue};
  font-weight: bold;
  font-size: 30px;
`

const Subtitle = styled.p`
  margin-top: 14px;
  margin-bottom: 21px;
  color: ${vars.grey4};
`

const QRBox = styled(QRCode)`
  width: 100%;
`

const BottomBar = styled(ButtonBar)`
  height: 36px;

  align-items: center;
  color: ${vars.darkBlue};
`

const RefreshIcon = styled(Icon)`
  cursor: pointer;
  transition: color ${vars.transitionLength};

  &:hover {
    color: ${vars.pink};
  }
`

const CheckIn = withContentRect('bounds')(({ measureRef, measure, contentRect }) => {
  const { t } = useTranslation()
  const { userId } = useAuthContext()
  const time = useCurrentTime()

  const qrValue = JSON.stringify({ id: userId })

  const { width } = contentRect.bounds
  const size = Math.max((width || 0) - 112, 200)

  return (
    <ContentCard ref={measureRef}>
      <Container>
        <CenterAlign>
          <Title>{t('scanqr.title')}<br />{t('scanqr.title2')}</Title>
          <Subtitle>{t('scanqr.subtitle')}</Subtitle>
        </CenterAlign>
        <Flex style={{ justifyContent: 'center' }}>
          <Flex direction="column">
            <QRBox size={size} value={qrValue} />
            <BottomBar>
              { time }
              <RefreshIcon type="reload" />
            </BottomBar>
          </Flex>
        </Flex>
      </Container>
    </ContentCard>
  )
})

export default CheckIn
