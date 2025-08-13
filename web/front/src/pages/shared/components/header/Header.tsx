import styles from './header.module.scss'
import logoMonogram from '../../../../assets/logoMonogram.svg'
import { Link } from '@tanstack/react-router'

function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link to="/">
        <div className={styles.homeButton}>
          <img className={styles.logo} src={logoMonogram} alt="Havite logo" />
          <h1>HAVITE</h1>
        </div>
      </Link>
    </div>
  )
}

export default Header
