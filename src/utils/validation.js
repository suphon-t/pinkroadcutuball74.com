import * as yup from "yup"

import "../yup-init"
import { telPattern, emailPattern } from "."

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  ID: yup
    .string()
    .nationalId("invalidValue")
    .required(),
  tel: yup
    .string()
    .required()
    .matches(telPattern, "invalidValue"),
  email: yup
    .string()
    .required()
    .matches(emailPattern, "invalidValue"),
  faculty: yup.string().required()
})
