import React from "react"
import { Link } from "react-router-dom"

// style
import vars from "../styles/vars"

// ant design
import OrangeButton from "../components/OrangeButton"
import styled from "styled-components"
import { MobileDown, TabletUp } from "../styles/breakpoints"

import logo from "../images/logo.png"
import { between } from "polished"

const Center = styled.div`
  width: 100%;
  text-align: center;
`

const Logo = styled.img`
  width: ${between('77px', '158px', '375px', '1440px')};
  margin-top: ${between('41px', '87px', '375px', '1440px')};
  margin-bottom: ${between('35px', '26px', '375px', '1440px')};
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
  font-size: ${between('20px', '46px', '375px', '1440px')};
  font-weight: 500;
`

const Line2 = styled.h1`
  margin-top: calc(${vars.space} * 2);
  font-size: ${between('60px', '110px', '375px', '1440px')};
  font-weight: bold;
`

const Line3 = styled.h1`
  margin-top: ${vars.space};
  font-size: ${between('24px', '92px', '375px', '1440px')};
  font-weight: bold;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${between('150px', '247px', '375px', '1440px')};
  margin-bottom: ${between('39px', '108px', '375px', '1440px')};

  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const RegisterButton = styled(OrangeButton)`
  width: ${between('226px', '375px', '375px', '1440px')};
  height: ${between('50px', '83px', '375px', '1440px')};

  font-weight: 400;
  font-size: ${between('24px', '40px', '375px', '1440px')};
  color: $dark-blue;
`

const GetStatusButton = styled(Link)`
  margin-top: ${between('32px', '24px', '375px', '1440px')};

  color: ${vars.darkBlue};
  font-size: ${between('18px', '30px', '375px', '1440px')};
  text-decoration: underline;
`

function Landing() {
  return (
    <div>
      <Center>
        <Logo src={logo} />
      </Center>
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
        <GetStatusButton to="/user">ตรวจสอบข้อมูล</GetStatusButton>
      </ButtonsContainer>
    </div>
  )
}

export default Landing
