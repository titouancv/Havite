import { useState } from 'react'
import styles from './home.module.scss'
import Latestrecap from './components/latest-recap/LatestRecap'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  return (
    <PageContainer>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, modalTitle, setModalTitle }}>
        <h1 className={styles.home_title}>Quoi de neuf ?</h1>
        <Latestrecap />
        <Modal title={modalTitle} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Modal Title</h2>
          <p>This is a modal using a separate CSS file.</p>
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
