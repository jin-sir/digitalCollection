import React from "react";
import { Card, Image } from "antd-mobile";
import IconFont from "../../common/IconFont";
import styles from "./index.less";

export default function index(props) {
  const goodsInfo = props.goodsInfo;
  return (
    <Card
      title={
        <Image
          src={goodsInfo.url}
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
    >
      <div className={styles.desc_container}>
        <p className={styles.title}>{goodsInfo.cName}</p>
        <div className={styles.num_box}>
          <span>限量</span>
          {goodsInfo.circulation}份
        </div>
        {props.mode === "home" ? (
          ""
        ) : (
          <div className={styles.num_box}>
            <span>编号</span>
            {goodsInfo.seri_num}
          </div>
        )}
        <div className={styles.author}>
          {props.mode === "market" ? (
            <span>出售人：{goodsInfo.auther}</span>
          ) : (
            ""
          )}
        </div>
        {props.mode !== "my_digitalCollection" ? (
          <div className={styles.price}>
            <i className={styles.common_icon}>
              <IconFont
                style={{
                  fontSize: "18px",
                }}
                type="icon-jifen"
              />
            </i>
            {goodsInfo.price}
          </div>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}
