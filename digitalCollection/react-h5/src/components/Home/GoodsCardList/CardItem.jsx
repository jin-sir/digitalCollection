import React, { useCallback } from "react";
import { Card, Image } from "antd-mobile";
import IconFont from "../../common/IconFont";
import styles from "./card.less";
import { useNavigate } from "react-router-dom";
import { basePath } from "../../../api";

export default function CardItem(props) {
  const navigate = useNavigate();
  const swichToPayPage = useCallback(() => {
    navigate("/goodsDetail", {
      state: {
        goodsId: props.cId,
        mode: "home",
        path: "/home",
      },
    });
  }, []);
  return (
    <Card
      title={
        <Image
          src={basePath + props.url}
          style={{ borderRadius: 25, transform: "translateY(-15px)" }}
          fit="fill"
        />
      }
      style={{
        padding: 0,
        margin: "29px 0",
      }}
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        padding: 0,
      }}
      onClick={swichToPayPage}
    >
      <div className={styles.desc_container}>
        <p className={styles.title}>{props.cName}</p>
        <div className={styles.num_box}>
          <span>限量</span>
          {props.circulation}份
        </div>
        <div className={styles.author}>
          <span>{props.auther}</span>
        </div>
        <div className={styles.price}>
          <i className={styles.common_icon}>
            <IconFont
              type="icon-jifen"
              style={{
                fontSize: "20px",
              }}
            />
          </i>
          {props.price}
        </div>
      </div>
    </Card>
  );
}
