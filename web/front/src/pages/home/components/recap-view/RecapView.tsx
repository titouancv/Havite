import { useQuery } from '@tanstack/react-query'
import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import type { RecapOverview } from '../recap-card/RecapCard'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'
import { useTRPC } from '../../../../utils/trpc'

interface RecapViewProps {
  recapOverview: RecapOverview
}

const RecapView: React.FC<RecapViewProps> = ({ recapOverview }) => {
  const trpc = useTRPC()
  const { data: recap } = useQuery(trpc.recap.byId.queryOptions(recapOverview.id))

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
