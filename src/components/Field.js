import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Form } from "antd"

import CustomInput from "./CustomInput"

import styled from "styled-components"
import vars from "../styles/vars"

const FormItem = styled(Form.Item)`
  margin-top: -4px;
  margin-bottom: -4px;
`

const FieldLabel = styled.label`
  display: block;
  margin-top: 15px;

  font-weight: 600;
  font-size: 17px !important;
  line-height: 26px;

  color: ${vars.darkBlue};
`

const FieldInput = styled(CustomInput)`
  background-color: transparent;
`

function Field({ name, title, as, noLabel, children, ...rest }) {
  const { control, errors } = useFormContext()
  const { t } = useTranslation()

  const Container = as || FormItem

  const id = `input-${name}`
  const error = errors[name]
  const status = error && 'error'
  const help = error && t(error.type === 'required' ? 'required' : error.message, { name: title })

  return (
    <div>
      { !noLabel && <FieldLabel htmlFor={id}>{title}</FieldLabel> }
      <Container hasFeedback validateStatus={status} help={help}>
        <Controller
          id={id}
          name={name}
          as={children || FieldInput}
          control={control}
          placeholder={title}
          defaultValue=''
          {...rest} />
      </Container>
    </div>
  )
}

export default Field
