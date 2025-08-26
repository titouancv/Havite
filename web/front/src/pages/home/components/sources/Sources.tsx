import ButtonComponent from '../../../../components/button/ButtonComponent'
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
          <ButtonComponent
            isPrimary={true}
            hanndleClick={() => openSourceLink(source.url)}
            content="Voir l'article"
          />
        </div>
      ))}
    </div>
  )
}

export default Sources
