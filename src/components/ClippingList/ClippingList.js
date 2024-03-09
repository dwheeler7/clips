import styles from './ClippingList.module.scss'

export default function ClippingList({children}) {
    return (
      <div className={styles.list}>
        {children}
      </div>
    )
  }