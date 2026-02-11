import styles from './Layout.module.scss'

export default function Layout({ children, maxWidth = 1200 }) {
  return (
    <div className={styles.container} style={{ maxWidth: `${maxWidth}px` }}>
      {children}
    </div>
  )
}
