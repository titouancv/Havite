import { useState } from 'react'
import styles from './home.module.scss'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'
import Latestrecap from './components/latest-recap/LatestRecap'
import Modal from '../shared/components/modal/Modal'

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <Header />
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <div className={styles.home_body}>
          <h1>Quoi de neuf ?</h1>
          <Latestrecap />
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Oups...">
            <h2>Modal Title</h2>
            <p>This is a modal using a separate CSS file.</p>
          </Modal>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
