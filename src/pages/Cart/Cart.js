import { useState, useEffect, useRef } from 'react'
import * as ordersAPI from '../../utilities/orders-api'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
    const navigate = useNavigate()
    async function handleChangeQty(itemId, newQty) {
        const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
        setCart(updatedCart);
      }
    
      async function handleCheckout() {
        await ordersAPI.checkout();
        navigate('/orders');
      }

      async function handleAddToOrder(itemId) {
        const updatedCart = await ordersAPI.addItemToCart(itemId);
        setCart(updatedCart);
      }

      useEffect(() => {
        async function getCart() {
            const cart = await ordersAPI.getCart()
            setCart(cart);
        }
        getCart()
    }, [])

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