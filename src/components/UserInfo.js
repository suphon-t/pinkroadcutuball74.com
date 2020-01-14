import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { idNumberPattern, telPattern } from "../utils"
import vars from "../styles/vars"

const Name = styled.label`
  color: ${vars.grey5};
  font-size: 11px;
  line-height: 17px;
`

const Value = styled.p`
  margin-bottom: 13px;

  color: ${vars.darkBlue};
  font-size: 17px;
  line-height: 20px;
`

function UserInfo({ user, ...rest }) {
  const { t } = useTranslation()
  const ID = useMemo(() => user.ID?.replace(idNumberPattern, '$1 $2 $3 $4 $5'), [user.ID])
  const tel = useMemo(() => user.tel?.replace(telPattern, '$1 $2 $3'), [user.tel])
  return (
    <div {...rest}>
      <Name>{t('fullname')}</Name>
      <Value>{user.name}</Value>
      <Name>{t('idNumber')}</Name>
      <Value>{ID}</Value>
      <Name>{t('phoneNumber')}</Name>
      <Value>{tel}</Value>
      <Name>{t('email')}</Name>
      <Value>{user.email}</Value>
      <Name>{t('faculty')}</Name>
      <Value>{t(`facultyNames.${user.faculty}`)}</Value>
    </div>
  )
}

export default UserInfo
