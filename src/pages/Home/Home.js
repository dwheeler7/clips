import React from 'react';

const Home = ({ clippings, user, setUser, setClippings }) => {
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
          </li>
        ))}
      </ul>            
    </div>
  )
}

export default Home
