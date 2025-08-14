import { useState } from 'react'
import styles from './home.module.scss'
import Latestrecap from './components/latest-recap/LatestRecap'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/recap-view/RecapView'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const recapTitles = [
    'Festival de Cannes: statistiquement, quel est le portrait-robot du lauréat de la Palme d or?',
    'Recap 2',
    'Recap 3',
    'Recap 4',
    'Recap 5',
  ]

  return (
    <PageContainer>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, modalTitle, setModalTitle }}>
        <h1 className={styles.home_title}>Quoi de neuf ?</h1>
        <Latestrecap recapTitles={recapTitles} />
        <Modal title="Le recap" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RecapView recapTitle={modalTitle} />
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
