import React from "react"

import Title from "../components/Title"
import UserInfo from "../components/UserInfo"
import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"
import { useTranslation } from "react-i18next"
import { useGet } from "../api"

import styled from "styled-components"
import vars from "../styles/vars"
import { Link } from "react-router-dom"

const DataTitle = styled(Title)`
  margin: 1rem 0 2.5rem;
`
const TosLabel = styled.label`
  display: inline-block;
  font-size: 0.85rem !important;
  line-height: 1rem;
`
const PinkLabel = styled(TosLabel)`
  color: ${vars.pink};
`
const BackToHome = styled(OrangeButton)`
  margin: 2.5rem auto 0;
`
const Info = styled(UserInfo)`
  margin-top: 32px;
  padding-bottom: 19px;
`
function User() {
  const { data } = useGet("/getuser")
  const { t } = useTranslation()
  return (
    <ContentCard>
      <DataTitle>{t("userdata.title")}</DataTitle>

      <Info user={data && data.data} />
      
      <TosLabel>{t("userdata.contact1")}</TosLabel>
      <PinkLabel>{t("userdata.contact2")}</PinkLabel>
      <TosLabel>{t("userdata.contact3")}</TosLabel>

      <Link to="/">
        <BackToHome>{t("userdata.back")}</BackToHome>
      </Link>
    </ContentCard>
  )
}

export default User
