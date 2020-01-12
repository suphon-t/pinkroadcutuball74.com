import React, { useReducer, useCallback, useContext, useRef, useState, useEffect, useMemo } from "react"

import { Form, Select, Checkbox, Input, Modal, Button } from "antd"
import { validateIdNumber, idNumberPattern } from "../utils"

import '../styles/register.scss'

const { Option } = Select
const FormContext = React.createContext()

const initialValue = {
  value: '',
  valid: true,
  touched: false,
}

const initialState = {
  idNumber: initialValue,
  name: initialValue,
  email: initialValue,
  phone: initialValue,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      const { key, value } = action.payload
      const newValue = {
        ...state[key],
        ...value,
      }
      if (Object.is(state[key], newValue)) {
        return state
      } else {
        return {
          ...state,
          [key]: newValue
        }
      }
    default:
      return state
  }
}

function InputRow(props) {
  const { formData, dispatch } = useContext(FormContext)
  const [focused, setFocused] = useState(false)
  const { name, title, validator, pattern } = props
  const { value, valid, touched } = formData[name]
  const validate = useCallback(target => {
    const { value, validity } = target
    if (validator) {
      target.setCustomValidity(validator(value))
    }
    return !validity || validity.valid
  }, [validator])
  const patternRegExp = useMemo(() => {
    return pattern ? new RegExp(pattern) : null
  }, [pattern])

  const dispatchChange = useCallback(value => {
    dispatch({
      type: 'FIELD_CHANGE',
      payload: { key: name, value }
    })
  }, [dispatch, name])
  const handleChange = useCallback(e => {
    const { value } = e.target
    if (!patternRegExp || patternRegExp.test(value)) {
      dispatchChange({
        value, valid: validate(e.target)
      })
    }
  }, [dispatchChange, patternRegExp, validate])
  const handleFocus = useCallback(e => {
    setFocused(true)
  }, [])
  const handleBlur = useCallback(e => {
    dispatchChange({
      touched: true
    })
    setFocused(false)
  }, [dispatchChange])

  // Perform validation on mount
  const inputEl = useRef(null)
  useEffect(() => {
    dispatchChange({
      valid: validate(inputEl.current.input)
    })
  }, [dispatchChange, validate])

  const id = `register-input-${name}`
  const status = !touched || focused || valid ? '' : 'error'
  const rowProps = { ...props }
  delete rowProps.validator
  delete rowProps.focusedValidator
  delete rowProps.forceValid
  return (
    <div className="input-row">
      <label htmlFor={id}>{title}</label>
      <Form.Item hasFeedback validateStatus={status}>
        <Input
          ref={inputEl}
          id={id}
          placeholder={title}
          {...rowProps}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur} />
      </Form.Item>
    </div>
  )
}

function Register() {
  const [formData, dispatch] = useReducer(reducer, initialState)
  const [modalVisible, setModalVisible] = useState(false)
  const idValidator = useCallback(idNumber => {
    return validateIdNumber(idNumber) ? '' : 'เลขประจำตัวประชาชนไม่ถูกต้อง'
  }, [])

  const confirmModal = <Modal
    visible={modalVisible}
    centered
    closable={false}
    footer={null}
    onCancel={() => setModalVisible(false)} >
    <p className="confirmation-text">กรุณาตรวจสอบข้อมูลให้แน่ใจก่อนยืนยัน</p>
    <div className="modal-footer">
      <Button shape="round" onClick={() => setModalVisible(false)}>แก้ไข</Button>
      <Button shape="round" type="primary">ยืนยัน</Button>
    </div>
  </Modal>

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    setModalVisible(true)
  }, [])

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      <div className="logo-small" />
      <div className="content-card">
        <div className="form-container">
          <h1 className="title">ลงทะเบียนล่วงหน้า</h1>
          <p className="subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <InputRow name="name" title="ชื่อ-นามสกุล" required />
            <InputRow 
              name="idNumber" 
              title="เลขประจำตัวประชาชน" 
              pattern={idNumberPattern}
              validator={idValidator}
              required />
            <InputRow name="phone" title="เบอร์โทรศัพท์" type="tel" required />
            <InputRow name="email" title="อีเมล" type="email" required />
            <div className="input-row">
              <label>คณะ</label>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                <Option value="21">วิศวกรรมศาสตร์</Option>
                <Option value="-1">บุคคลภายนอกหรือนิสิตเก่า</Option>
              </Select>
            </div>
            <div id="tos-checkbox-container">
              <Checkbox id="tos-checkbox" />
              <label htmlFor="tos-checkbox" id="tos-checkbox-label">
                ฉันยอมรับ
                <a> ข้อตกลงการให้บริการ </a>
                และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
                <a> นโยบายความเป็นส่วนตัว</a>
              </label>
            </div>
            <button type="submit">ลงทะเบียน</button>
            { confirmModal }
          </Form>
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default Register
