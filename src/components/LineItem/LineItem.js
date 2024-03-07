import styles from './LineItem.module.scss';

export default function LineItem({ lineItem, isComplete, handleChangeQty }) {
return (
  <div className={styles.LineItem}>
    <div className="flex-ctr-ctr">{lineItem.item.plant}</div>    
    <div className={styles.qty} style={{ justifyContent: isComplete && 'center' }}>
      {!isComplete &&
        <button
          className="btn-xs"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
        >−</button>
      }
      <span>{lineItem.qty}</span>
      {!isComplete &&
        <button
          className="btn-xs"
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
        >+</button>
      }
    </div>    
  </div>
);
}