import React from 'react'
import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.buttonComponent} ${variant === 'primary' ? styles.primary : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
