import styles from './page-container.module.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'

interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className={styles.pageContainerContainer}>
      <div className={styles.pageContainerWrapper}>
        <Header />
        <div className={styles.pageContainer_body}>{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default PageContainer
