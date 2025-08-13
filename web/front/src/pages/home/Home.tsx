import styles from './home.module.scss'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import Latestrecap from './components/latest-recap/LatestRecap'

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <Header />
        <div className={styles.home_body}>
          <h1>Quoi de neuf ?</h1>
          <Latestrecap />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
