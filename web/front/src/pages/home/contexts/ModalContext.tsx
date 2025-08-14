import { createContext } from 'react'

export interface ModalContextType {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  modalTitle: string
  setModalTitle: (title: string) => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
