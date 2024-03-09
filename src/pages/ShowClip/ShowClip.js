import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showClipping, updateLocalClippingsNum } from '../../utilities/clippings-service'
import * as ordersAPI from '../../utilities/orders-api'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'



export default function ShowClip({ cart, setCart, clippings, setClippings }) {
    console.log(clippings)
    const [clipping, setClipping] = useState(null)
    const { id } = useParams()

   /*-- Event Handlers --*/
   async function handleAddToOrder(item) {
    try {       
        if (!item.clippingsNum) throw new Error('There are not more clippings left')
        const updatedCart = await ordersAPI.addItemToCart(item._id)
        setCart(updatedCart)
        const updated = updateLocalClippingsNum(item._id, clippings, -1)
        setClippings(updated.clippings)
        setClipping(updated.clipping)        
    } catch(err) {
        console.error(err)
    }    
  }

    useEffect(() => {
        async function getClipping(clippingID) {            
            let foundClipping
            if (clippings.length) {
                console.log('should be pulling from local')
                foundClipping = clippings.find((obj) => obj._id === clippingID)
            } else {
                console.log('alas it is not')
                foundClipping = await showClipping(clippingID)
            }            
            setClipping(foundClipping)
        }
        if (id) {
            getClipping(id)
        }       
    }, [id])
       
    return (
        <>        
        {clipping && (
            <div>
                <Typography variant="h1">{clipping.plant}</Typography>
                <Typography variant="subtitle1">{clipping.description}</Typography>
                <Typography variant="body1">Available clippings: {clipping.clippingsNum}</Typography>
                <Button onClick={() => handleAddToOrder(clipping)} disabled={!clipping.clippingsNum} variant="contained">Add to cart</Button>                          
            </div>          
        )}          
        </>
    )
}