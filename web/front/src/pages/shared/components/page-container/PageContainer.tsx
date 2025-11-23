import styles from './page-container.module.scss'
import Header from '../header/Header'

interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className={styles.pageContainerContainer}>
      <div className={styles.pageContainerWrapper}>
        <Header />
        <div className={styles.pageContainer_body}>{children}</div>
      </div>
    </div>
  )
}

export default PageContainer
