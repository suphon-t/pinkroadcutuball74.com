import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import logoSvg from "../images/logo.svg"
import logoDesktop from "../images/logo-desktop.png"
import logoDesktop2x from "../images/logo-desktop@2x.png"

import { up } from "styled-breakpoints"
import vars from "../styles/vars"
import { between } from "polished"
import breakpoints from "../styles/breakpoints"
import OrangeButton from "./OrangeButton"

import { ReactComponent as BackIcon } from "../images/arrow-back.svg"
import SafeArea from "./SafeArea"
import ContentContainer from "./ContentContainer"

const Header = styled.div`
  display: flex;
`

const Space = styled.div`
  height: 30px;
  margin: 16px;
`

const BackButton = styled(OrangeButton)`
  width: 30px;
  height: 30px;
  margin: 16px;
  padding: 0;

  svg {
    display: block;
    width: 24px;
    height: 24px;
    margin: auto;
    fill: ${vars.darkBlue};
  }

  ${up("xl")} {
    opacity: 0;
  }
`

const LogoSafeArea = styled(SafeArea)`
  position: absolute;
  top: 0;
  right: 0;
`

const Logo = styled(Link)`
  display: block;
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

const Card = styled(ContentContainer)`
  padding: 20px 36px 28px 36px;

  background: ${vars.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  ${up("xl")} {
    padding: 43px 67px 67px 67px;
  }
`

const ContentCard = React.forwardRef(({ loading, children, ...rest }, ref) => {
  const { t } = useTranslation()
  const history = useHistory()
  const canGoBack = history.length > 1
  return (
    <div style={{ opacity: loading ? 0 : 1 }}>
      <Header>
        { canGoBack ? (
          <BackButton aria-label={t('back')} onClick={history.goBack}>
            <BackIcon />
          </BackButton>
        ) : <Space /> }
        <LogoSafeArea top right>
          <Logo to="/">
            <picture>
              <source type="image/svg+xml" srcSet={logoSvg} />
              <source type="image/png" media={`(min-width: ${breakpoints.lg})`} srcSet={`${logoDesktop2x} 2x, ${logoDesktop} 1x`} />
              <img src={logoDesktop} alt={t('appname')} />
            </picture>
          </Logo>
        </LogoSafeArea>
      </Header>
      <Card ref={ref} {...rest}>{children}</Card>
    </div>
  )
})

export default ContentCard
