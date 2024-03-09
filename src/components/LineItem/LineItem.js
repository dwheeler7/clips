import styles from './LineItem.module.scss';

export default function LineItem({ lineItem, handleChangeQty }) {  
  console.log(lineItem)
return (
  <div>
    <div>{lineItem.item.plant}</div>   
    <button
          onClick={() => handleChangeQty(lineItem.item, lineItem.qty - 1)}
        >−</button>
        <span>{lineItem.qty}</span>
        <button
          onClick={() => handleChangeQty(lineItem.item, lineItem.qty + 1)}
        >+</button>
  </div>
)
}