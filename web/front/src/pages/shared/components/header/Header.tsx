import styles from './header.module.scss'
import react from '../../../../assets/react.svg'

function Header() {
  return (
    <div className={styles.headerContainer}>
      <img src={react} alt="React logo" />
      <h1>Havite</h1>
    </div>
  )
}

export default Header
