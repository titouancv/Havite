import Button from '@/components/button/Button'
import styles from './sources.module.scss'

interface SourcesData {
  id: string
  url: string
  mediaName: string
}

interface SourcesProps {
  sources?: SourcesData[]
}

const Sources: React.FC<SourcesProps> = ({ sources = [] }) => {
  const openSourceLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.sources}>
      <h2>Sources</h2>
      {sources.map((source, index) => (
        <div key={index} className={styles.sources_item}>
          <p>{source.mediaName}</p>
          <Button
            variant="primary"
            onClick={() => openSourceLink(source.url)}
          >
            Voir l'article
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Sources
