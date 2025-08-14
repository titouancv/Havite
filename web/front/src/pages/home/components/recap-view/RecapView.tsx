import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'

interface RecapViewProps {
  recapTitle: string
  recapContent: string
}

const RecapView: React.FC<RecapViewProps> = ({ recapTitle, recapContent }) => {
  const sources = [
    { name: 'Source 1', link: 'https://youtube.com/' },
    { name: 'Source 2', link: 'https://example.com/source2' },
    { name: 'Source 3', link: 'https://example.com/source3' },
  ]
  return (
    <div className={styles.recapView}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <h3>{recapTitle}</h3>
        </div>
        <p>{recapContent}</p>
      </div>
      <div className={styles.actions}>
        <MessageInfoBoxComponent
          content="Article généré par l’intelligence artificielle"
          type="info"
        />
        <Sources sources={sources} />
      </div>
    </div>
  )
}

export default RecapView
