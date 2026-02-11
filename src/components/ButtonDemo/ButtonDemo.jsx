import Button from '../Button'
import { ExitIcon } from '../Icons'
import styles from './ButtonDemo.module.scss'

/**
 * ButtonDemo
 *
 * @param {Object} props - Component props
 * @param {'primary' | 'secondary' | 'danger' | string} [props.type='primary']
 * @param {'default' | 'active' | 'focus' | 'disabled' | 'selected'} [props.variation='default']
 * @param {string} [props.buttonText='Primary']
 * @param {string} [props.className]
 * @param {...any} rest
 * @returns {JSX.Element}
 */

export default function ButtonDemo({
  type = 'primary',
  variation = 'default',
  buttonText = 'Primary',
  className,
  ...rest
}) {
  const variationClass = variation === 'focus' ? styles.variationFocus : ''
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
