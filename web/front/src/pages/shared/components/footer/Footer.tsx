import { Link } from '@tanstack/react-router'
import styles from './footer.module.scss'

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer_links}>
        <Link to="/about">À propos de nous</Link>
        <a href="https://x.com/HaviteApp">X account</a>
        <a href="https://www.linkedin.com/company/havite">LinkedIn account</a>
      </div>
    </div>
  )
}

export default Footer
