import React from 'react'
import styles from './button-component.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ content, variant = 'secondary', className, ...props }) => {
  return (
    <button
      className={`${styles.buttonComponent} ${variant === 'primary' ? styles.primary : ''} ${className || ''}`}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button
