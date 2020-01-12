export const idNumberPattern = "^[0-9]{0,13}$"
export const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export function validateIdNumber(value) {
  if (value.length !== 13) {
    return false
  }
  if (!new RegExp(idNumberPattern).test(value)) {
    return false
  }
  const digits = Array.from(value.substring(0, 12)).map(ch => parseInt(ch))
  const sum = digits
    .map((d, i) => d * (13 - i))
    .reduce((a, b) => a + b, 0)
  const checkDigit = (11 - sum % 11) % 10
  return checkDigit === parseInt(value[12])
}
