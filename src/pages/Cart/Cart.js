import { useState, useEffect, useRef } from 'react'
import * as ordersAPI from '../../utilities/orders-api'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export default function Cart({ cart, setCart }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')


    async function handleChangeQty(itemId, newQty) {
        try {          
          const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty)
          setCart(updatedCart)        
        } catch(err) {
          console.error(err)
          setError('')
        }
      }

      async function handleCheckout() {
        try {
          await ordersAPI.checkout();
          setError('')
          navigate('/orders');
        } catch(err) {
          console.error("Checkout failed:", err)
          setError(err)
        }
      }

      useEffect(() => {
        async function fetchCart() {
          try {
            const cart = await ordersAPI.getCart()
            setCart(cart)
          } catch(err) {
            console.error("Failed to get cart", err)
          } finally {
            setIsLoading(false)
          }
        }
        fetchCart()
    }, [])

    if (isLoading) {
      return <div>Loading cart...</div>
  }

    return (
        <>
        <Typography variant="h1">Cart</Typography>
        {error && <Typography variant="body1" align="center" style={{color: "#DF4625"}}>{error}</Typography>}
        <OrderDetail
            order={cart}
            handleChangeQty={handleChangeQty}
            handleCheckout={handleCheckout}
          />
        </>      
    )
}