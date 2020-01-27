import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Form, Input, Button, PageHeader } from "antd"
import { useHistory } from "react-router-dom"

import BaseLogin from "./BaseLogin"
import Field from "../components/Field"
import PrefixIcon from "../components/PrefixIcon"

const GlobalStyle = createGlobalStyle`
  #background {
    background: #f0f2f5 !important;

    & > div {
      display: none;
    }
  }
`

const Container = styled.div`
  display: flex;
  
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`

const StyledPageHeader = styled(PageHeader)`
  width: 300px;
  padding-left: 0;
  padding-right: 0;
`

function AdminLogin() {
  const history = useHistory()

  return (
    <>
      <GlobalStyle />
      <Container>
        <StyledPageHeader onBack={history.goBack} title="Admin Login" />
        <BaseLogin title="" errorMsg="Wrong username or password">
          { (loading, error) => (
            <Form style={{ width: 300 }}>
              { error && (
                <div style={{ marginBottom: 24 }}>
                  { error }
                </div>
              ) }
              <Field as={Form.Item} noLabel name="username" title="Username" disabled={loading}>
                <Input prefix={<PrefixIcon type="user" />} />
              </Field>
              <Field as={Form.Item} noLabel name="password" title="Password" type="password" disabled={loading}>
                <Input prefix={<PrefixIcon type="lock" />} />
              </Field>
              <Form.Item>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit" disabled={loading}>Login</Button>
              </Form.Item>
            </Form>
          ) }
        </BaseLogin>
      </Container>
    </>
  )
}

export default AdminLogin
