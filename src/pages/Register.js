import React, { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm, FormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import styled from "styled-components"
import { down } from "styled-breakpoints"

// ant design
import { Form, Select, Button } from "antd"

// utility
import { emailPattern, telPattern, optionContains } from "../utils"
import facultyCodes from "../i18n/faculty-codes"
import { usePost } from "../api"

// components
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import UserInfo from "../components/UserInfo"
import Field from "../components/Field"
import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"
import CustomModal from "../components/CustomModal"

// styles
import vars from "../styles/vars"

const { Option } = Select

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  ID: yup
    .string()
    .nationalId("invalidValue")
    .required(),
  tel: yup
    .string()
    .matches(telPattern, "invalidValue")
    .required(),
  email: yup
    .string()
    .matches(emailPattern, "invalidValue")
    .required(),
  faculty: yup.string().required()
})

const FacultyContainer = styled(Form.Item)`
  margin-bottom: -4px;
`

const TosLabel = styled.label`
  display: inline-block;
  margin-top: 23px;

  font-weight: normal;
  font-size: 12px !important;
  line-height: 14px;
`

const SubmitButton = styled(OrangeButton)`
  margin: 34px auto 0 auto;
`

const ConfirmationText = styled.p`
  margin: 0 30px;

  color: ${vars.pink};
  font-weight: 600;
  font-size: 20px;
  text-align: center;

  ${down("xs")} {
    margin: 0 8px;
  }
`

const ModalFooter = styled.div`
  margin: 24px 0 8px 0;
  text-align: center;

  button {
    width: 89px;
    margin: 0 10px;
  }
`

function Register() {
  const methods = useForm({ validationSchema })
  const { getValues, handleSubmit } = methods
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)

  const [executePost, , , loading] = usePost("/register")
  const onSubmit = useCallback(() => {
    setModalVisible(true)
  }, [])

  const history = useHistory()
  const confirmSubmit = useCallback(
    async data => {
      try {
        await executePost(getValues())
        history.push("/register/success")
      } catch (err) {
        alert("error: " + JSON.stringify(err))
        setModalVisible(false)
      }
    },
    [executePost, getValues, history]
  )

  const confirmModal = (
    <CustomModal className="register-modal" visible={modalVisible} centered closable={false} footer={null} onCancel={() => setModalVisible(false)}>
      <ConfirmationText>{t("register.dialog.title")}</ConfirmationText>
      <UserInfo user={getValues()} style={{ marginTop: 16, marginBottom: 34 }} />
      <ModalFooter>
        <Button shape="round" onClick={() => setModalVisible(false)}>
          {t("register.dialog.cancel")}
        </Button>
        <Button shape="round" onClick={confirmSubmit} type="primary" loading={loading}>
          {t("register.dialog.ok")}
        </Button>
      </ModalFooter>
    </CustomModal>
  )

  return (
    <FormContext {...methods}>
      <ContentCard id="register-form">
        <div className="form-container">
          <Title>{t("register.title")}</Title>
          <Subtitle style={{ marginBottom: 28 }}>{t("register.subtitle")}</Subtitle>
          <Form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
            <Field name="name" title={t("fullname")} rules={{ required: true }} />
            <Field name="ID" title={t("idNumber")} pattern="\d*" />
            <Field name="tel" title={t("phoneNumber")} type="tel" />
            <Field name="email" title={t("email")} type="email" />
            <Field name="faculty" title={t("faculty")} as={FacultyContainer}>
              <Select showSearch filterOption={optionContains}>
                {facultyCodes.map(code => (
                  <Option key={code} value={code}>
                    {(code !== "00" ? `${code} ` : "") + t(`facultyNames.${code}`)}
                  </Option>
                ))}
              </Select>
            </Field>

            <SubmitButton type="submit">{t("register.submit")}</SubmitButton>
            <TosLabel>
              ในการกดลงทะเบียน ฉันยอมรับ
              <TosModal title="ข้อตกลงการให้บริการ" />
              และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
              <TosModal title="นโยบายความเป็นส่วนตัว" />
            </TosLabel>
            {confirmModal}
          </Form>
        </div>
      </ContentCard>
    </FormContext>
  )
}

const TosTitle = styled(ConfirmationText)`
  margin: 0 8px;
`

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
      <a {...rest} onClick={handleClick}>
        {title}
      </a>
      <CustomModal className="register-modal" visible={visible} centered closable={false} footer={null} onCancel={close}>
        <TosTitle>{title}</TosTitle>
        {children}
        <ModalFooter>
          <Button shape="round" onClick={close} type="primary">
            {t("register.dialog.ok")}
          </Button>
        </ModalFooter>
      </CustomModal>
    </>
  )
}

export default Register
