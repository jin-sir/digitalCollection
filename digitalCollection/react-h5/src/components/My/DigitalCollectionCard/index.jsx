import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image } from "antd-mobile";
import styles from "./index.less";

export default function DigitalCollectionCard() {
  const navigate = useNavigate();
  const switchToGoodsPage = useCallback(() => {
    navigate("/goods?gId=3001");
  }, [navigate]);
  return (
    <Card
      onClick={switchToGoodsPage}
      title={
        <Image
          src={
            "https://file.18art.art/file/oss/nft/image/nft-goods/dece5a0e68b147a398f0ebd8aa55a199.jpg?style=st6"
          }
          fit="fill"
        />
      }
      style={{
        position: "relative",
        padding: 0,
      }}
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        padding: 0,
      }}
    >
      <div className={styles.desc_container}>
        <p className={styles.title}>禾下乘凉梦</p>
        <div className={styles.author}>
          aefwefew
        </div>
        <div className={styles.num}>
          共98
        </div>
      </div>
    </Card>
  );
}
