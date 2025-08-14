import MessageInfoBoxComponent from '../../../../components/message-info-box/MessageInfoBox'
import Sources from '../sources/Sources'
import styles from './recap-view.module.scss'

interface RecapViewProps {
  recapTitle: string
}

const RecapView: React.FC<RecapViewProps> = ({ recapTitle }) => {
  const sources = [
    { name: 'Source 1', link: 'https://youtube.com/' },
    { name: 'Source 2', link: 'https://example.com/source2' },
    { name: 'Source 3', link: 'https://example.com/source3' },
  ]

  const recapContent =
    'Alors que l’édition 2024 était retombée dans ses travers originels concernant le nombre de réalisatrices sélectionnées dans la compétition officielle (quatre femmes sur 22 cinéastes), la compétition se révèle cette année un peu plus inclusive, malgré une présence masculine encore largement majoritaire. Sur les 22 réalisateurs en lice pour la Palme d’or, un peu moins d’un tiers sont des femmes (sept). La dernière année où aucune réalisatrice n’avait été selectionnée remonte à 2012.'

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
