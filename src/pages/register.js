import React, { useReducer, useCallback, useContext, useState } from "react"

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
  const { name, title, forceValid, validator, focusedValidator } = props
  const rowValue = formData[name]
  const { value, valid, touched } = rowValue
  const validate = useCallback((e, focused, touched) => {
    const customValidator = focused ? (focusedValidator || validator) : validator
    const v = e.target.value
    const { validity } = e.target
    return (focused || !validity || validity.valid) && 
      (!validator || customValidator(v, focused)) && 
      (focused || !touched || v)
  }, [validator, focusedValidator])

  const dispatchChange = useCallback(value => {
    dispatch({
      type: 'FIELD_CHANGE',
      payload: { key: name, value }
    })
  }, [dispatch, name])
  const handleChange = useCallback(e => {
    const { validity } = e.target
    if (!forceValid || validity.valid) {
      dispatchChange({
        value: e.target.value, 
        valid: validate(e, focused, touched)
      })
    }
  }, [dispatchChange, forceValid, validate, focused, touched])
  const handleFocus = useCallback(e => {
    dispatchChange({
      valid: validate(e, true, touched)
    })
    setFocused(true)
  }, [dispatchChange, touched, validate])
  const handleBlur = useCallback(e => {
    dispatchChange({
      valid: validate(e, false, true),
      touched: true,
    })
    setFocused(false)
  }, [dispatchChange, validate])

  const id = `register-input-${name}`
  const status = valid ? '' : 'error'
  const rowProps = { ...props }
  delete rowProps.validator
  delete rowProps.focusedValidator
  delete rowProps.forceValid
  return (
    <div className="input-row">
      <label htmlFor={id}>{title}</label>
      <Form.Item hasFeedback validateStatus={status}>
        <Input
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
    return validateIdNumber(idNumber)
  }, [])
  const idFocusedValidator = useCallback(idNumber => {
    if (idNumber.length < 13) {
      return true
    }
    return validateIdNumber(idNumber)
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

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      <div className="logo-small" />
      <div className="content-card">
        <div className="form-container">
          <h1 className="title">ลงทะเบียนล่วงหน้า</h1>
          <p className="subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <Form layout="vertical">
            <InputRow name="name" title="ชื่อ-นามสกุล" />
            <InputRow 
              name="idNumber" 
              title="เลขประจำตัวประชาชน" 
              pattern={idNumberPattern} 
              validator={idValidator}
              focusedValidator={idFocusedValidator}
              forceValid />
            <InputRow name="phone" title="เบอร์โทรศัพท์" type="tel" />
            <InputRow name="email" title="อีเมล" type="email" />
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
            <button onClick={() => setModalVisible(true)}>ลงทะเบียน</button>
            { confirmModal }
          </Form>
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default Register
