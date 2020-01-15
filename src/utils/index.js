export const idNumberPattern = /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/
export const telPattern = /^(\d{2,4})(\d{3})(\d{4})$/
export const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export function validateIdNumber(value) {
  if (value.length !== 13) {
    return false
  }
  if (!idNumberPattern.test(value)) {
    return false
  }
  const digits = Array.from(value.substring(0, 12)).map(ch => parseInt(ch))
  const sum = digits
    .map((d, i) => d * (13 - i))
    .reduce((a, b) => a + b, 0)
  const checkDigit = (11 - sum % 11) % 10
  return checkDigit === parseInt(value[12])
}

export function optionContains(input, option) {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
