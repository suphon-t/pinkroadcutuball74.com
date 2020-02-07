import { useEffect, useState } from "react"

function createPref(key, defaultValue) {
  const pref = { 
    key, defaultValue, listeners: [],
    value: loadValue(key, defaultValue),
  }
  pref.setValue = newValue => setPrefValue(pref, newValue)
  return pref
}

export function loadValue(key, defaultValue) {
  const value = localStorage && localStorage.getItem(key)
  if (value !== null) {
    return JSON.parse(value)
  } else {
    return defaultValue
  }
}

export function setPrefValue(pref, newValue) {
  pref.value = newValue
  pref.listeners.forEach(listener => listener())
  if (!localStorage) return
  if (newValue !== undefined) {
    localStorage.setItem(pref.key, JSON.stringify(newValue))
  } else {
    localStorage.removeItem(pref.key)
  }
}

export function usePref(pref) {
  const [, setCurrent] = useState(() => pref.value)

  useEffect(() => {
    const updateValue = () => setCurrent(pref.value)
    updateValue()
    pref.listeners.push(updateValue)
    return () => {
      pref.listeners.splice(pref.listeners.indexOf(updateValue), 1)
    }
  }, [pref])

  return [pref.value, pref.setValue]
}

export const ADMIN_PAGE_SIZE = createPref('adminPageSize', 10)
export const LANGUAGE = createPref('language', 'th')
