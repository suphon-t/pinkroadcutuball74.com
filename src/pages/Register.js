import React, { useCallback, useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { useForm, FormContext } from "react-hook-form"
import { useTranslation, Trans } from "react-i18next"
import styled from "styled-components"
import { down, up } from "styled-breakpoints"

// ant design
import { Form, Button } from "antd"

// utility
import { usePostStatus } from "../api"

// components
import UserInfo from "../components/UserInfo"
import Field from "../components/Field"
import ContentCard from "../components/ContentCard"
import BackButton from "../components/BackButton"
import ButtonBar from "../components/ButtonBar"
import OrangeButton from "../components/OrangeButton"
import CustomModal from "../components/CustomModal"

// styles
import vars from "../styles/vars"
import PageHeader from "../components/PageHeader"
import DialogSelect from "../components/DialogSelect"
import { useAuthContext } from "../auth"
import { userSchema, useFacultyOptions } from "../utils"

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

  ${up('xl')} {
    font-size: 30px;
  }
`

const ModalFooter = styled.div`
  margin: 24px 0 8px 0;
  text-align: center;

  button {
    min-width: 89px;
    margin: 0 10px;
  }
`

function Register() {
  const { isAuthenticated } = useAuthContext()
  const methods = useForm({ validationSchema: userSchema })
  const { getValues, handleSubmit } = methods
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [errorDescription, setErrorDescription] = useState(undefined)

  const closeDuplicate = useCallback(() => {
    setIsDuplicate(false)
  }, [])

  const closeError = useCallback(() => {
    setErrorDescription(undefined)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setIsDuplicate(true)
    }
  }, [isAuthenticated])

  const facultyOptions = useFacultyOptions()

  const { loading, execute: executePost } = usePostStatus("/register")
  const onSubmit = useCallback(() => {
    setModalVisible(true)
  }, [])

  const history = useHistory()
  const confirmSubmit = useCallback(
    async () => {
      try {
        await executePost(getValues())
        history.replace("/register/success")
      } catch (err) {
        const data = err.response.data
        if (data.error === "DUPID") {
          setIsDuplicate(true)
        } else {
          setErrorDescription(data.error_description)
        }
        setModalVisible(false)
      }
    },
    [executePost, getValues, history]
  )

  const confirmModal = (
    <CustomModal visible={modalVisible} onCancel={() => setModalVisible(false)}>
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
          <PageHeader title={t('register.title')} subtitle={t('register.subtitle')} />
          <Form style={{ marginTop: 28 }} layout="vertical" onSubmit={handleSubmit(onSubmit)}>
            <Field name="name" title={t("fullname")} autoComplete="name" rules={{ required: true }} />
            <Field name="ID" title={t("idNumber")} pattern="\d*" />
            <Field name="tel" title={t("phoneNumber")} autoComplete="tel" type="tel" />
            <Field name="email" title={t("email")} autoComplete="email" type="email" />
            <Field name="faculty" title={t("faculty")} as={FacultyContainer}>
              <DialogSelect options={facultyOptions} />
            </Field>

            <TosLabel>
              ในการกดลงทะเบียน ฉันยอมรับ
              <TosModal title="ข้อตกลงการให้บริการ" />
              และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
              <TosModal title="นโยบายความเป็นส่วนตัว" />
            </TosLabel>

            <ButtonBar>
              <BackButton />
              <SubmitButton type="submit">{t("register.submit")}</SubmitButton>
            </ButtonBar>

            {confirmModal}
            <DuplicateIdModal visible={isDuplicate} onCancel={closeDuplicate} />
            <ErrorModal description={errorDescription} onCancel={closeError} />
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
      <CustomModal visible={visible} onCancel={close}>
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

function DuplicateIdModal(props) {
  const { t } = useTranslation()
  return (
    <CustomModal {...props}>
      <ConfirmationText>{t("register.duplicate.title")}</ConfirmationText>
      <p style={{ marginTop: 8 }}>
        <Trans i18nKey="register.duplicate.desc">
          1 <Link to="/user">2</Link>
        </Trans>
      </p>
      <ModalFooter>
        <Link to="/">
          <Button shape="round">{t("register.backtohome")}</Button>
        </Link>
        <Button shape="round" type="primary" onClick={props.onCancel}>{t("register.duplicate.again")}</Button>
      </ModalFooter>
    </CustomModal>
  )
}

function ErrorModal({ description, ...props }) {
  const { t } = useTranslation()
  return (
    <CustomModal visible={!!description} {...props}>
      <ConfirmationText>{t("error")}</ConfirmationText>
      <p style={{ marginTop: 8, textAlign: 'center' }}>
        {description}
      </p>
      <ModalFooter>
        <Button shape="round" type="primary" onClick={props.onCancel}>{t("ok")}</Button>
      </ModalFooter>
    </CustomModal>
  )
}

export default Register
