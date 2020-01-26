import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import { useGet } from "../../api"
import StatsNumber from "./StatsNumber"
import { down } from "styled-breakpoints"

const Container = styled.div`
  display: flex;
  margin: 56px 0;

  justify-content: center;

  ${down('sm')} {
    margin: 24px -8px;
  }
`

const RegisterNumber = styled(StatsNumber)`
  &::before {
    background: linear-gradient(242.87deg, #F9C455 2.93%, #EE7398 103.13%);
  }
`

const EnterNumber = styled(StatsNumber)`
  &::before {
    background: linear-gradient(285.47deg, #40EDC2 -13.25%, #F9C455 97.77%);
  }
`

function StatsBar({ showCheckedIn, setShowCheckedIn }) {
  const { t } = useTranslation()
  const { data, execute } = useGet('/admin/getstat')

  useEffect(() => {
    const clear = setInterval(execute, 1000)
    return () => clearInterval(clear)
  }, [execute])

  return (
    <Container>
      <RegisterNumber 
        active={!showCheckedIn}
        onClick={() => setShowCheckedIn(false)}
        title={t('admin.register')} 
        count={data?.data?.regist} />
      <EnterNumber
        active={showCheckedIn}
        onClick={() => setShowCheckedIn(true)}
        title={t('admin.enter')}
        count={data?.data?.checkin} />
    </Container>
  )
}

export default StatsBar
