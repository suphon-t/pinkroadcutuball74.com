import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import logoMobile from "../images/logo-mobile.png"
import logoMobile2x from "../images/logo-mobile@2x.png"
import logoDesktop from "../images/logo-desktop.png"
import logoDesktop2x from "../images/logo-desktop@2x.png"
import logoDesktopWebp from "../images/logo-desktop.webp"
import logoDesktopWebp2x from "../images/logo-desktop@2x.webp"

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

  ${up("xl")} {
    opacity: 0;
  }
`

const Logo = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px 10px;

  img {
    width: 42.26px;
    height: 33.5px;
  }

  ${up('lg')} {
    padding: ${between('16px', '36px', breakpoints.lg, breakpoints.xxxl)} ${between('10px', '56px', breakpoints.lg, breakpoints.xxxl)};
    
    img {
      width: ${between('42.26px', '128.68px', breakpoints.lg, breakpoints.xxxl)};
      height: ${between('33.5px', '102px', breakpoints.lg, breakpoints.xxxl)};
    }
  }
  
  ${up('xxxl')} {
    padding: 36px 56px;

    img {
      width: 128.68px;
      height: 102px;
    }
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

  ${up("xl")} {
    width: 670px;
    margin-top: 18px;
    padding: 43px 67px 67px 67px;
  }
`

const ContentCard = React.forwardRef(({ children, ...rest }, ref) => {
  const { t } = useTranslation()
  const history = useHistory()
  const canGoBack = history.length > 1
  return (
    <div>
      <Header>
        { canGoBack && <BackButton alt={t('back')} onClick={history.goBack} /> }
        <Logo to="/">
          <picture>
            <source type="image/webp" media={`(min-width: ${breakpoints.lg})`} srcSet={`${logoDesktopWebp2x} 2x, ${logoDesktopWebp} 1x`} />
            <source type="image/png" media={`(min-width: ${breakpoints.lg})`} srcSet={`${logoDesktop2x} 2x, ${logoDesktop} 1x`} />
            <source type="image/png" media={`(max-width: ${breakpoints.lg})`} srcSet={`${logoMobile2x} 2x, ${logoMobile} 1x`} />
            <img src={logoDesktop} alt={t('appname')} />
          </picture>
        </Logo>
      </Header>
      <Card ref={ref} {...rest}>{children}</Card>
    </div>
  )
})

export default ContentCard
