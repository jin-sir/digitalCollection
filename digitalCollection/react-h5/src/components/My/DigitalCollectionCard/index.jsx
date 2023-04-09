import React, { useCallback } from "react";
import { Card, Image } from "antd-mobile";
import styles from "./index.less";
import { basePath } from "../../../api";

export default function DigitalCollectionCard(props) {
  const switchToGoodsPage = useCallback(() => {
    props.openPopup(props.cId, {
      circulation: props.t_collection_sell_manage.circulation,
      cName: props.t_collection_sell_manage.cName,
      url: props.t_collection_sell_manage.url,
      count: props.count,
    });
  }, [props]);
  return (
    <>
      <Card
        onClick={switchToGoodsPage}
        title={
          <Image
            src={basePath + props.t_collection_sell_manage.url}
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
          <p className={styles.title}>{props.t_collection_sell_manage.cName}</p>
          <div className={styles.author}>
            {props.t_collection_sell_manage.auther}
          </div>
          <div className={styles.num}>共{props.count}个</div>
        </div>
      </Card>
    </>
  );
}
