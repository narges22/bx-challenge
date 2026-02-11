import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

const ThemeSync = () => {
  const theme = useSelector((state) => state.theme.value)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
export default ThemeSync
