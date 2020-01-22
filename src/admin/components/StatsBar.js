import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import reqwest from 'reqwest'

import { usePromise } from "../../api"
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

function fetchstat(callback) {
  reqwest({
    url: 'https://api-staging-dot-cutuball.appspot.com/admin/getstat',
    method: 'get',
    type: 'json',
    headers: {Authorization: "Bearer " + localStorage.getItem('access_token')}
  }).then(data => {
      callback({registerCount: data.regist, enterCount: data.checkin});
  });
}

function StatsBar() {
  const { t } = useTranslation()
  const { data, setPromise } = usePromise()

  useEffect(() => {
    setPromise(new Promise(resolve => {
      setTimeout(() => {
        fetchstat(resolve)
      }, 1000)
    }))
  }, [data])

  return (
    <Container>
      <RegisterNumber title={t('admin.register')} count={data?.registerCount} />
      <EnterNumber title={t('admin.enter')} count={data?.enterCount} />
    </Container>
  )
}

export default StatsBar
