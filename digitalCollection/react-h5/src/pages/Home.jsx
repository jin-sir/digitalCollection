import React from "react";
import { PullToRefresh, Tabs } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import SwiperContainer from "../components/Home/SwiperContainer";
import BulletinBoard from "../components/Home/BulletinBoard";
import GoodsCard from "../components/Home/GoodsCard";
import Loading from "../components/common/Loading";
import styles from "../assets/css/home.less";

export default function Home() {
  return (
    <div className={styles.home_page}>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000);
        }}
        renderText={status => {
          return (<Loading status={status}/>);
        }}
      >
        <header className={styles.header}>
          <SwiperContainer />
        </header>
        <BulletinBoard />
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
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
            </Tabs.Tab>
          </Tabs>
        </main>
      </PullToRefresh>
    </div>
  );
}
