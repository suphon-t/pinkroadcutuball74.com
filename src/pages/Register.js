import React, { useCallback, useState, useEffect, useRef } from "react"
import { useHistory, Link } from "react-router-dom"
import { useForm, FormContext } from "react-hook-form"
import { useTranslation, Trans } from "react-i18next"
import styled from "styled-components"
import { down, up } from "styled-breakpoints"
import ReCAPTCHA from "react-google-recaptcha";

// ant design
import { Form, Button } from "antd"

// utility
import { usePromise, useHttpContext } from "../api"

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
import { userSchema } from "../utils/validation"
import { useFacultyOptions, isEventDay } from "../utils"
import config from "../config"

const FacultyContainer = styled(Form.Item)`
  margin-bottom: -4px;
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
  const [recaptchaToken, setRecaptchaToken] = useState(undefined)

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

  const { login } = useAuthContext()
  const { http } = useHttpContext()
  const { loading, callAsync } = usePromise()
  const onSubmit = useCallback(() => {
    setModalVisible(true)
  }, [])

  const history = useHistory()
  const confirmSubmit = useCallback(() => {
    callAsync(async () => {
      try {
        const values = {...getValues(), "g-recaptcha-response": recaptchaToken}
        await http.post('/register', values)
        const loginData = await http.post('/token', {
          username: values.ID,
          password: values.tel,
          grant_type: 'password',
        })
        login(loginData.data.access_token)
        history.replace('/register/success')
      } catch (err) {
        const data = err?.response?.data
        if (data?.error === "DUPID") {
          setIsDuplicate(true)
        } else if (data) {
          setErrorDescription(data.error_description)
        } else {
          setErrorDescription(JSON.stringify(err))
        }
        setModalVisible(false)
      }
    })
  }, [callAsync, getValues, history, http, login, recaptchaToken])

  const recaptchaRef = useRef()

  const validateSubmit = useCallback(() => {
    if (recaptchaToken) {
      confirmSubmit()
    } else {
      recaptchaRef.current.execute()
    }
  }, [recaptchaToken, confirmSubmit])

  const onRecaptchaChange = useCallback(token => {
    setRecaptchaToken(token)
    confirmSubmit()
  }, [confirmSubmit])

  const onRecaptchaExpired = useCallback(() => {
    setRecaptchaToken(undefined)
  }, [])

  const confirmModal = (
    <CustomModal visible={modalVisible} onCancel={() => setModalVisible(false)}>
      <ConfirmationText>{t("register.dialog.title")}</ConfirmationText>
      <UserInfo user={getValues()} style={{ marginTop: 16, marginBottom: 34 }} />
      <ModalFooter>
        <Button shape="round" onClick={() => setModalVisible(false)}>
          {t("register.dialog.cancel")}
        </Button>
        <Button shape="round" onClick={validateSubmit} type="primary" loading={loading}>
          {t("register.dialog.ok")}
        </Button>
      </ModalFooter>
    </CustomModal>
  )

  return (
    <FormContext {...methods}>
      <ContentCard id="register-form">
        <div className="form-container">
          <PageHeader title={t(isEventDay ? 'register.edtitle' : 'register.title')} subtitle={t('register.subtitle')} />
          <Form style={{ marginTop: 28 }} layout="vertical" onSubmit={handleSubmit(onSubmit)}>
            <Field name="name" title={t("fullname")} autoComplete="name" autoFocus />
            <Field name="ID" title={t("idNumber")} pattern="\d*" />
            <Field name="tel" title={t("phoneNumber")} autoComplete="tel" type="tel" />
            <Field name="email" title={t("email")} autoComplete="email" type="email" />
            <Field name="faculty" title={t("faculty")} as={FacultyContainer}>
              <DialogSelect options={facultyOptions} />
            </Field>

            <ButtonBar style={{ direction: 'rtl' }}>
              <SubmitButton type="submit">{t("register.submit")}</SubmitButton>
              <BackButton />
            </ButtonBar>

            {confirmModal}
            <DuplicateIdModal visible={isDuplicate} onCancel={closeDuplicate} />
            <ErrorModal description={errorDescription} onCancel={closeError} />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={config.recaptchaSiteKey}
              onChange={onRecaptchaChange}
              onExpired={onRecaptchaExpired}
            />
          </Form>
        </div>
      </ContentCard>
    </FormContext>
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
