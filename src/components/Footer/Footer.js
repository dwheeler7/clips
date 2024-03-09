import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';

const Footer = ({ user }) => {
  const [showCart, setShowCart] = useState()

  useEffect(() => {
    setShowCart(user ? true : false)
  }, [user])

  return (
    <footer className={styles.footer}>      
      {showCart ? 
      <Button href="/cart" component={Link} to="/cart" variant="outlined" startIcon={<AddShoppingCartIcon />}>
      View cart
    </Button>
       
      : ''}
    </footer>
  )
}

export default Footer