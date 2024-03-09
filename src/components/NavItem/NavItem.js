import styles from './NavItem.module.scss'

export default function NavItem({children}) {
    return (
      <div className={styles.navItem}>
        {children}
      </div>
    )
  }