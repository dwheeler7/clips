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
    //   setActiveCat(categoriesRef.current[0]);
    }
    getItems();
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);
  // Providing an empty 'dependency array'
  // results in the effect running after
  // the FIRST render only

  /*-- Event Handlers --*/
  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout(cartArg) {    
    await ordersAPI.checkout(cartArg)
    navigate('/orders')
  }

  return (
    <main>
      <aside>                
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        {/* <UserLogOut user={user} setUser={setUser} /> */}
      </aside>
      <MenuList
        menuItems={menuItems}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  )
}