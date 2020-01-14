import React from "react"
import { Link } from "react-router-dom"

// style
import vars from "../styles/vars"

// ant design
import OrangeButton from "../components/OrangeButton"
import { up, down } from "styled-breakpoints"
import styled from "styled-components"
import { MobileDown, TabletUp } from "../styles/breakpoints"

const LandingContainer = styled.div`
  position: relative;
  height: 500px;
  min-height: 100vh;
  padding-top: calc(${vars.space} * 12);
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  & > * {
    color: ${vars.white};
    text-shadow: 0px 4px 20px rgba(25, 33, 52, 0.5);
    & > * {
      color: ${vars.white};
      text-shadow: 0px 4px 20px rgba(25, 33, 52, 0.5);
    }
  }
`

const Line1 = styled.p`
  font-size: 20px;
  font-weight: 200;

  ${down("sm")} {
    font-size: 20px;
  }
`

const Line2 = styled.h1`
  margin-top: calc(${vars.space} * 2);
  font-size: 50px;
  font-weight: 9000;

  ${down("sm")} {
    font-size: 54px;
  }
`

const Line3 = styled.h1`
  margin-top: ${vars.space};
  font-size: 42px;
  font-weight: 1000;

  ${down("sm")} {
    font-size: 24px;
  }
`

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: calc(${vars.space} * 10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const RegisterButton = styled(OrangeButton)`
  width: initial;

  font-weight: 400;
  font-size: 20px;
  color: $dark-blue;
  padding: calc(${vars.space} * 2.5) calc(${vars.space} * 6);
  line-height: 0;

  ${up("sm")} {
    font-size: 30px;
    padding: calc(${vars.space} * 3) calc(${vars.space} * 7);
  }
`

const GetStatusButton = styled(Link)`
  margin-top: calc(${vars.space} * 4);
  text-decoration: underline;
  color: ${vars.darkBlue};

  ${up("sm")} {
    font-size: 20px;
  }
`

function Landing() {
  return (
    <LandingContainer>
      <TitleContainer>
        <TabletUp>
          <Line1>งานฟุตบอลประเพณี จุฬาฯ-ธรรมศาสตร์ ครั้งที่ 74</Line1>
          <Line2>MAKE A CHANGE</Line2>
        </TabletUp>
        <MobileDown>
          <Line1>
            งานฟุตบอลประเพณี <br /> จุฬาฯ-ธรรมศาสตร์ ครั้งที่ 74
          </Line1>
          <Line2>
            MAKE A <br />
            CHANGE
          </Line2>
        </MobileDown>
        <Line3>เปลี่ยนปรับ ขยับสังคม</Line3>
      </TitleContainer>
      <ButtonsContainer>
        <Link to="/register">
          <RegisterButton type="primary">ลงทะเบียน</RegisterButton>
        </Link>
        <GetStatusButton to="/login">ตรวจสอบข้อมูล</GetStatusButton>
      </ButtonsContainer>
    </LandingContainer>
  )
}

export default Landing
