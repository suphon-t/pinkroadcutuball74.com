import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import logo from "../images/logo.png"
import { down, up } from "styled-breakpoints"
import vars from "../styles/vars"

const Logo = styled(Link)`
  display: inline-block;

  img {
    width: 42.26px;
    height: 33.5px;
    margin: 16px 10px 10px 10px;
  }
`

const Card = styled.div`
  display: block;
  margin: 0 30px 30px 30px;
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
  return (
    <div>
      <Logo to="/">
        <img src={logo} />
      </Logo>
      <Card {...rest}>{children}</Card>
    </div>
  )
}

export default ContentCard
