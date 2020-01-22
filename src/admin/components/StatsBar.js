import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import StatsNumber from "./StatsNumber"

const Container = styled.div`
  display: flex;
  margin-top: 56px;

  justify-content: center;
`

const RegisterNumber = styled(StatsNumber)`
  background: linear-gradient(242.87deg, #F9C455 2.93%, #EE7398 103.13%);
`

const EnterNumber = styled(StatsNumber)`
  background: linear-gradient(285.47deg, #40EDC2 -13.25%, #F9C455 97.77%);
`

function StatsBar() {
  const { t } = useTranslation()
  return (
    <Container>
      <RegisterNumber title={t('admin.register')} count={0} />
      <EnterNumber title={t('admin.enter')} count={0} />
    </Container>
  )
}

export default StatsBar
