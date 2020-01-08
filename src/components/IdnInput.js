import React, { useEffect } from "react"

function validate(value) {
  const digits = Array.from(value.substring(0, 12)).map(ch => parseInt(ch))
  const sum = digits
    .map((d, i) => d * (13 - i))
    .reduce((a, b) => a + b, 0)
  const checkDigit = (11 - sum % 11) % 10
  return checkDigit === parseInt(value[12])
}

function IdnInput(props) {
  const { value, setValue, onValidated } = props
  const handleChange = e => {
    setValue(e.target.validity.valid ? e.target.value : value)
  }
  useEffect(() => {
    if (value.length === 13) {
      onValidated(validate(value))
    }
  }, [value, onValidated])
  return <input 
    pattern="[0-9]{0,13}"
    value={value} 
    onChange={handleChange} />
}

export default IdnInput
