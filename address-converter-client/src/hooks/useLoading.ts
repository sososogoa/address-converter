import { useState } from 'react'

let globalSetter: ((val: boolean) => void) | null = null

export function useGlobalLoading() {
  const [loading, setLoading] = useState(false)
  globalSetter = setLoading
  return loading
}

export function setGlobalLoading(val: boolean) {
  if (globalSetter) globalSetter(val)
}
