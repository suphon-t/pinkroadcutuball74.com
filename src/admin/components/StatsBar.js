import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import { useGet } from "../../api"
import StatsNumber from "./StatsNumber"

const Container = styled.div`
  display: flex;
  margin: 56px 0;

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
  const { data, execute } = useGet('/admin/getstat')

  useEffect(() => {
    const clear = setInterval(execute, 1000)
    return () => clearInterval(clear)
  }, [execute])

  return (
    <Container>
      <RegisterNumber title={t('admin.register')} count={data?.data?.regist} />
      <EnterNumber title={t('admin.enter')} count={data?.data?.checkin} />
    </Container>
  )
}

export default StatsBar
