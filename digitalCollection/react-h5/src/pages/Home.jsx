import React, { useEffect, useState } from "react";
import { PullToRefresh, Tabs } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import SwiperContainer from "../components/Home/SwiperContainer";
import BulletinBoard from "../components/Home/BulletinBoard";
import GoodsCardList from "../components/Home/GoodsCardList";
import Loading from "../components/common/Loading";
import styles from "../assets/css/home.less";
import { getTitle, getNewProduct, getSwiperlist } from "../api";

export default function Home() {
  const [titles, setTitles] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const [swiperList, setSwiperList] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    getTitle().then(res => {
      const { code, data } = res;
      if (code === 0) {
        const titles = data.map(t => t.title);
        setTitles(titles);
      }
    });
    getNewProduct().then(res => {
      const { code, data } = res;
      if (code === 0) {
        setGoodsList(data);
      }
    });
    getSwiperlist().then(res => {
      const { code, data } = res;
      if (code === 0) {
        setSwiperList(data);
      }
    });
  }, [forceUpdate]);
  return (
    <div className={styles.home_page}>
      <PullToRefresh
        onRefresh={async () => {
          setForceUpdate(forceUpdate + 1);
          await sleep(1000);
        }}
        renderText={status => {
          return <Loading status={status} />;
        }}
      >
        <header className={styles.header}>
          <SwiperContainer swiperList={swiperList} />
        </header>
        <BulletinBoard titles={titles} />
        <main className={styles.main}>
          <Tabs
            activeLineMode="fixed"
            stretch={false}
            style={{
              "--active-line-height": "3px",
              "--fixed-active-line-width": "30px",
              "--active-title-color": "#000",
              "--adm-color-border": "#fafafa",
              "--active-line-color": "#00dfec",
              "--content-padding": "0",
            }}
          >
            <Tabs.Tab
              title="数字藏品"
              className={styles.tab_item}
              key="digitalCollection"
            >
              <GoodsCardList goodsList={goodsList} />
            </Tabs.Tab>
          </Tabs>
        </main>
      </PullToRefresh>
    </div>
  );
}
