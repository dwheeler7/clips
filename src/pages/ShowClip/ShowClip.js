import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showClipping } from '../../utilities/clippings-service'

export default function ShowClip() {
    const [clipping, setClipping] = useState(null)
    const { id } = useParams()    

    useEffect(() => {
        async function getClipping(clippingID) {
            const foundClipping = await showClipping(clippingID)            
            setClipping(foundClipping)
        }
        if (id) {
            getClipping(id)
        }
    }, [id]) // Add clippingID as a dependency to useEffect
       
    return (
        <>
        <h1>Clipping</h1>
        {clipping && (
            <div>
                {/* Display your clipping information here */}
                <p>{clipping.plant}</p>
            </div>
        )}
        </>
    )
}