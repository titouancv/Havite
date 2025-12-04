import { useState } from 'react'
import PageContainer from '../shared/components/PageContainer'
import Modal from '../shared/components/Modal'
import { ModalContext } from './contexts/ModalContext'
import RecapView from './components/RecapView'
import { useFetchAllRecapsOverview } from '../../services/recap.services'
import RecapCardList from './components/RecapCardList'
import { CATEGORIES, type RecapOverview } from '@/types'
import Input from '@/components/Input'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRecapOverview, setModalRecapOverview] = useState({
    id: '',
    articleId: '',
    title: '',
    summary: '',
    imageUrl: '',
    category: '',
    createdAt: 0,
    upVotes: 0,
    downVotes: 0,
  } as RecapOverview)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchAllRecapsOverview()

  const recapOverviews = data?.pages.flatMap((page) => page.items) || []

  const filteredRecaps = recapOverviews.filter((recap) => {
    const category = CATEGORIES[recap.category] || CATEGORIES['all']
    const matchesSearch = recap.summary
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' ||
      (category.id === 'all' && selectedCategory === 'news') ||
      recap.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageContainer>
      <ModalContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          modalRecapOverview,
          setModalRecapOverview,
        }}
      >
        <div className="flex flex-col items-start justify-start gap-4 w-full h-full overflow-hidden">
          <h1 className="font-bold">Quoi de neuf ?</h1>
          <Input
            type="text"
            placeholder="Rechercher un sujet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex gap-2 overflow-x-auto w-full scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Object.values(CATEGORIES).map((category, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div
                  className={`shrink-0 px-4 py-2 rounded-[20px] border text-sm cursor-pointer whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'text-gray-800'
                      : 'border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-400'
                  }`}
                  style={
                    selectedCategory === category.id
                      ? {
                          backgroundColor: category.color,
                          borderColor: category.color,
                          color: '#1f2937',
                        }
                      : undefined
                  }
                >
                  {category.label}
                </div>
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
