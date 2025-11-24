import React, { useState } from 'react'
import styles from './modal.module.scss'
import glyph from '../../../../assets/glyph.svg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [animationClass, setAnimationClass] = useState(styles.fadeIn)

  if (!isOpen) return null

  const closeModal = () => {
    setAnimationClass(styles.fadeOut)
    setTimeout(() => {
      onClose()
      setAnimationClass(styles.fadeIn)
    }, 500) // 300ms = durée de l'animation
  }

  return (
    <div className={`${styles.modal} ${animationClass}`} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal_header}>
        <h1 className={styles.modal_title}>{title}</h1>
        <div className={styles.modal_close} onClick={closeModal}>
          <img src={glyph} alt="Close icon" />
        </div>
      </div>
      <div className={styles.modal_body}>{children}</div>
    </div>
  )
}

export default Modal
