import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image } from "antd-mobile";
import IconFont from "../../common/IconFont";
import styles from "./index.less";

export default function GoodsCard(props) {
  const navigate = useNavigate();
  console.log(props)
  const switchToGoodsPage = useCallback(() => {
    navigate("/goods", {
      state: {
        cId: props.cId,
        cName: props.cName,
        circulation: props.circulation,
        sumstock: props.sumstock
      }
    });
  }, [navigate]);
  return (
    <Card
      onClick={switchToGoodsPage}
      title={<Image src={props.url} fit="fill" />}
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
      <div className={styles.circulation}>流通量: {props.sumstock}</div>
      <div className={styles.desc_container}>
        <p className={styles.title}>{props.cName}</p>
        <div className={styles.num_box}>
          <span>限量</span>
          {props.circulation}份
        </div>
        <div className={styles.price}>
          限价:
          <i className={styles.common_icon}>
            <IconFont
              type="icon-jifen"
              style={{
                fontSize: "14px",
              }}
            />
          </i>
          {props.limit_price}
        </div>
      </div>
    </Card>
  );
}
