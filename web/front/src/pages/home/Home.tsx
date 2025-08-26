import { useState } from 'react'
import styles from './home.module.scss'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/recap-view/RecapView'
import { FetchAllRecapsOverview } from '../../services/recap.services'
import RecapCardList from './components/recap-card-list/RecapCardList'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRecapOverview, setModalRecapOverview] = useState({ id: '', title: '' })

  const recapOverviews = FetchAllRecapsOverview()

  return (
    <PageContainer>
      <ModalContext.Provider
        value={{ isModalOpen, setIsModalOpen, modalRecapOverview, setModalRecapOverview }}
      >
        <h1 className={styles.home_title}>Quoi de neuf ?</h1>
        <RecapCardList recapOverviews={recapOverviews} />
        <Modal title="Le recap" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RecapView recapOverview={modalRecapOverview} />
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
