import classNames from 'classnames'
import styles from './Button.module.scss'

function getButtonTypeClass(type) {
  return styles[`btn${type.charAt(0).toUpperCase() + type.slice(1)}`]
}

/**
 * Reusable Button component.
 * Supports text, left/right icons, icon-only mode, sizes, and a selected state.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.children] - Button label content.
 * @param {React.ReactNode} [props.iconLeft] - Optional icon displayed on the left.
 * @param {React.ReactNode} [props.iconRight] - Optional icon displayed on the right.
 * @param {'primary' | 'secondary' | 'danger' | string} [props.type='primary'] - Visual style variant.
 * @param {'large' | undefined} [props.size] - Optional size variant.
 * @param {boolean} [props.selected] - Whether the button is in a selected/toggled state.
 * @param {string} [props.className] - Optional additional class name(s).
 * @param {...any} rest - Additional props passed to the native <button> element.
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
