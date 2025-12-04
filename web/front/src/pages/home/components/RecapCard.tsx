import { useContext, useEffect, useState } from 'react'
import { Newspaper } from 'lucide-react'
import { ModalContext } from '../contexts/ModalContext'
import { CATEGORIES, type RecapOverview } from '@/types'
import { formatDate } from '@/utils/date'
import Social from './Social'

// Map categories to icons

type RecapCardProps = {
  recap: RecapOverview
}

export const testImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

function RecapCard({ recap }: RecapCardProps) {
  const context = useContext(ModalContext)
  const [isImageValid, setIsImageValid] = useState(false)

  useEffect(() => {
    testImageURL(recap.imageUrl).then(setIsImageValid)
  }, [recap.imageUrl])

  if (!context) return null

  const { setIsModalOpen, setModalRecapOverview } = context

  const handleClick = () => {
    setIsModalOpen(true)
    setModalRecapOverview({
      ...recap,
    })
  }

  const Icon = CATEGORIES[recap.category]?.icon || Newspaper
  const categoryName = CATEGORIES[recap.category]?.label || 'Actualité'
  const categoryColor = CATEGORIES[recap.category]?.color || '#BFDBFE'

  return (
    <div
      className="flex flex-row items-start gap-3 w-full p-3 rounded-none bg-transparent cursor-pointer text-left border-none border-b border-gray-300 transition-colors text-gray-800 hover:bg-gray-200 hover:text-gray-900"
      onClick={handleClick}
      aria-label={`Voir le récapitulatif : ${recap.title}`}
    >
      <div className="shrink-0 pt-1">
        <div
          className="w-10 h-10 rounded flex items-center justify-center text-gray-800"
          style={{
            backgroundColor: categoryColor,
            borderColor: categoryColor,
            color: '#1f2937',
          }}
        >
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex items-center gap-1 text-[0.95rem] leading-tight">
          <span className="font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
            {categoryName}
          </span>
          <span className="text-gray-800">·</span>
          <span className="text-gray-800 font-normal whitespace-nowrap">
            {formatDate(new Date(recap.createdAt))}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-base text-gray-800 leading-normal m-0 break-words">
            {recap.summary}
          </p>
          {isImageValid && (
            <div className="w-2/5 rounded overflow-hidden border border-gray-400 mt-2">
              <img
                src={recap.imageUrl}
                alt=""
                className="w-full h-auto max-h-[150px] object-cover block"
              />
            </div>
          )}
        </div>

        <Social recapId={recap.id} />
      </div>
    </div>
  )
}

export default RecapCard
