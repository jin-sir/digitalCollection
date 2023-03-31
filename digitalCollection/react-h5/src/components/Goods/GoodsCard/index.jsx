import React from "react";
import { Card, Image } from "antd-mobile";
import styles from "./index.less";

export default function index() {
  return (
    <Card
      title={
        <Image
          src={
            "https://file.18art.art/file/oss/nft/image/nft-goods/dece5a0e68b147a398f0ebd8aa55a199.jpg?style=st6"
          }
          style={{ borderRadius: 25, transform: 'translateY(-15px)' }}
          fit="fill"
        />
      }
      style={{
        padding: 0,
        margin: '29px 0'
      }}
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        padding: 0,
      }}
    >
      <div className={styles.desc_container}>
        <p className={styles.title}>
          禾下乘凉梦
        </p>
        <div className={styles.num_box}>
          <span>限量</span>
          784份
        </div>
        <div className={styles.num_box}>
          <span>编号</span>
          23
        </div>
        <div className={styles.author}>
          <span>出售人：{'杭州言赞文化'}</span>
        </div>
        <div className={styles.price}>
          <i className={styles.common_icon}>￥</i>
          98
        </div>
      </div>
    </Card>
  );
}
