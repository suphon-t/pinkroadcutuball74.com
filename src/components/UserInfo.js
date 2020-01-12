import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { idNumberPattern, telPattern } from "../utils"
import '../styles/user-info.scss'

function UserInfo({ user, ...rest }) {
  const { t } = useTranslation()
  const ID = useMemo(() => user.ID?.replace(idNumberPattern, '$1 $2 $3 $4 $5'), [user.ID])
  const tel = useMemo(() => user.tel?.replace(telPattern, '$1 $2 $3'), [user.tel])
  return (
    <div className="user-info" {...rest}>
      <label>{t('fullname')}</label>
      <p>{user.name}</p>
      <label>{t('idNumber')}</label>
      <p>{ID}</p>
      <label>{t('phoneNumber')}</label>
      <p>{tel}</p>
      <label>{t('email')}</label>
      <p>{user.email}</p>
      <label>{t('faculty')}</label>
      <p>{t(`facultyNames.${user.faculty}`)}</p>
    </div>
  )
}

export default UserInfo
