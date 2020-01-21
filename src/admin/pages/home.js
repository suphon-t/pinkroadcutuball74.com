import React from "react"
import AdminBar from "../components/AdminBar"
import RegisterNumber from "../components/RegisterNumber"
import EnterNumber from "../components/EnterNumber"

const PeopleDisplay = styled.div`

`
function Home() {
  return (
    <AdminBar fixed="top" expand="lg"/>
    <PeopleDisplay>
      <RegisterNumber/>
      <EnterNumber/>
    </PeopleDisplay>
  )

}

export default Home
