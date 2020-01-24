import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useForm, FormContext } from "react-hook-form"
import { Form, Alert } from "antd"
import { useLocation, Redirect } from "react-router-dom"

import { usePostStatus } from "../api"
import { useAuthContext } from "../auth"
import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"
import PageHeader from "../components/PageHeader"
import BackButton from "../components/BackButton"
import ButtonBar from "../components/ButtonBar"

const SubmitButton = styled(OrangeButton)`
  margin: 34px auto 0 auto;
`

const LoginForm = styled(Form)`
  padding: 50px 0 0 0;
`

function Login({ title, subtitle, children }) {
  const { t } = useTranslation()
  const methods = useForm()
  const { getValues, handleSubmit } = methods
  const { isAuthenticated, login } = useAuthContext()
  const location = useLocation()
  const { loading, execute: postLogin } = usePostStatus('/token', false)
  const [hasError, setHasError] = useState(false)
  const clearError = useCallback(() => setHasError(false), [])

  const onSubmit = useCallback(() => {
    if (loading) {
      return
    }
    const values = getValues()
    postLogin({
      ...values,
      grant_type: 'password',
    })
      .then(data => {
        login(data.data.access_token)
      })
      .catch(() => {
        setHasError(true)
      })
  }, [loading, getValues, postLogin, login])

  if (isAuthenticated) {
    return <Redirect to={location.state?.from || "/user"} />
  }

  return (
    <FormContext {...methods}>
      <ContentCard>
        <PageHeader title={title} subtitle={subtitle} />
        <LoginForm layout="vertical" onSubmit={handleSubmit(onSubmit)}>
          { hasError && (
            <Alert
              type="error"
              message={t('login.wrongCredentials')}
              closable
              onClose={clearError} />
          )}
          { children(loading) }
          <ButtonBar style={{ direction: 'rtl' }}>
            <SubmitButton type="submit" disabled={loading}>{t("login.submit")}</SubmitButton>
            <BackButton />
          </ButtonBar>
        </LoginForm>
      </ContentCard>
    </FormContext>
  )
}

export default Login
