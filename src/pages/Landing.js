import React from "react"
import { Link } from "react-router-dom"

// style
import vars from "../styles/vars"

// ant design
import OrangeButton from "../components/OrangeButton"
import styled from "styled-components"
import breakpoints, { Up, Down } from "../styles/breakpoints"

import logoSvg from "../images/logo.svg"
import logo from "../images/logo-landing.png"
import logo2x from "../images/logo-landing@2x.png"
import { up } from "styled-breakpoints"
import { isEventDay, clamp } from "../utils"

const Center = styled.div`
  width: 100%;
  text-align: center;
`

const Logo = styled.img`
  height: ${clamp("61px", "120px", "375px", "1440px")};
  margin-top: ${clamp("41px", "64px", "375px", "1440px")};
  margin-bottom: ${clamp("35px", "26px", "375px", "1440px")};
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
  font-size: ${clamp("20px", "33px", "375px", "1440px")};
  font-weight: 500;
`

const Line2 = styled.h1`
  margin-top: calc(${vars.space} * 2);
  font-size: 85px;
  font-weight: bold;

  ${up("lg")} {
    font-size: ${clamp("85px", "90px", breakpoints.lg, "1440px")};
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
  margin-top: ${clamp("150px", "150px", "375px", breakpoints.xxxl)};
  margin-bottom: ${clamp("39px", "108px", "375px", breakpoints.xxxl)};

  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LandingButton = styled(OrangeButton)`
  width: ${clamp("226px", "350px", "375px", "1440px")};
  height: ${clamp("50px", "70px", "375px", "1440px")};

  font-weight: 400;
  font-size: ${clamp("24px", "36px", "375px", "1440px")};

  ${up("md")} {
    border-width: 2px;
  }
`

const RegisterLink = styled(Link)`
  margin-top: ${clamp("16px", "28px", "375px", "1440px")};

  ${LandingButton} {
    background: ${vars.white};
    box-shadow: none;
  }
`

const GetStatusButton = styled(Link)`
  margin-top: ${clamp("32px", "24px", "375px", "1440px")};

  color: ${vars.darkBlue};
  font-size: ${clamp("18px", "24px", "375px", "1440px")};
  text-decoration: underline;
`

const Everything = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${up('xl')} {
    min-height: 100vh;
  }
`

function Landing() {
  return (
    <Everything>
      <Center>
        <picture>
          <source type="image/svg+xml" srcSet={logoSvg} />
          <source type="image/png" srcSet={`${logo2x} 2x, ${logo} 1x`} />
          <Logo src={logo} alt="" />
        </picture>
      </Center>
      <TitleContainer>
        <Up breakpoint="lg">
          <Line1>งานฟุตบอลประเพณี จุฬาฯ - ธรรมศาสตร์ ครั้งที่ 74</Line1>
          <Line2>BAKA Pink Road</Line2>
        </Up>
        <Down breakpoint="md">
          <Line1>
            งานฟุตบอลประเพณี <br /> จุฬาฯ - ธรรมศาสตร์ ครั้งที่ 74
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
              <LandingButton type="primary">รับบัตรเข้างาน</LandingButton>
            </Link>
            <RegisterLink to="/register">
              <LandingButton type="primary">ลงทะเบียน</LandingButton>
            </RegisterLink>
          </>
        ) : (
          <>
            <Link to="/register">
              <LandingButton type="primary">ลงทะเบียน</LandingButton>
            </Link>
            <GetStatusButton to="/user">ตรวจสอบข้อมูล</GetStatusButton>
          </>
        )}
      </ButtonsContainer>
    </Everything>
  )
}

export default Landing
