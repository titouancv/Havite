import styles from './header.module.scss'
import react from '../../../../assets/react.svg'
import { Link } from '@tanstack/react-router'

function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={react} alt="React logo" />
          <h1>HAVITE</h1>
        </div>
      </Link>
    </div>
  )
}

export default Header
