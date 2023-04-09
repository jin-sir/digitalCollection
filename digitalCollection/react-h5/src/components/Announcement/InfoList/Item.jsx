import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './item.less'
import moment from 'moment'
export default function Item(props) {
  const navigate = useNavigate()
  const switchToDetail = useCallback(() => {
    navigate('/announcementDetail/'+props.id)
  }, [navigate])
  return (
    <div className={styles.item} onClick={switchToDetail}>
        <div className={styles.item_left}>
            <div className={styles.top}>{props.title}</div>
            <div className={styles.bottom}>
                <span className={styles.tag}>{props.tag}</span>
                <span className={styles.createAt}>{moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
        </div>
        <div className={styles.item_rigth}>{props.tag}</div>
    </div>
  )
}
