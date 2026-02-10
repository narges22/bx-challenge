import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../store/themeSlice'
import Button from '../../components/Button'
import styles from './Settings.module.scss'

export default function Settings() {
  const theme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme))
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Theme</h2>
        <p className={styles.description}>Choose your preferred theme</p>
        <div className={styles.themeSelector}>
          <Button
            type="secondary"
            selected={theme === 'light'}
            onClick={() => handleThemeChange('light')}>
            Light
          </Button>
          <Button
            type="secondary"
            selected={theme === 'dark'}
            onClick={() => handleThemeChange('dark')}>
            Dark
          </Button>
        </div>
      </section>
    </div>
  )
}
