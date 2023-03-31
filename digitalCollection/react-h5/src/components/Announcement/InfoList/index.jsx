import React from 'react'
import Item from './Item'

export default function InfoList() {
    const datas = [
        {
            infoId: '184239',
            desc: '【十八数藏活动公告】红钻抽签活动即将上线！',
            tag: '活动公告',
            createAt: '2023-03-28 23:06'
        },
        {
            infoId: '744211',
            desc: '【十八数藏活动公告】红钻抽签活动即将上线！',
            tag: '活动公告',
            createAt: '2023-03-28 23:06'
        },
        {
            infoId: '12651',
            desc: '【十八数藏活动公告】红钻抽签活动即将上线！',
            tag: '活动公告',
            createAt: '2023-03-28 23:06'
        },
        {
            infoId: '426363',
            desc: '【十八数藏活动公告】红钻抽签活动即将上线！',
            tag: '活动公告',
            createAt: '2023-03-28 23:06'
        },
    ]
    const list = datas.map(item => <Item key={item.infoId} {...item} />)
  return (
    <div style={{
        margin: '0 16px'
    }}>
        {list}
    </div>
  )
}
