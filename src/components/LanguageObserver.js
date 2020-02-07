import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { usePref, LANGUAGE } from "../preferences"

function LanguageObserver() {
  const { i18n } = useTranslation()
  const [language] = usePref(LANGUAGE)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  return null
}

export default LanguageObserver
