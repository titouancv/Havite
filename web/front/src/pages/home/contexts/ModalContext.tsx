import { createContext } from 'react'
import type { RecapOverview } from '../components/recap-card/RecapCard'

export interface ModalContextType {
  isModalOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsModalOpen: (value: boolean) => void
  modalRecapOverview: RecapOverview
  // eslint-disable-next-line no-unused-vars
  setModalRecapOverview: (recapOverview: RecapOverview) => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
