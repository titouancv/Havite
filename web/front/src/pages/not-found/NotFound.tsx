import styles from './not-found.module.scss'
import PageContainer from '../shared/components/page-container/PageContainer'

function NotFound() {
  return (
    <PageContainer>
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>Il semblerait que cette page n’existe pas.</p>
      </div>
    </PageContainer>
  )
}

export default NotFound
