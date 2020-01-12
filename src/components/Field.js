import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Form, Input } from "antd"

function Field(props) {
  const { control, errors } = useFormContext()
  const { t } = useTranslation()
  const { name, title, children, ...rest } = props

  const id = `input-${name}`
  const error = errors[name]
  const status = error && 'error'
  const help = error && t(error.type === 'required' ? 'required' : error.message, { name: title })
  return (
    <div id={`input-container-${name}`} className="input-row">
      <label htmlFor={id}>{title}</label>
      <Form.Item hasFeedback validateStatus={status} help={help}>
        <Controller
          id={id}
          name={name}
          as={children || Input}
          control={control}
          placeholder={title}
          defaultValue=''
          {...rest} />
      </Form.Item>
    </div>
  )
}

export default Field
