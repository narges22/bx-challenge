import classNames from 'classnames'
import styles from './Button.module.scss'

function getButtonTypeClass(type) {
  return styles[`btn${type.charAt(0).toUpperCase() + type.slice(1)}`]
}

/**
 *  Button component.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.iconLeft]
 * @param {React.ReactNode} [props.iconRight]
 * @param {'primary' | 'secondary' | 'danger' | string} [props.type='primary']
 * @param {'large' | undefined} [props.size]
 * @param {boolean} [props.selected]
 * @param {string} [props.className]
 * @param {...any} rest
 *
 * @returns {JSX.Element} A styled button element.
 */

export default function Button({
  children,
  iconLeft,
  iconRight,
  type = 'primary',
  size,
  selected,
  className,
  ...rest
}) {
  const isIconOnly = !children && (iconLeft || iconRight)
  const buttonClasses = classNames(
    styles.btn,
    getButtonTypeClass(type),
    isIconOnly && styles.btnIconOnly,
    size === 'large' && styles.btnLarge,
    selected && styles.btnSelected,
    className
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
