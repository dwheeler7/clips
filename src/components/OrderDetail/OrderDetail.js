import styles from './OrderDetail.module.scss';
import LineItem from '../LineItem/LineItem';
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({ order, handleChangeQty }) {
    const navigate = useNavigate()
    if (!order) return null    

    const handleCheckout = async cart => {
      await ordersAPI.checkout(cart)
      navigate('/orders')
    }

    const lineItems = order.lineItems.map(item =>      
      <LineItem
        lineItem={item}
        handleChangeQty={handleChangeQty}
        key={item._id}
      />
    )

    return (
      <div>
        <div className={`${styles.lineItemContainer} flex-ctr-ctr flex-col scroll-y`}>
          {lineItems.length ?
            <>
              {lineItems}
              <section className={styles.total}>                  
                  <Button                 
                    onClick={() => handleCheckout(order)}
                    disabled={!lineItems.length}
                    variant="contained"
                  >Checkout</Button>
                
                <Typography variant="body2">Total clippings: {order.totalQty}</Typography>              
              </section>
            </>
            :
            <Typography variant="body1">Your cart is empty.</Typography>
          }
        </div>
      </div>
    );
  }