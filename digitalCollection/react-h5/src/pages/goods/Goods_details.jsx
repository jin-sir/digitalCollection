import React, { useCallback, useEffect, useState } from "react";
import { Button, Toast, Popup, Input } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";
import GoodsCard from "../../components/Goods/GoodsCard";
import styles from "../../assets/css/goods/goods_details.less";
import { useLocation } from "react-router-dom";
import {
  getNewProductInfo,
  createByMarket,
  createByAdmin,
  getProductInfo,
  publishCollection,
  cancelSelling,
} from "../../api";

export default function Goods_details() {
  const location = useLocation();
  const { goodsId, path } = location.state;
  const [mode, setMode] = useState(location.state.mode);
  const [goodsInfo, setGoodsInfo] = useState({});
  const [isBusiness, setIsBusiness] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sellPrice, setSellPrice] = useState("");
  // 刷新页面
  const [count, setCount] = useState(0);
  useEffect(() => {
    let getProduct;
    let data;
    if (mode === "home") {
      getProduct = getNewProductInfo;
      data = { cId: goodsId };
    } else {
      getProduct = getProductInfo;
      data = { cId: goodsId, seri_num: location.state.seri_num, mode };
    }
    getProduct(data).then(res => {
      const { code, data } = res;
      console.log(data);
      if (code === 0 && data !== null) {
        if (data.mode) {
          console.log(data.mode);
          setMode(data.mode);
        }
        setGoodsInfo(data);
        setIsBusiness(data.isBusiness);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodsId, count]);
  const createOrderFn = useCallback(() => {
    let createFn;
    let data;
    if (mode === "home") {
      createFn = createByAdmin;
      data = { cId: goodsId };
    } else {
      createFn = createByMarket;
      data = { cId: goodsId, seri_num: location.state.seri_num };
    }
    createFn(data).then(res => {
      Toast.show({
        content: res.msg,
      });
    });
  }, [goodsId, mode]);
  const sellFn = useCallback(() => {
    const data = {
      cId: goodsInfo.cId,
      seri_num: goodsInfo.seri_num,
      sell_price: +sellPrice,
    };
    console.log(data);
    publishCollection(data).then(res => {
      const { code, msg } = res;
      setCount(count + 1);
      if (code === 0) {
        Toast.show({
          content: msg,
        });
      } else {
        Toast.show({
          content: msg,
        });
      }
      setVisible(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodsInfo, sellPrice]);
  const openPopup = useCallback(() => {
    if (goodsInfo.state) {
      setVisible(true);
    } else {
      cancelSelling({
        cId: goodsInfo.cId,
        seri_num: goodsInfo.seri_num,
      }).then(res => {
        const { code, msg } = res;
        if (code === 0) {
          setCount(count + 1);
        }
        Toast.show({
          content: msg,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodsInfo]);
  console.log({
    cId: goodsInfo.cId,
    cName: goodsInfo.cName,
    circulation: goodsInfo.circulation,
    sumstock: location.state.sumstock,
  });
  return (
    <>
      <NavigationBar
        path={path}
        title={goodsInfo.cName}
        state={{
          cId: goodsInfo.cId,
          cName: goodsInfo.cName,
          circulation: goodsInfo.circulation,
          sumstock: location.state.sumstock,
        }}
      />
      <div className={styles.goodsDetail_page}>
        <GoodsCard goodsInfo={goodsInfo} mode={mode} />
        {mode === "my_digitalCollection" ? (
          <Button
            disabled={!isBusiness}
            onClick={openPopup}
            block
            shape="rounded"
            className={styles.pay_btn}
          >
            {isBusiness
              ? goodsInfo.state
                ? "立即寄售"
                : "取消寄售"
              : "尚未开启寄售"}
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
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div className={styles.popup_content}>
          <Input
            value={sellPrice}
            onChange={value => {
              if (+value <= goodsInfo.limit_price) {
                setSellPrice(value);
              } else {
                Toast.show({
                  content: `最高寄售价格为${goodsInfo.limit_price}`,
                });
                setSellPrice(goodsInfo.limit_price);
              }
            }}
            className={styles.ipt}
            placeholder="请输入内容"
            clearable
          />
          <Button onClick={sellFn} block shape="rounded" className={styles.btn}>
            立即寄售
          </Button>
        </div>
      </Popup>
    </>
  );
}
