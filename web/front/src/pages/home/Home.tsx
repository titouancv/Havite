import { useState } from 'react'
import styles from './home.module.scss'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/recap-view/RecapView'
import { useFetchAllRecapsOverview } from '../../services/recap.services'
import RecapCardList from './components/recap-card-list/RecapCardList'
import type { RecapOverview } from '@/types'

const CATEGORIES = ['Tous', 'Technologie', 'Finance', 'Hardware', 'Sécurité', 'Transport']

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRecapOverview, setModalRecapOverview] = useState({
    id: '',
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    createdAt: 0,
  } as RecapOverview)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchAllRecapsOverview()

  const recapOverviews = data?.pages.flatMap((page) => page.items) || []

  const filteredRecaps = recapOverviews.filter((recap) => {
    const matchesSearch = recap.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || recap.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageContainer>
      <ModalContext.Provider
        value={{ isModalOpen, setIsModalOpen, modalRecapOverview, setModalRecapOverview }}
      >
        <div className={styles.home}>
          <h1 className={styles.home_title}>Quoi de neuf ?</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Rechercher un sujet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filtersContainer}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <RecapCardList
            recapOverviews={filteredRecaps}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
        <Modal
          title={modalRecapOverview.title}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <RecapView recapOverview={modalRecapOverview} />
        </Modal>
      </ModalContext.Provider>
    </PageContainer>
  )
}

export default Home
