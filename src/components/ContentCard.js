import React, { useCallback } from "react"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import logo from "../images/logo.png"
import { down, up } from "styled-breakpoints"
import vars from "../styles/vars"
import { between } from "polished"
import breakpoints from "../styles/breakpoints"
import OrangeButton from "./OrangeButton"

import back from "../images/arrow-back.svg"

const Header = styled.div`
  display: flex;
`

const BackButton = styled(OrangeButton)`
  width: 30px;
  height: 30px;
  margin: 16px;
  padding: 0;

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin: auto;
    background: ${vars.darkBlue};
    mask-image: url(${back});
    mask-position: center;
    mask-size: cover;
  }
`

const Logo = styled(Link)`
  margin-left: auto;

  img {
    width: 42.26px;
    height: 33.5px;
    margin: 16px 10px 10px 10px;
  }
`

const sideMargin = between('30px', '88px', breakpoints.sm, breakpoints.md)

const Card = styled.div`
  display: block;
  margin: 0 ${sideMargin} 30px ${sideMargin};
  padding: 20px 36px 28px 36px;

  background: ${vars.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  ${down("xs")} {
    margin: 0 15px 30px 15px;
  }

  ${up("md")} {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`

function ContentCard({ children, ...rest }) {
  const { t } = useTranslation()
  const history = useHistory()
  const canGoBack = history.length > 1
  return (
    <div>
      <Header>
        { canGoBack && <BackButton alt={t('back')} onClick={history.goBack} /> }
        <Logo to="/">
          <img src={logo} alt={t('appname')} />
        </Logo>
      </Header>
      <Card {...rest}>{children}</Card>
    </div>
  )
}

export default ContentCard
