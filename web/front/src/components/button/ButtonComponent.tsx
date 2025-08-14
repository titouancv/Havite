import React from 'react'
import styles from './button-component.module.scss'

interface ButtonComponentProps {
  content: string
  isPrimary?: boolean
  hanndleClick?: () => void
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  content,
  isPrimary = false,
  hanndleClick,
}) => {
  return (
    <div
      className={`${styles.buttonComponent} ${isPrimary && styles.primary}`}
      onClick={hanndleClick}
    >
      {content}
    </div>
  )
}

export default ButtonComponent
