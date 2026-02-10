import classNames from 'classnames'
import styles from './Button.module.scss'

export default function Button({
  children,
  iconLeft,
  iconRight,
  type = 'primary',
  size,
  className,
  ...rest
}) {
  const isIconOnly = !children && (iconLeft || iconRight)
  const buttonClasses = classNames(
    styles.btn,
    styles[`btn${type.charAt(0).toUpperCase() + type.slice(1)}`],
    isIconOnly && styles.btnIconOnly,
    size === 'large' && styles.btnLarge,
    className,
  )
  const iconLeftClasses = classNames(styles.btnIcon, styles.btnIconLeft)
  const iconRightClasses = classNames(styles.btnIcon, styles.btnIconRight)

  return (
    <button className={buttonClasses} type="button" {...rest}>
      {iconLeft && <span className={iconLeftClasses}>{iconLeft}</span>}
      {children && <span className={styles.btnContent}>{children}</span>}
      {iconRight && <span className={iconRightClasses}>{iconRight}</span>}
    </button>
  )
}
