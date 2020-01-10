import React, { useReducer, useCallback, useMemo } from "react"

import { PageHeader, Row, Col, Form, Input, Select, Checkbox, Button } from "antd"
import { validateIdNumber, idNumberPattern } from "../utils"

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
    <div>
      <PageHeader
        title="Register" />
      <Form style={{padding: 24}} layout="vertical">
        <Form.Item label="ID Number" hasFeedback validateStatus={idStatus} required>
          <Input name="idNumber" pattern={idNumberPattern} value={idNumber} onChange={onChangeHandler} />
        </Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="First Name" required>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Phone Number" required>
          <Input />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input />
        </Form.Item>
        <Form.Item label="Department" required>
          <Select 
            showSearch 
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value="21">Engineering</Option>
            <Option value="-1">Not a student</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Register</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
