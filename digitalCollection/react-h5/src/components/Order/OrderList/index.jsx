import React from 'react'
import OrderItem from '../OrderItem'
import styles from './index.less'

export default function OrderList() {
    const order_list = [1,2,3,4,5,6,7].map(it => (<OrderItem key={it} />))
  return (
    <div className={styles.order_list}>{order_list}</div>
  )
}
