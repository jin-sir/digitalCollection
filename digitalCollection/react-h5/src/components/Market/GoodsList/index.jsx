import React from "react";
import GoodsCard from "../GoodsCard";
import styles from "./index.less";

export default function GoodsList(props) {
  const goods = [1, 2, 3, 4, 5, 6, 7].map(it => <GoodsCard key={it} />);
  return <div className={styles.goods_container}>{goods}</div>;
}
