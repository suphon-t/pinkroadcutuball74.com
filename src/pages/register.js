import React, { useReducer, useCallback, useMemo } from "react"

import { Form, Select, Checkbox } from "antd"
import { validateIdNumber, idNumberPattern } from "../utils"

import '../styles/register.scss'

const { Option } = Select

const initialState = {
  idNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'FORM_CHANGE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    default:
      return state
  }
}

function Register() {
  const [formData, dispatch] = useReducer(reducer, initialState)
  const { idNumber } = formData
  const idStatus = useMemo(() => {
    if (idNumber.length < 13) {
      return ''
    }
    return validateIdNumber(idNumber) ? 'success' : 'error'
  }, [idNumber])
  const onChangeHandler = useCallback(e => {
    if (e.target.validity.valid) {
      dispatch({
        type: 'FORM_CHANGE',
        payload: {
          key: e.target.name,
          value: e.target.value
        }
      })
    }
  })
  return (
    <>
      <div className="logo-small" />
      <div className="content-card">
        <div className="form-container">
          <h1 className="title">ลงทะเบียนล่วงหน้า</h1>
          <p className="subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <Form layout="vertical">
            <label>ชื่อ-นามสกุล</label>
            <input placeholder="ชื่อ-นามสกุล" />
            <label>เลขประจำตัวประชาชน</label>
            <input placeholder="เลขประจำตัวประชาชน" />
            <label>เบอร์โทรศัพท์</label>
            <input placeholder="เบอร์โทรศัพท์" />
            <label>อีเมล</label>
            <input placeholder="อีเมล" />
            <label>คณะ</label>
            <Select
              size="small"
              showSearch 
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              <Option value="21">วิศวกรรมศาสตร์</Option>
              <Option value="-1">บุคคลภายนอกหรือนิสิตเก่า</Option>
            </Select>
            <div id="tos-checkbox-container">
              <Checkbox id="tos-checkbox" />
              <label for="tos-checkbox" id="tos-checkbox-label">
                ฉันยอมรับ
                <a> ข้อตกลงการให้บริการ </a>
                และอนุญาตให้เว็บไซต์เก็บใช้และบันทึกข้อมูลของฉันตาม
                <a> นโยบายความเป็นส่วนตัว</a>
              </label>
            </div>
            <button>ลงทะเบียน</button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Register
