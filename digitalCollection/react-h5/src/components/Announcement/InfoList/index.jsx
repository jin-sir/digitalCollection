import React from 'react'
import Item from './Item'

export default function InfoList(props) {
    const list = props.datas.map(item => <Item key={item.id} {...item} />)
  return (
    <div style={{
        margin: '0 16px'
    }}>
        {list}
    </div>
  )
}
