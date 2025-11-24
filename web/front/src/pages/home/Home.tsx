import { useState } from 'react'
import styles from './home.module.scss'
import PageContainer from '../shared/components/page-container/PageContainer'
import Modal from '../shared/components/modal/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/recap-view/RecapView'
import { useFetchAllRecapsOverview } from '../../services/recap.services'
import RecapCardList from './components/recap-card-list/RecapCardList'
import { CATEGORIES, type RecapOverview } from '@/types'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRecapOverview, setModalRecapOverview] = useState({
    id: '',
    articleId: '',
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    createdAt: 0,
    upVotes: 0,
    downVotes: 0,
  } as RecapOverview)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchAllRecapsOverview()

  const recapOverviews = data?.pages.flatMap((page) => page.items) || []

  const filteredRecaps = recapOverviews.filter((recap) => {
    const category = CATEGORIES[recap.category] || CATEGORIES['all']
    const matchesSearch = recap.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' ||
      (category.id === 'all' && selectedCategory === 'news') ||
      recap.category === selectedCategory
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
            {Object.values(CATEGORIES).map((category, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                style={
                  selectedCategory === category.id
                    ? {
                        backgroundColor: category.color,
                        borderColor: category.color,
                        color: '#1f2937', // Dark gray for readability on pastel
                      }
                    : undefined
                }
              >
                {category.label}
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
