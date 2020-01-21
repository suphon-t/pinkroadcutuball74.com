import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"

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
function RegisterNumber() {
  return (
    <Card></Card>
  )
}
export default RegisterNumber