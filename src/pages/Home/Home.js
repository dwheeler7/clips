import { useState, useEffect } from 'react'
import * as clippingsAPI from '../../utilities/clippings-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'


const Home = ({ clippings, user }) => {
  
    
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
            <Link to={`/clipping/${clipping._id}`}>Learn more</Link>            
          </li>
        ))}
      </ul>            
    </div>
  )
}

export default Home
