import MessageInfoBoxComponent from '../../../components/MessageInfoBox'
import Sources from './Sources'
import { useFetchRecapByArticleId } from '../../../services/recap.services'
import { CATEGORIES, type RecapOverview } from '@/types'
import { testImageURL } from './RecapCard'
import { useEffect, useState } from 'react'
import Social from './Social'
import Comments from './Comments'

interface RecapViewProps {
  recapOverview: RecapOverview
}

const RecapView: React.FC<RecapViewProps> = ({ recapOverview }) => {
  const recap = useFetchRecapByArticleId(recapOverview.articleId)

  const imageUrl = recap.article?.imageUrl || recapOverview.imageUrl

  const [isImageValid, setIsImageValid] = useState(false)

  useEffect(() => {
    testImageURL(imageUrl).then((isValid) => {
      setIsImageValid(isValid)
    })
  }, [imageUrl])

  const categoryName =
    CATEGORIES[recap.article?.category || recapOverview.category]?.label ||
    'Actualité'

  return (
    <div className="grid md:grid-cols-[60%_35%] items-start justify-between w-full grid-cols-1 md:gap-6">
      {isImageValid && (
        <img
          src={imageUrl}
          alt=""
          className="col-span-full w-full h-[250px] object-cover rounded mb-4"
        />
      )}
      <div className="flex flex-col items-start justify-start gap-4">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-center gap-2 text-sm text-gray-800 mb-2">
            <span className="font-semibold uppercase tracking-wide">
              {categoryName}
            </span>
            <span>•</span>
            <span>{recap.article?.readingTime} min de lecture</span>
          </div>
        </div>
        <p>{recap.article?.content}</p>
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <Social recapId={recap.id} />
        <MessageInfoBoxComponent
          content="Article généré par l'intelligence artificielle"
          type="info"
        />
        <Sources sources={recap.sources} />
      </div>
      <div className="col-span-full w-full pt-4">
        <Comments recapId={recap.id} />
      </div>
    </div>
  )
}

export default RecapView
