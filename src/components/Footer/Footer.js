import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = ({ cart }) => {
  const [showCart, setShowCart] = useState()

  useEffect(() => {
    setShowCart(cart ? true : false)
  }, [cart])

  return (
    <footer className={styles.footer}>      
      {showCart ? <Link to="/cart">Cart</Link> : ''}
    </footer>
  )
}

export default Footer