import React, { useCallback } from "react";
import { Card, Image } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import styles from "./index.less";

export default function OrderItem() {
  const switchToOrderDetail = useCallback(() => {});
  return (
    <Card
      onClick={switchToOrderDetail}
      title={
        <div className={styles.header}>
          <span>转入成功</span>
          <RightOutline />
        </div>
      }
      style={{
        position: "relative",
        padding: 0,
        marginTop: "10px",
      }}
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        padding: 0,
        display: "block",
      }}
    >
      <div className={styles.order_info}>
        <Image
          width={50}
          style={{ borderRadius: 8 }}
          src={
            "https://file.18art.art/file/oss/nft/image/nft-goods/dece5a0e68b147a398f0ebd8aa55a199.jpg?style=st6"
          }
          fit="fill"
        />
        <div className={styles.order_info_box}>
          <div className={styles.top}>
            <span>禾下乘凉梦</span>
            <span className={styles.price}>
              <i>￥</i>200
            </span>
          </div>
          <div className={styles.bottom}>
            <span className={styles.number}>
              <i>#2323</i>/232323
            </span>
            <span className={styles.createAt}>2023/03/25 22:14:53</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
