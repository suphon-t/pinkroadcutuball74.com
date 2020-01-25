import { useTranslation } from "react-i18next"
import facultyCodes from "../i18n/faculty-codes"
import { useMemo, useState, useCallback, useEffect } from "react"
import { parseISO, format } from "date-fns"

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

export function useFacultyOptions() {
  const { t } = useTranslation()
  return useMemo(() => {
    return facultyCodes.map(code => ({
      value: code,
      label: t(`facultyNames.${code}`),
    }))
  }, [t])
}

export function parseToken(token) {
  if (typeof token !== 'string') {
    return undefined
  }
  
  const parts = token.split('.')
  if (parts.length !== 3) {
    return undefined
  }
  try {
    return JSON.parse(atob(parts[1]))
  } catch {
    return undefined
  }
}

export function useCurrentTime(disp = 'HH:mm:ss') {
  const [time, setTime] = useState('')

  const updateTime = useCallback(() => {
    setTime(format(new Date(), disp))
  }, [disp])

  useEffect(() => {
    const clear = setInterval(() => {
      updateTime()
    }, 1000)
    updateTime()
    return () => clearInterval(clear)
  }, [updateTime])

  return time
}

// https://www.kirupa.com/html5/detecting_retina_high_dpi.htm
export const isHiDpi = matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)")?.matches

// https://stackoverflow.com/a/27232658
export const supportsWebP = (() => {
  const elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  // very old browser like IE 8, canvas not supported
  return false;
})()

export const isEventDay = new Date() > parseISO('2020-02-08T04:00:00+07:00')
