import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import type { RecapOverview } from '../recap-card/RecapCard'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'
import { FetchRecapById } from '../../../../services/recap.services'

interface RecapViewProps {
  recapOverview: RecapOverview
}

export interface Recap {
  id: string
  title: string
  content: string
  sources: {
    id: string
    url: string
    mediaName: string
  }[]
}

const RecapView: React.FC<RecapViewProps> = ({ recapOverview }) => {
  const recap = FetchRecapById(recapOverview.id)

  return (
    <div className={styles.recapView}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <h3>{recapOverview.title}</h3>
        </div>
        <p>{recap?.content}</p>
      </div>
      <div className={styles.actions}>
        <MessageInfoBoxComponent
          content="Article généré par l’intelligence artificielle"
          type="info"
        />
        <Sources sources={recap?.sources} />
      </div>
    </div>
  )
}

export default RecapView
