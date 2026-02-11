import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../store/themeSlice'
import Button from '../../components/Button'
import layoutStyles from '../../components/Layout/Layout.module.scss'
import styles from './Settings.module.scss'

export default function Settings() {
  const theme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme))
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <>
      <h1 className={layoutStyles.title}>Settings</h1>
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
    </>
  )
}
