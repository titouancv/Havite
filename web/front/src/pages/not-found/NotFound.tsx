import styles from './not-found.module.scss'
import Header from '../shared/components/header/Header'
import Footer from '../shared/components/footer/Footer'

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundWrapper}>
        <Header />
        <div className={styles.notFound_body}>
          <h1>404</h1>
          <p>Il semblerait que cette page n’existe pas.</p>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default NotFound
