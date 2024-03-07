import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ cart }) => {
  const [showCart, setShowCart] = useState()

  useEffect(() => {
    setShowCart(cart ? true : false)
  }, [cart])

  return (
    <footer>      
      {showCart ? <Link to="/cart">Cart</Link> : ''}
    </footer>
  )
}

export default Footer