import React from "react";
import { Button } from "antd-mobile";

import NavigationBar from "../../components/common/NavigationBar";
import GoodsCard from "../../components/Goods/GoodsCard";
import styles from "../../assets/css/goods/goods_details.less";

export default function Goods_details() {
  return (
    <>
      <NavigationBar path="/market" title={"wefwefw"} />
      <div className={styles.goodsDetail_page}>
        <GoodsCard />
        <Button block  shape='rounded' className={styles.pay_btn}>立即购买</Button>
      </div>
    </>
  );
}
