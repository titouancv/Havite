import React from 'react'
import styles from './button-component.module.scss'

interface ButtonComponentProps {
  content: string
  isPrimary: boolean
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ content, isPrimary }) => {
  return (
    <button className={styles.buttonComponent + isPrimary ? ' -primary' : ''}>{content}</button>
  )
}

export default ButtonComponent
