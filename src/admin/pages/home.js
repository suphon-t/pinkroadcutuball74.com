import React from "react"
import styled from "styled-components"

import { down, up } from "styled-breakpoints"
import { between } from "polished"
import breakpoints from "../../styles/breakpoints"

import AdminBar from "../components/AdminBar"
import RegisterNumber from "../components/RegisterNumber"
import EnterNumber from "../components/EnterNumber"


const PeopleDisplay = styled.div`
display:flex;
margin:50px 10px 50px 10px; 

`
function Home() {
  return (
    <>
    <AdminBar fixed="top" expand="lg"/>
    <PeopleDisplay style={{ textAlign: 'center' }}>
    <RegisterNumber/>
    <EnterNumber/>
    </PeopleDisplay>
    </>
    )
}

export default Home
