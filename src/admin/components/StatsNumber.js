import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

import { up } from "styled-breakpoints"

const Card = styled.div`
  display: block;
  margin: 0 40px;
  padding: 20px 36px 28px 36px;
  
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;

  ${up("md")} {
    width: 300px;
  }

  ${up("xl")} {
    padding: 37px 40px 40px 40px;
  }
`
const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${vars.white};
`
const Number = styled.p`
  margin-top:15px;
  font-size: 24px;
  font-weight: normal;
  color: ${vars.white};
`

function EnterNumber({ className, title, count }) {
  const { t } = useTranslation()
  return (
    <Card className={className}>
      <Title>{title}</Title>
      <Number>{`${count} ${t('admin.person')}`}</Number>
    </Card>
  )
}

export default EnterNumber