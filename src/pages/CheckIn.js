import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { withContentRect } from "react-measure"
import QRCode from "qrcode.react"
import { Icon } from "antd"
import qs from "qs"

import { useAuthContext } from "../auth"
import { useCurrentTime } from "../utils"
import CenterAlign from "../components/CenterAlign"
import ContentCard from "../components/ContentCard"
import Flex from "../components/Flex"
import ButtonBar from "../components/ButtonBar"
import vars from "../styles/vars"
import LogoutButtonFloating from "../components/LogoutButtonFloating"
import CurrentTime from "../components/CurrentTime"

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
  height: 40px;

  align-items: center;
  color: ${vars.darkBlue};
  font-size: 20px;
`

const RefreshIcon = styled(Icon)`
  cursor: pointer;
  transition: color ${vars.transitionLength};

  &:hover {
    color: ${vars.pink};
  }
`

const CheckIn = withContentRect("bounds")(({ measureRef, contentRect, refresh, loading }) => {
  const { t } = useTranslation()
  const { userId } = useAuthContext()
  const [, time] = useCurrentTime({ timeout: 2000 })

  const qrValue = `${window.location.origin}/staff/scan?${qs.stringify({ 
    userId,
    gen: time,
  })}`

  const { width } = contentRect.bounds
  const size = Math.max((width || 0) - 112, 200)

  return (
    <>
      <ContentCard ref={measureRef}>
        <Container>
          <CenterAlign>
            <Title>
              {t("scanqr.title")}
              <br />
              {t("scanqr.title2")}
            </Title>
            <Subtitle>{t("scanqr.subtitle")}</Subtitle>
          </CenterAlign>
          <Flex style={{ justifyContent: "center" }}>
            <Flex direction="column">
              <QRBox size={size} value={qrValue} />
              <BottomBar>
                <CurrentTime />
                { loading ? (
                  <Icon type="loading" spin style={{ color: vars.pink }} />
                ) : (
                  <RefreshIcon type="reload" onClick={refresh} />
                )}
              </BottomBar>
            </Flex>
          </Flex>
        </Container>
      </ContentCard>
      <LogoutButtonFloating />
    </>
  )
})

export default CheckIn
