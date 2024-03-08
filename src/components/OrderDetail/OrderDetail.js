import styles from './OrderDetail.module.scss';
import LineItem from '../LineItem/LineItem';
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'

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
        isComplete={order.isComplete}
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
                {order.isComplete ?
                  <span className={styles.right}>TOTAL&nbsp;&nbsp;</span>
                  :
                  <button
                    className="btn-sm"
                    onClick={() => handleCheckout(order)}
                    disabled={!lineItems.length}
                  >CHECKOUT</button>
                }
                <span>{order.totalQty}</span>                
              </section>
            </>
            :
            <div className={styles.hungry}>Your cart is empty.</div>
          }
        </div>
      </div>
    );
  }