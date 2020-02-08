import React from "react"
import { Link } from "react-router-dom"
import { between } from "polished"
import { up } from "styled-breakpoints"
import { useTranslation } from "react-i18next"

// style
import vars from "../styles/vars"

// ant design
import OrangeButton from "../components/OrangeButton"
import styled from "styled-components"
import breakpoints, { Up, Down } from "../styles/breakpoints"

import logoSvg from "../images/logo.svg"
import logo from "../images/logo-landing.png"
import logo2x from "../images/logo-landing@2x.png"
import { isEventDay } from "../utils"
import SafeArea from "../components/SafeArea"
import LanguageSwitcher from "../components/LanguageSwitcher"

const Center = styled.div`
  width: 100%;
  text-align: center;
`

const Logo = styled.img`
  height: ${between("61px", "120px", "375px", "1440px")};
  margin-top: ${between("41px", "64px", "375px", "1440px")};
  margin-bottom: ${between("35px", "26px", "375px", "1440px")};
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  * {
    color: ${vars.white};
    text-shadow: 0px 4px 20px rgba(25, 33, 52, 0.5);
  }
`

const Line1 = styled.p`
  font-size: ${between("20px", "33px", "375px", "1440px")};
  font-weight: 500;
`

const Line2 = styled.h1`
  margin-top: calc(${vars.space} * 2);
  font-size: 85px;
  font-weight: bold;

  ${up("lg")} {
    font-size: ${between("85px", "90px", breakpoints.lg, "1440px")};
  }
`

const Line3 = styled.h1`
  margin-top: ${vars.space};
  font-size: 48px;
  font-weight: bold;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${between("150px", "150px", "375px", breakpoints.xxxl)};
  margin-bottom: ${between("39px", "108px", "375px", breakpoints.xxxl)};

  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LandingButton = styled(OrangeButton)`
  width: ${between("226px", "350px", "375px", "1440px")};
  height: ${between("50px", "70px", "375px", "1440px")};

  font-weight: 400;
  font-size: ${between("24px", "36px", "375px", "1440px")};

  ${up("md")} {
    border-width: 2px;
  }
`

const RegisterLink = styled(Link)`
  margin-top: ${between("16px", "28px", "375px", "1440px")};

  ${LandingButton} {
    background: ${vars.white};
    box-shadow: none;
  }
`

const GetStatusButton = styled(Link)`
  margin-top: ${between("32px", "24px", "375px", "1440px")};

  color: ${vars.darkBlue};
  font-size: ${between("18px", "24px", "375px", "1440px")};
  text-decoration: underline;
`

const Everything = styled(SafeArea)`
  display: flex;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${up('xl')} {
    min-height: 100vh;
  }
`

const LanguageContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 15px;

  ${up('xl')} {
    top: 40px;
    right: 40px;
  }
`

function Landing() {
  const { t } = useTranslation()
  return (
    <Everything all>
      <LanguageContainer>
        <SafeArea top right>
          <LanguageSwitcher />
        </SafeArea>
      </LanguageContainer>
      <Center>
        <picture>
          <source type="image/svg+xml" srcSet={logoSvg} />
          <source type="image/png" srcSet={`${logo2x} 2x, ${logo} 1x`} />
          <Logo src={logo} alt="" />
        </picture>
      </Center>
      <TitleContainer>
        <Up breakpoint="lg">
          <Line1>{t('appname')}</Line1>
          <Line2>BAKA Pink Road</Line2>
        </Up>
        <Down breakpoint="md">
          <Line1>
            {t('landing.line1')}
            <br />
            {t('landing.line2')}
          </Line1>
          <Line2>
            BAKA
            <br />
          </Line2>
          <Line3>Pink Road</Line3>
        </Down>
      </TitleContainer>
      <ButtonsContainer>
        {isEventDay ? (
          <>
            <Link to="/ticket">
              <LandingButton type="primary">{t('login.edtitle')}</LandingButton>
            </Link>
            <RegisterLink to="/register">
              <LandingButton type="primary">{t('register.submit')}</LandingButton>
            </RegisterLink>
          </>
        ) : (
          <>
            <Link to="/register">
              <LandingButton type="primary">{t('register.submit')}</LandingButton>
            </Link>
            <GetStatusButton to="/user">{t('register.checkinfo')}</GetStatusButton>
          </>
        )}
      </ButtonsContainer>
    </Everything>
  )
}

export default Landing
