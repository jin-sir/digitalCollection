import React, { useState, useRef, useEffect } from "react";
import styles from "../assets/css/market.less";
import { PullToRefresh, InfiniteScroll, Tabs, Dropdown } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import Loading from "../components/common/Loading";
import GoodsList from "../components/Market/GoodsList";
import IconFont from "../components/common/IconFont";
import { getProduct } from "../api";

export default function Market() {
  const [marketList, setMarketList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  // const [filterMode, setFilterMode] = useState("asc");
  // const [filterTitle, setFilterTitle] = useState("价格升序");
  // const dropdownRef = useRef();
  async function loadMore() {
    setPage(page + 1);
  }
  useEffect(() => {
    getProduct({
      page,
      limit: 10,
    }).then(res => {
      const { code, data } = res;
      if (code === 0) {
        if (data.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setMarketList(data);
      }
    });
  }, [page, forceUpdate]);
  return (
    <div className={styles.market_page}>
      <header className={styles.header}>
        <div className={styles.search}>
          <IconFont className={styles.search_icon} type="icon-sousuo" />
          <span className={styles.divide}></span>
          <span className={styles.text}>搜索藏品、专辑、盲盒</span>
        </div>
        <div className={styles.tab_container}>
          <div className={styles.tabs_item}>数字藏品</div>
        </div>
      </header>
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
          title="全部"
          className={styles.tab_item}
          key="digitalCollection"
        >
          <div className={styles.goods_list}>
            {/* <Dropdown
              ref={dropdownRef}
              style={{
                "--adm-color-background": "#fafafa",
              }}
            >
              <Dropdown.Item key="sorter" title={filterTitle}>
                <div className={styles.filter_box}>
                  <div
                    onClick={() => {
                      setFilterMode("asc");
                      setFilterTitle("价格升序");
                      dropdownRef.current.close();
                    }}
                    className={`${styles.filter_item} ${
                      filterMode === "asc" ? styles.filter_active : ""
                    }`}
                  >
                    价格升序
                  </div>
                  <div
                    onClick={() => {
                      setFilterMode("desc");
                      setFilterTitle("价格降序");
                      dropdownRef.current.close();
                    }}
                    className={`${styles.filter_item} ${
                      filterMode === "desc" ? styles.filter_active : ""
                    }`}
                  >
                    价格降序
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown> */}
            <PullToRefresh
              onRefresh={async () => {
                await sleep(1000);
                setForceUpdate(forceUpdate + 1);
              }}
              renderText={status => {
                return <Loading status={status} />;
              }}
            >
              <GoodsList marketList={marketList} />
              <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
