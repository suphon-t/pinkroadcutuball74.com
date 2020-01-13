import React from "react"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useTranslation } from "react-i18next"
import { useForm, FormContext } from "react-hook-form"

//styles
import "../styles/login.scss"

//ant design
import { Form,Button  } from "antd"

//components
import ContentCard from "../components/ContentCard"
import Field from "../components/Field"

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

function Login(){
    const { t } = useTranslation()
    const methods = useForm( { validationSchema })
    const { getValues, handleSubmit } = methods

    return (
        <FormContext {...methods}>
            <ContentCard id="login-form">
                <div id="title-container">
                    <p className="title" > { t("login.title") }</p>
                    <p className="subtitle">{ t("login.subtitle") }</p>
                </div>
                <Form layout="vertical"  >
                    <Field name="ID" title = { t("idNumber") } pattern="\d*" />
                    <Field name="tel" title = { t("phoneNumber") } type="tel"/>
                    <p id="check-button">
                        <Button type="submit" > { t("login.submit") } </Button>
                    </p>
                </Form>
            </ContentCard>
        </FormContext>
    )

}

export default Login