import React, { useCallback, useState, } from "react"

import { Form, Select, Checkbox, Input, Modal, Button } from "antd"
import { validateIdNumber, emailPattern } from "../utils"
import { useForm, FormContext, useFormContext, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ContentCard from "../components/ContentCard"
import facultyCodes from '../i18n/faculty-codes'
import '../styles/register.scss'
import { usePost } from "../api"
import { useHistory } from "react-router-dom"
import UserInfo from "../components/UserInfo"

const { Option } = Select

function InputRow(props) {
  const { control, errors } = useFormContext()
  const { t } = useTranslation()
  const { name, title, component, ...rest } = props

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
          as={component || Input}
          control={control}
          placeholder={title}
          defaultValue=''
          {...rest} />
      </Form.Item>
    </div>
  )
}

function Register() {
  const methods = useForm()
  const { getValues, handleSubmit } = methods
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const idValidator = useCallback(v => {
    return validateIdNumber(v) || 'invalidValue'
  }, [])

  const [executePost, , , loading] = usePost('/register')
  const onSubmit = useCallback(data => {
    console.log(data)
    setModalVisible(true)
  }, [])

  const history = useHistory()
  const confirmSubmit = useCallback(async data => {
    try {
      await executePost(getValues())
      history.push('/register/success')
    } catch (err) {
      alert('error: ' + JSON.stringify(err))
      setModalVisible(false)
    }
  }, [executePost, getValues, history])

  const confirmModal = <Modal
    className="register-confirm-modal"
    visible={modalVisible}
    centered
    closable={false}
    footer={null}
    onCancel={() => setModalVisible(false)} >
    <p className="confirmation-text">{t('register.dialog.title')}</p>
    <UserInfo user={getValues()} style={{ marginTop: 16, marginBottom: 34 }} />
    <div className="modal-footer">
      <Button shape="round" onClick={() => setModalVisible(false)}>{t('register.dialog.cancel')}</Button>
      <Button shape="round" onClick={confirmSubmit} type="primary" loading={loading}>{t('register.dialog.ok')}</Button>
    </div>
  </Modal>

  return (
    <FormContext {...methods}>
      <ContentCard id="register-form">
        <div className="form-container">
          <h1 className="title">{t('register.title')}</h1>
          <p className="subtitle">{t('register.subtitle')}</p>
          <Form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
            <InputRow name="name" title={t('fullname')} rules={{required: true}} />
            <InputRow 
              name="ID" 
              title={t('idNumber')} 
              pattern="\d*"
              rules={{
                required: true,
                validate: idValidator,
              }} />
            <InputRow 
              name="tel" 
              title={t('phoneNumber')} 
              type="tel" 
              rules={{
                required: true,
                pattern: {
                  value: /^[+]*[-\s./0-9]*$/,
                  message: 'invalidValue',
                },
              }} />
            <InputRow
              name="email"
              title={t('email')}
              type="email"
              rules={{
                required: true,
                pattern: {
                  value: emailPattern,
                  message: 'invalidValue',
                }
              }} />
            <InputRow
              name="faculty"
              title={t('faculty')}
              component={
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  {facultyCodes.map(code => <Option key={code} value={code}>
                    {`${code} ${t(`facultyNames.${code}`)}`}
                  </Option>)}
                </Select>
              }
              rules={{
                required: true
              }} />
            <div id="tos-checkbox-container">
              <Checkbox id="tos-checkbox" />
              <label htmlFor="tos-checkbox" id="tos-checkbox-label">
                ฉันยอมรับ
                <a> ข้อตกลงการให้บริการ </a>
                และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
                <a> นโยบายความเป็นส่วนตัว</a>
              </label>
            </div>
            <button type="submit">{t('register.submit')}</button>
            { confirmModal }
          </Form>
        </div>
      </ContentCard>
    </FormContext>
  )
}

export default Register
