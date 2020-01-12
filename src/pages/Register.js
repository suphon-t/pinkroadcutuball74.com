import React, { useCallback, useState, } from "react"
import * as yup from "yup"

import { Form, Select, Modal, Button } from "antd"
import { emailPattern, telPattern, optionContains } from "../utils"
import { useForm, FormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ContentCard from "../components/ContentCard"
import facultyCodes from '../i18n/faculty-codes'
import '../styles/register.scss'
import { usePost } from "../api"
import { useHistory } from "react-router-dom"
import UserInfo from "../components/UserInfo"
import Field from "../components/Field"

const { Option } = Select

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  ID: yup.string().nationalId('invalidValue').required(),
  tel: yup.string()
    .matches(telPattern, 'invalidValue')
    .required(),
  email: yup.string()
    .matches(emailPattern, 'invalidValue')
    .required(),
  faculty: yup.string().required(),
})

function Register() {
  const methods = useForm({ validationSchema })
  const { getValues, handleSubmit } = methods
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)

  const [executePost, , , loading] = usePost('/register')
  const onSubmit = useCallback(() => {
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
    className="register-modal"
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
            <Field name="name" title={t('fullname')} rules={{required: true}} />
            <Field name="ID" title={t('idNumber')} pattern="\d*" />
            <Field name="tel" title={t('phoneNumber')} type="tel" />
            <Field name="email" title={t('email')} type="email" />
            <Field name="faculty" title={t('faculty')}>
              <Select showSearch filterOption={optionContains}>
                {facultyCodes.map(code => <Option key={code} value={code}>
                  {(code !== '99' ? `${code} ` : '') + t(`facultyNames.${code}`)}
                </Option>)}
              </Select>
            </Field>
            <label id="tos-label">
              ในการกดลงทะเบียน ฉันยอมรับ
              <TosModal title="ข้อตกลงการให้บริการ" />
              และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
              <TosModal title="นโยบายความเป็นส่วนตัว" />
            </label>
            <button type="submit">{t('register.submit')}</button>
            { confirmModal }
          </Form>
        </div>
      </ContentCard>
    </FormContext>
  )
}

function TosModal({ title, children, ...rest }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const handleClick = useCallback(e => {
    e.preventDefault()
    setVisible(true)
  }, [])
  const close = useCallback(() => setVisible(false), [])
  return (
    <>
      <a {...rest} onClick={handleClick}>{title}</a>
      <Modal
        className="register-modal"
        visible={visible}
        centered
        closable={false}
        footer={null}
        onCancel={close} >
        <p className="tos-title">{title}</p>
        { children }
        <div className="modal-footer">
          <Button shape="round" onClick={close} type="primary">{t('register.dialog.ok')}</Button>
        </div>
      </Modal>
    </>
  )
}

export default Register
