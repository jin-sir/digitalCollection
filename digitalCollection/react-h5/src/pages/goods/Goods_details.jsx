import React, { useCallback, useEffect, useState } from "react";
import { Button, Toast } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";
import GoodsCard from "../../components/Goods/GoodsCard";
import styles from "../../assets/css/goods/goods_details.less";
import { useLocation } from "react-router-dom";
import {
  getNewProductInfo,
  createByMarket,
  createByAdmin,
  getProductInfo,
} from "../../api";

export default function Goods_details() {
  const location = useLocation();
  const { goodsId, mode, path } = location.state;
  const [goodsInfo, setGoodsInfo] = useState({});
  const [isBusiness, setIsBusiness] = useState(false);
  useEffect(() => {
    let getProduct;
    let data;
    if (mode === "home") {
      getProduct = getNewProductInfo;
      data = { cId: goodsId };
    } else {
      getProduct = getProductInfo;
      data = { cId: goodsId, seri_num: location.state.seri_num };
    }
    getProduct(data).then(res => {
      const { code, data } = res;
      console.log(data);
      if (code === 0 && data !== null) {
        setGoodsInfo(data);
        setIsBusiness(data.isBusiness)
      }
    });
  }, [goodsId]);
  Toast.show({
    content: mode,
  });
  const createOrderFn = useCallback(() => {
    const createFn = mode === "home" ? createByAdmin : createByMarket;
    createFn({ cId: goodsId }).then(res => {
      console.log(res);
      Toast.show({
        content: res.msg,
      });
    });
  }, [goodsId, mode]);
  const sellFn = useCallback(() => {
    const createFn = mode === "home" ? createByAdmin : createByMarket;
    createFn({ cId: goodsId }).then(res => {
      console.log(res);
      Toast.show({
        content: res.msg,
      });
    });
  }, [goodsId, mode]);
  return (
    <>
      <NavigationBar path={path} title={goodsInfo.cName} />
      <div className={styles.goodsDetail_page}>
        <GoodsCard goodsInfo={goodsInfo} mode={mode} />
        {mode === "my_digitalCollection" ? (
          <Button
            disabled={!isBusiness}
            onClick={sellFn}
            block
            shape="rounded"
            className={styles.pay_btn}
          >
            {isBusiness ? "立即寄售" : "尚未开启寄售"}
          </Button>
        ) : (
          <Button
            onClick={createOrderFn}
            block
            shape="rounded"
            className={styles.pay_btn}
          >
            立即购买
          </Button>
        )}
      </div>
    </>
  );
}
