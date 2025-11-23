import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import type { RecapOverview } from '../recap-card/RecapCard'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'
import { useFetchRecapById } from '../../../../services/recap.services'

interface RecapViewProps {
  recapOverview: RecapOverview
}

export interface Recap {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
  relatedQuestions: string[]
  sources: {
    id: string
    url: string
    mediaName: string
  }[]
}

const RecapView: React.FC<RecapViewProps> = ({ recapOverview }) => {
  const recap = useFetchRecapById(recapOverview.id)
  const imageUrl = recap.imageUrl || recapOverview.imageUrl

  return (
    <div className={styles.recapView}>
      {imageUrl && <img src={imageUrl} alt="" className={styles.recapImage} />}
      <div className={styles.content}>
        <div className={styles.content_header}>
          <div className={styles.meta}>
            <span className={styles.category}>{recap.category || recapOverview.category}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readingTime}>
              {recap.readingTime || recapOverview.readingTime} min de lecture
            </span>
          </div>
          <h3>{recapOverview.title}</h3>
        </div>
        <p>{recap.content}</p>
      </div>
      <div className={styles.actions}>
        <MessageInfoBoxComponent
          content="Article généré par l’intelligence artificielle"
          type="info"
        />
        <Sources sources={recap.sources} />
      </div>
    </div>
  )
}

export default RecapView
