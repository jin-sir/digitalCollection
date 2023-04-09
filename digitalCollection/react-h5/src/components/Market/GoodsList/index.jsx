import React from "react";
import GoodsCard from "../GoodsCard";
import styles from "./index.less";

export default function GoodsList(props) {
  const goods = props.marketList.map(it => <GoodsCard key={it.cId} {...it} />);
  return <div className={styles.goods_container}>{goods}</div>;
}
