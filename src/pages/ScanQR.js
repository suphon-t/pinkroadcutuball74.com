import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import ContentCard from "../components/ContentCard"
import OrangeButton from "../components/OrangeButton"

import success from "../images/success.svg"
import styled from "styled-components"
import vars from "../styles/vars"

const Title = styled.h1`
  margin-top: 36px;

  color: ${vars.darkBlue};
  font-weight: bold;
  font-size: 30px;
  line-height: 45px;
`
const Title2 = styled.h2`
    margin-top: 8px;

    color: ${vars.darkBlue};
    font-weight: bold;
    font-size: 24px;
    line-height: 45px;
`

const Subtitle = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  color: ${vars.grey4};
`

function ScanQR(){
    const { t } = useTranslation()
    return(
        <ContentCard id="scanqr" style={{ textAlign: 'center' }}>
            <Title>{t('scanqr.title')}</Title>
            <Title2>{t('scanqr.title2')}</Title2>
            <Subtitle>{t('scanqr.subtitle')}</Subtitle>
        </ContentCard>
    )
}




export default ScanQR