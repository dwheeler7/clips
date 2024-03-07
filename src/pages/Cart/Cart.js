import { useState, useEffect, useRef } from 'react'
import * as ordersAPI from '../../utilities/orders-api'
import OrderDetail from '../../components/OrderDetail/OrderDetail'

export default function Cart({ cart, setCart }) {
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