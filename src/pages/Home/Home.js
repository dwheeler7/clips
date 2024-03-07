import { useState, useEffect } from 'react'
import * as clippingsAPI from '../../utilities/clippings-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ clippings, user, setUser, setClippings }) => {
    // const [cart, setCart] = useState(null)
    const navigate = useNavigate()

   /*-- Event Handlers --*/
  //  async function handleAddToOrder(itemId) {
  //   const updatedCart = await ordersAPI.addItemToCart(itemId);
  //   setCart(updatedCart);
  // }

  // async function handleChangeQty(itemId, newQty) {
  //   const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
  //   setCart(updatedCart);
  // }

  // async function handleCheckout() {
  //   await ordersAPI.checkout();
  //   navigate('/orders');
  // }

  // useEffect(function() {
  //   async function getCart() {
  //     const cart = await ordersAPI.getCart()
  //     setCart(cart);
  //   }
  //   getCart()
  // }, [])


  return (
    <div>
      <h1>Plant Clippings</h1>      
      {user && <p>Welcome, {user.firstName}!</p>}
      
      <ul>
        {clippings.map((clipping, index) => (
          <li key={index}>
            <h2>{clipping.plant}</h2>
            <p>Number of Clippings: {clipping.clippingsNum}</p>
            <p>Description: {clipping.description || 'No description available.'}</p>   
            {/* <button onClick={() => handleAddToOrder(clipping._id)}>ADD</button> */}
            <Link to={`/clipping/${clipping._id}`}>Learn more</Link>            
          </li>
        ))}
      </ul>            
    </div>
  )
}

export default Home
