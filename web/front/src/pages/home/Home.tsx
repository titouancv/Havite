import styles from './home.module.scss'
import Latestrecap from './components/latest-recap/LatestRecap'
import PageContainer from '../shared/components/page-container/PageContainer'

function Home() {
  return (
    <PageContainer>
      <h1 className={styles.home_title}>Quoi de neuf ?</h1>
      <Latestrecap />
    </PageContainer>
  )
}

export default Home
