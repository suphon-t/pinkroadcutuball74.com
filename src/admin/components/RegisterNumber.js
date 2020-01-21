import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

import { down, up } from "styled-breakpoints"
import { between } from "polished"
import breakpoints from "../../styles/breakpoints"

const myColor = vars.white

const Card = styled.div`
  display: block;
  margin: 0 5px 0 5px;
  padding: 20px 36px 28px 36px;

  background: ${myColor};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-left: auto;

  ${up("md")} {
    width: 300px;
    margin-right: 30px;
  }

  ${up("xl")} {
    margin-right: 50px;
    padding: 37px 40px 40px 40px;
  }
`
const Title = styled.h1`
font-size: 28px;
font-weight: bold;
color: ${vars.darkBlue};
`
const Number = styled.p`
margin-top:15px;
font-size: 24px;
font-weight: normal;
color: ${vars.grey4};
`
const RegisterCount = 0

function RegisterNumber() {
  const { t } = useTranslation()
  return (
    <Card>
      <Title>{t('admin.register')}</Title>
      <Number>{`${RegisterCount} ${t('admin.person')}`}</Number>
    </Card>
  )
}
export default RegisterNumber