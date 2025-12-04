import React, { useState } from 'react'
import glyph from '../../../assets/glyph.svg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [animationClass, setAnimationClass] = useState('animate-fade-in')

  if (!isOpen) return null

  const closeModal = () => {
    setAnimationClass('animate-fade-out')
    setTimeout(() => {
      onClose()
      setAnimationClass('animate-fade-in')
    }, 500)
  }

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start px-4 gap-6 z-[1000] bg-gray-100 text-gray-800 ${animationClass}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between w-full">
        <h1 className="font-bold max-w-[80%] sm:text-xl">{title}</h1>
        <div className="p-3 cursor-pointer" onClick={closeModal}>
          <img src={glyph} alt="Close icon" />
        </div>
      </div>
      <div className="flex-1 w-full overflow-y-auto pb-4">{children}</div>
    </div>
  )
}

export default Modal
