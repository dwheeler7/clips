import { useState, useEffect, useRef } from 'react'
import * as clippingsAPI from '../../utilities/clippings-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'
import MenuList from '../../components/MenuList/MenuList'
import OrderDetail from '../../components/OrderDetail/OrderDetail'

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([])
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()

  useEffect(function() {
    async function getItems() {
      const items = await clippingsAPI.getClippings();
      setMenuItems(items);
    }
    getItems()
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart)
    }
    getCart()
  }, [])  

  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addItemToCart(itemId)
    setCart(updatedCart)
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty)
    setCart(updatedCart)
}

  return (
    <main>
      <aside>                
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>        
      </aside>
      <MenuList
        menuItems={menuItems}
        handleAddToOrder={ordersService.handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}       
      />
    </main>
  )
}