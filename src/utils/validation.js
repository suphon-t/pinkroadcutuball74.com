import * as yup from "yup"

import "../yup-init"
import { telPattern, emailPattern } from "."
import facultyCodes from "../i18n/faculty-codes"

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(255, "invalidValue"),
  ID: yup
    .string()
    .required()
    .nationalId("invalidValue"),
  tel: yup
    .string()
    .required()
    .matches(telPattern, "invalidValue"),
  email: yup
    .string()
    .required()
    .max(255, "invalidValue")
    .matches(emailPattern, "invalidValue"),
  faculty: yup
    .string()
    .required()
    .oneOf(facultyCodes, "invalidValue")
})

export default yup
