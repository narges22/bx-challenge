import { Link, useLocation } from 'react-router-dom'
import styles from './Menu.module.scss'

const Menu = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/chart', label: 'Chart' },
    { path: '/buttons', label: 'Buttons' },
    { path: '/settings', label: 'Settings' }
  ]

  return (
    <nav className={styles.container}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.link} ${isActive ? styles.active : ''}`}>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default Menu
