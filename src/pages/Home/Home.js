import { useState, useEffect } from 'react'
import * as clippingsAPI from '../../utilities/clippings-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'
import Clipping from '../../components/Clipping/Clipping'
import ClippingList from '../../components/ClippingList/ClippingList'
import Typography from '@mui/material/Typography';

const Home = ({ clippings, user }) => {
  
  return (
    <div>
      <Typography component="h1" variant="h5" align="center" >Hey {user.firstName}, how are you? Here are some plant clippings up for grabs in Seattle.</Typography>
      <ClippingList>
        {clippings.map((clipping) => (          
          <Clipping clipping={clipping} key={clipping._id} />                              
        ))}      
        </ClippingList>
    </div>
  )
}

export default Home
