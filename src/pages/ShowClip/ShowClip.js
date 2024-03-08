import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showClipping } from '../../utilities/clippings-service'
import * as ordersAPI from '../../utilities/orders-api'

export default function ShowClip({ cart, setCart }) {
    const [clipping, setClipping] = useState(null)
    const { id } = useParams()

   /*-- Event Handlers --*/
   async function handleAddToOrder(item) {
    try {        
        if (!item.clippingsNum) throw new Error('There are not more clippings left')
        const updatedCart = await ordersAPI.addItemToCart(item._id)
        setCart(updatedCart)
        item.clippingsNum -= 1
        setClipping({...item})
    } catch(err) {
        console.error(err)
    }    
  }

    useEffect(() => {
        async function getClipping(clippingID) {
            const foundClipping = await showClipping(clippingID)            
            setClipping(foundClipping)
        }
        if (id) {
            getClipping(id)
        }       
    }, [id])
       
    return (
        <>
        <h1>Clipping</h1>
        {clipping && (
            <div>
                <h2>{clipping.plant}</h2>
                <p>Number of Clippings: {clipping.clippingsNum}</p>
                <p>Description: {clipping.description || 'No description available.'}</p>   
                <button onClick={() => handleAddToOrder(clipping)} disabled={!clipping.clippingsNum}>ADD</button>
            </div>          
        )}          
        </>
    )
}