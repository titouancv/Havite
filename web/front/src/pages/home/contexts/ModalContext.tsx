import { createContext } from 'react'

export interface ModalContextType {
  isModalOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsModalOpen: (value: boolean) => void
  modalTitle: string
  // eslint-disable-next-line no-unused-vars
  setModalTitle: (title: string) => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
