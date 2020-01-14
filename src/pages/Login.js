import React from "react"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useTranslation } from "react-i18next"
import { useForm, FormContext } from "react-hook-form"
import styled from "styled-components"

//ant design
import { Form } from "antd"

//components
import ContentCard from "../components/ContentCard"
import Field from "../components/Field"
import OrangeButton from "../components/OrangeButton"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"

//utility
import { telPattern } from "../utils"

const validationSchema = yup.object().shape({
  ID: yup
      .string()
      .nationalId("invalidValue")
      .required(),
  tel: yup
      .string()
      .matches(telPattern, "invalidValue")
      .required(),
})

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
  const methods = useForm( { validationSchema })

  return (
    <FormContext {...methods}>
      <ContentCard>
        <Title>{t("login.title")}</Title>
        <Subtitle>{t("login.subtitle")}</Subtitle>
        <LoginForm layout="vertical">
          <Field name="ID" title={t("idNumber")} pattern="\d*" />
          <Field name="tel" title={t("phoneNumber")} type="tel"/>
          <SubmitButton type="submit">{t("login.submit")}</SubmitButton>
        </LoginForm>
      </ContentCard>
    </FormContext>
  )
}

export default Login
