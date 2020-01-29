import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useGet } from "../api"
import Title from "../components/Title"
import UserInfo from "../components/UserInfo"
import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"
import { useTranslation } from "react-i18next"
import LogoutButtonBar from "../components/LogoutButtonBar"
import { landingRoute } from "../utils"

const DataTitle = styled(Title)`
  margin: 1rem 0 2.5rem;
`

const Notes = styled.label`
  display: inline-block;
  font-size: 0.85rem !important;
  line-height: 1rem;
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
        
        <Notes>
          {t("userdata.contact1")}
          <a href="mailto:slhh947@gmail.com"> slhh947@gmail.com </a>
          {t("userdata.contact3")}
        </Notes>

        <LogoutButtonBar>
          <Link to={landingRoute}>
            <OrangeButton>{t("userdata.back")}</OrangeButton>
          </Link>
        </LogoutButtonBar>
      </ContentCard>
    </>
  )
}

export default User
