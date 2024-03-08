import styles from './OrderDetail.module.scss';
import LineItem from '../LineItem/LineItem';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
    if (!order) return null
    console.log(order)

    const lineItems = order.lineItems.map(item =>
      <LineItem
        lineItem={item}
        isComplete={order.isComplete}
        handleChangeQty={handleChangeQty}
        key={item._id}
      />
    );

    return (
      <div className={styles.OrderDetail}>
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
                    onClick={handleCheckout}
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