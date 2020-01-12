import React, { useCallback, useState, } from "react"
import * as yup from "yup"

import { Form, Select, Checkbox, Modal, Button } from "antd"
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
            <div id="tos-checkbox-container">
              <Checkbox id="tos-checkbox" />
              <label htmlFor="tos-checkbox" id="tos-checkbox-label">
                ฉันยอมรับ
                <a href="#tos"> ข้อตกลงการให้บริการ </a>
                และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
                <a href="#privacy-policy"> นโยบายความเป็นส่วนตัว</a>
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
