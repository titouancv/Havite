import Button from '@/components/button/Button'
import styles from './sources.module.scss'
import type { Sources as SourcesType } from '@/types'

interface SourcesProps {
  sources?: SourcesType[]
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
          <p>{source.media.name}</p>
          <Button variant="primary" onClick={() => openSourceLink(source.url)}>
            Voir l'article
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Sources
