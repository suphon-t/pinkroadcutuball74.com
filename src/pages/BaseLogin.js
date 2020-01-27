import React, { useCallback, useState } from "react"
import { useForm, FormContext } from "react-hook-form"
import { Alert } from "antd"
import { useLocation, Redirect } from "react-router-dom"

import { usePostStatus } from "../api"
import { useAuthContext } from "../auth"
import PageHeader from "../components/PageHeader"

function BaseLogin({ title, subtitle, target = '/user', validationSchema, errorMsg, children }) {
  const methods = useForm({ validationSchema })
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
    return <Redirect to={location.state?.from || target} />
  }

  const error = hasError && (
    <Alert
      type="error"
      message={errorMsg}
      closable
      onClose={clearError} />
  )

  return (
    <FormContext {...methods}>
      <PageHeader title={title} subtitle={subtitle} />
      { React.cloneElement(children(loading, error), { onSubmit: handleSubmit(onSubmit) }) }
    </FormContext>
  )
}

export default BaseLogin
