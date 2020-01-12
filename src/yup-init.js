import * as yup from "yup"
import { validateIdNumber } from "./utils"

yup.addMethod(yup.string, 'nationalId', function(message) {
  return this.test({
    name: 'nationalId',
    test: value => validateIdNumber(value),
    message: message,
  })
})
