import { useState } from 'react'
import styles from './home.module.scss'
import Latestrecap from './components/latest-recap/LatestRecap'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/recap-view/RecapView'
import ButtonComponent from '../../components/button/ButtonComponent'
import { useTRPC } from '../../utils/trpc'
import { useMutation, useQuery } from '@tanstack/react-query'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRecapOverview, setModalRecapOverview] = useState({ id: '', title: '' })

  const trpc = useTRPC()

  const sourceQuery = useMutation(trpc.source.create.mutationOptions())
  const mediaQuery = useMutation(trpc.media.create.mutationOptions())
  const recapQuery = useMutation(trpc.recap.create.mutationOptions())

  const createRecap = async () => {
    const media = await mediaQuery.mutateAsync({
      url: 'https://example.com/media',
    })

    const source = await sourceQuery.mutateAsync({
      url: 'https://example.com/source',
      mediaId: media?.id,
    })

    await recapQuery.mutate({
      title: 'Mon premier recap',
      content: 'Ceci est un test',
      sourceIds: [source.id],
    })
  }

  const { data: recapOverviews = [] } = useQuery(trpc.recap.allOverview.queryOptions())

  return (
    <PageContainer>
      <ModalContext.Provider
        value={{ isModalOpen, setIsModalOpen, modalRecapOverview, setModalRecapOverview }}
      >
        <ButtonComponent content="test" hanndleClick={createRecap} />
        <h1 className={styles.home_title}>Quoi de neuf ?</h1>
        <Latestrecap recapOverviews={recapOverviews} />
        <Modal title="Le recap" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RecapView recapOverview={modalRecapOverview} />
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
