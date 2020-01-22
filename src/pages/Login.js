import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm, FormContext } from "react-hook-form"
import styled from "styled-components"

//ant design
import { Form, Alert } from "antd"

//components
import ContentCard from "../components/ContentCard"
import Field from "../components/Field"
import OrangeButton from "../components/OrangeButton"
import { useAuthContext } from "../auth"

//utility
import { usePostStatus } from "../api"
import { useLocation, Redirect } from "react-router-dom"
import PageHeader from "../components/PageHeader"

const SubmitButton = styled(OrangeButton)`
  margin: 117px auto;
  padding: 18px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 0px;
`

const LoginForm = styled(Form)`
  padding: 50px 0 0 0;
`

function Login(){
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
      username: values.ID,
      password: values.tel,
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
        <PageHeader title={t('login.title')} subtitle={t('login.subtitle')} />
        <LoginForm layout="vertical" onSubmit={handleSubmit(onSubmit)}>
          { hasError && (
            <Alert
              type="error"
              message={t('login.wrongCredentials')}
              closable
              onClose={clearError} />
          )}
          <Field name="ID" title={t("idNumber")} pattern="\d*" disabled={loading} />
          <Field name="tel" title={t("phoneNumber")} type="tel" disabled={loading} />
          <SubmitButton type="submit" disabled={loading}>{t("login.submit")}</SubmitButton>
        </LoginForm>
      </ContentCard>
    </FormContext>
  )
}

export default Login
