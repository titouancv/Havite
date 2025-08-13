import React from 'react'
import styles from './modal.module.scss'
import glyph from '../../../../assets/glyph.svg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal_header}>
        <h1 className={styles.modal_title}>{title}</h1>
        <div className={styles.modal_close} onClick={onClose}>
          <img src={glyph} alt="Close icon" />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Modal
