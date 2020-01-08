import React, { useState, useCallback } from "react"

import IdnInput from "../components/IdnInput"

function Register() {
  const [ idn, setIdn ] = useState("")
  const [ message, setMessage ] = useState("")
  const handleValidate = useCallback(result => {
    if (result) {
      setMessage("ID number valid")
    } else {
      setMessage("ID number invalid")
    }
  }, [])
  return (
    <>
      <IdnInput value={idn} setValue={setIdn} onValidated={handleValidate} />
      { message }
    </>
  )
}

export default Register
