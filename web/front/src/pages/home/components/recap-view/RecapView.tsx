import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'
import { useFetchRecapByArticleId } from '../../../../services/recap.services'
import { CATEGORIES, type RecapOverview } from '@/types'
import { testImageURL } from '../recap-card/RecapCard'
import { useEffect, useState } from 'react'
import Social from '../social/Social'
import Comments from '../comments/Comments'

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
    <div className={styles.recapView}>
      {isImageValid && (
        <img src={imageUrl} alt="" className={styles.recapImage} />
      )}
      <div className={styles.content}>
        <div className={styles.content_header}>
          <div className={styles.meta}>
            <span className={styles.category}>{categoryName}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readingTime}>
              {recap.article?.readingTime} min de lecture
            </span>
          </div>
        </div>
        <p>{recap.article?.content}</p>
      </div>
      <div className={styles.actions}>
        <Social recapId={recap.id} />
        <MessageInfoBoxComponent
          content="Article généré par l’intelligence artificielle"
          type="info"
        />
        <Sources sources={recap.sources} />
      </div>
      <div className={styles.commentsSection}>
        <Comments recapId={recap.id} />
      </div>
    </div>
  )
}

export default RecapView
