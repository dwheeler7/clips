import { useState, useEffect } from 'react'
import * as clippingsAPI from '../../utilities/clippings-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'
import Clipping from '../../components/Clipping/Clipping'
import ClippingList from '../../components/ClippingList/ClippingList'

const Home = ({ clippings, user }) => {
  
  return (
    <div>
      <h1>Plant Clippings</h1>      
      {user && <p>Welcome, {user.firstName}!</p>}   
      <ClippingList>
        {clippings.map((clipping) => (          
          <Clipping clipping={clipping} key={clipping._id} />                              
        ))}      
        </ClippingList>
    </div>
  )
}

export default Home
