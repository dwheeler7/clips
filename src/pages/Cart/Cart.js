import { useState, useEffect, useRef } from 'react'
import * as ordersAPI from '../../utilities/orders-api'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    async function handleChangeQty(itemId, newQty) {
        try {          
          const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty)
          setCart(updatedCart)
        } catch(err) {
          console.error(err)
        }
      }

      async function handleCheckout() {
        try {
          await ordersAPI.checkout();
          navigate('/orders');
        } catch(err) {
          console.error("Checkout failed:", err)
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
        <h1>Cart</h1>
        <OrderDetail
            order={cart}
            handleChangeQty={handleChangeQty}
            handleCheckout={handleCheckout}
          />
        </>      
    )
}