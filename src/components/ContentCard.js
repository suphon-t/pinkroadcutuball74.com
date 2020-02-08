import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"

import logoSvg from "../images/logo.svg"
import logoDesktop from "../images/logo-desktop.png"
import logoDesktop2x from "../images/logo-desktop@2x.png"

import { up } from "styled-breakpoints"
import vars from "../styles/vars"
import { between } from "polished"
import breakpoints, { Down, Up } from "../styles/breakpoints"
import OrangeButton from "./OrangeButton"

import { ReactComponent as BackIcon } from "../images/arrow-back.svg"
import SafeArea from "./SafeArea"
import ContentContainer from "./ContentContainer"
import Footer from "./Footer"
import { landingRoute } from "../utils"
import LanguageSwitcher from "./LanguageSwitcher"

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
  display: flex;
  top: 0;
  right: 0;

  flex-direction: row;
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
  position: relative;
  padding: 20px 36px 28px 36px;

  background: ${vars.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  ${up("xl")} {
    padding: 43px 67px 67px 67px;
    margin-top: 18px;
  }
`

const Layout = styled.div`
  ${({ loading }) => loading && css`
    opacity: 0;
  `}
`

const LanguageContainerMobile = styled.div`
  margin-top: 18px;
  margin-right: 4px;
`

const LanguageContainerDesktop = styled.div`
  position: absolute;
  top: 28px;
  right: 28px;
`

const ContentCard = React.forwardRef(({ loading, children, footer, noLanguage, ...rest }, ref) => {
  const { t } = useTranslation()
  const history = useHistory()
  const canGoBack = history.length > 1
  return (
    <Layout loading={loading}>
      <Header>
        { canGoBack ? (
          <BackButton aria-label={t('back')} onClick={history.goBack}>
            <BackIcon />
          </BackButton>
        ) : <Space /> }
        <LogoSafeArea top right>
          <Down breakpoint="lg">
            <LanguageContainerMobile>
              <LanguageSwitcher />
            </LanguageContainerMobile>
          </Down>
          <Logo to={landingRoute}>
            <picture>
              <source type="image/svg+xml" srcSet={logoSvg} />
              <source type="image/png" media={`(min-width: ${breakpoints.lg})`} srcSet={`${logoDesktop2x} 2x, ${logoDesktop} 1x`} />
              <img src={logoDesktop} alt={t('appname')} />
            </picture>
          </Logo>
        </LogoSafeArea>
      </Header>
      <Card ref={ref} {...rest}>
        { !noLanguage && <Up breakpoint="xl">
          <LanguageContainerDesktop>
            <LanguageSwitcher />
          </LanguageContainerDesktop>
        </Up> }
        {children}
      </Card>
      {footer && <div style={{ marginTop: 30 }}>{footer}</div>}
      <Footer />
    </Layout>
  )
})

export default ContentCard
