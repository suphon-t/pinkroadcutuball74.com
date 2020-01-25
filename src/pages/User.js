import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useGet } from "../api"
import vars from "../styles/vars"
import Title from "../components/Title"
import UserInfo from "../components/UserInfo"
import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"
import { useTranslation } from "react-i18next"
import LogoutButtonBar from "../components/LogoutButtonBar"

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

const Info = styled(UserInfo)`
  margin-top: 32px;
  padding-bottom: 19px;
`

function User() {
  const { data } = useGet("/getuser")
  const { t } = useTranslation()
  return (
    <>
      <ContentCard>
        <DataTitle>{t("userdata.title")}</DataTitle>

        <Info user={data && data.data} />
        
        <TosLabel>{t("userdata.contact1")}</TosLabel>
        <PinkLabel>{t("userdata.contact2")}</PinkLabel>
        <TosLabel>{t("userdata.contact3")}</TosLabel>

        <LogoutButtonBar>
          <Link to="/">
            <OrangeButton>{t("userdata.back")}</OrangeButton>
          </Link>
        </LogoutButtonBar>
      </ContentCard>
    </>
  )
}

export default User
