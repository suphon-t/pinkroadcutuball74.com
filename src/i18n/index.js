import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import th from "./th"
import en from "./en"
import { LANGUAGE } from "../preferences"

const resources = {
  th: {
    translation: th
  },
  en: {
    translation: en
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: LANGUAGE.value,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
