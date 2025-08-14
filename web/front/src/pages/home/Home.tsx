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

  const modalContent =
    'Alors que l’édition 2024 était retombée dans ses travers originels concernant le nombre de réalisatrices sélectionnées dans la compétition officielle (quatre femmes sur 22 cinéastes), la compétition se révèle cette année un peu plus inclusive, malgré une présence masculine encore largement majoritaire. Sur les 22 réalisateurs en lice pour la Palme d’or, un peu moins d’un tiers sont des femmes (sept). La dernière année où aucune réalisatrice n’avait été selectionnée remonte à 2012.'

  return (
    <PageContainer>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, modalTitle, setModalTitle }}>
        <h1 className={styles.home_title}>Quoi de neuf ?</h1>
        <Latestrecap recapTitles={recapTitles} />
        <Modal title="Le recap" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RecapView recapTitle={modalTitle} recapContent={modalContent} />
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
