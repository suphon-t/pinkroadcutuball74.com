import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { Skeleton } from "antd"

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

const RowSkeleton = styled(Skeleton).attrs({
  active: true,
  paragraph: false,
  title: { width: 200 },
})`
  display: block;

  .ant-skeleton-title {
    height: 16px;
    margin-top: 4px;
    margin-bottom: 13px;
  }
`

function Row({ name, value }) {
  return (
    <>
      <Name>{name}</Name>
      { value ? <Value>{value}</Value> : <RowSkeleton /> }
    </>
  )
}

function UserInfo({ user, ...rest }) {
  const { t } = useTranslation()
  const ID = useMemo(() => user?.ID?.replace(idNumberPattern, '$1 $2 $3 $4 $5'), [user])
  const tel = useMemo(() => user?.tel?.replace(telPattern, '$1 $2 $3'), [user])
  const facultyName = useMemo(() => {
    if (!user) return undefined
    return t(`facultyNames.${user?.faculty}`)
  }, [user, t])
  return (
    <div {...rest}>
      <Row name={t('fullname')} value={user?.name} />
      <Row name={t('idNumber')} value={ID} />
      <Row name={t('phoneNumber')} value={tel} />
      <Row name={t('email')} value={user?.email} />
      <Row name={t('faculty')} value={facultyName} />
    </div>
  )
}

export default UserInfo
