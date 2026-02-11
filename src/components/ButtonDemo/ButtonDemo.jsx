import Button from '../Button'
import { ExitIcon } from '../Icons'
import styles from './ButtonDemo.module.scss'

/**
 * ButtonDemo
 *
 * Renders a row of button variations for demonstration .
 *
 * @param {Object} props - Component props
 * @param {'primary' | 'secondary' | 'danger' | string} [props.type='primary']
 *  The visual style variant of the button.
 *
 * @param {'default' | 'active' | 'focus' | 'disabled' | 'selected'} [props.variation='default']
 *  The visual state of the button for demonstration.
 *
 * @param {string} [props.buttonText='Primary']
 *  The text displayed inside the button.
 * @param {string} [props.className]
 *  Optional additional class names.
 * * @returns {JSX.Element} A styled button element.
 */

export default function ButtonDemo({
  type = 'primary',
  variation = 'default',
  buttonText = 'Primary',
  className,
  ...rest
}) {
  const variationClass =
    variation === 'active'
      ? styles.variationActive
      : variation === 'focus'
        ? styles.variationFocus
        : ''
  const wrapperClass = className
    ? `${styles.row} ${variationClass} ${className}`.trim()
    : `${styles.row} ${variationClass}`.trim()
  const isSelected = variation === 'selected'
  return (
    <div className={wrapperClass}>
      <Button type={type} disabled={variation === 'disabled'} selected={isSelected} {...rest}>
        {buttonText}
      </Button>
      <Button
        type={type}
        iconRight={<span>→</span>}
        disabled={variation === 'disabled'}
        selected={isSelected}
        {...rest}>
        {buttonText}
      </Button>
      <Button
        type={type}
        iconLeft={<span>←</span>}
        disabled={variation === 'disabled'}
        selected={isSelected}
        {...rest}>
        {buttonText}
      </Button>
      <Button
        type={type}
        iconLeft={<ExitIcon />}
        disabled={variation === 'disabled'}
        selected={isSelected}
        {...rest}
      />
    </div>
  )
}
