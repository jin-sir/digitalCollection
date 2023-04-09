import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PullToRefresh, InfiniteScroll, Dropdown, List } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import Loading from "../../components/common/Loading";
import styles from "../../assets/css/goods/goods.less";
import IconFont from "../../components/common/IconFont";
import NavigationBar from "../../components/common/NavigationBar";
import { getProductList } from "../../api";

export default function Goods() {
  const location = useLocation();
  const { cId, cName, circulation, sumstock } = location.state;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [filterMode, setFilterMode] = useState("asc");
  const [filterTitle, setFilterTitle] = useState("价格升序");
  const [goodsListData, setGoodslistData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const dropdownRef = useRef();
  async function loadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    getProductList({
      cId,
      page,
      limit: 10,
      sort: filterMode,
    }).then(res => {
      const { code, data } = res;
      console.log(res);
      if (code === 0) {
        if (data.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setLoading(false);
        setGoodslistData([...goodsListData, ...data]);
      }
    });
  }, [page, filterMode, forceUpdate]);
  const navigate = useNavigate();
  const goodsList = goodsListData.map(goods => (
    <List.Item
      key={goods.seri_num}
      onClick={() => {
        navigate("/goodsDetail", {
          state: {
            goodsId: goods.cId,
            path: `${location.pathname}${location.search}`,
            mode: "market",
            seri_num: goods.seri_num,
            sumstock: sumstock,
          },
        });
      }}
    >
      <div className={styles.list_item}>
        <div className={styles.goods_infor}>
          <div className={styles.left}>
            <span className={styles.goods_name}>{cName}</span>
            <span
              className={`${styles.status_default} ${
                goods.lock_time ? styles.suodan : styles.jishou
              }`}
            >
              {goods.lock_time ? "锁定中" : "寄售"}
            </span>
          </div>
          <div className={styles.right}>
            <IconFont
              type="icon-jifen"
              style={{
                fontSize: "14px",
              }}
            />{" "}
            {goods.selling_price}
          </div>
        </div>
        <div>
          #{goods.seri_num}/{circulation}
        </div>
      </div>
    </List.Item>
  ));
  return (
    <>
      {loading ? null : (
        <div className={styles.goods_page}>
          <header
            className={styles.header}
            style={{
              background:
                'url("https://file.18art.art/file/oss/nft/image/nft-goods/dece5a0e68b147a398f0ebd8aa55a199.jpg?style=st6") no-repeat',
            }}
          >
            <div className={styles.content}>
              <NavigationBar path="/market" title={cName} />
              <div className={styles.infor}>
                <div className={styles.num_box}>
                  <span>限量</span>
                  {circulation}份
                </div>
                <div className={styles.num_box}>
                  <span>流通</span>
                  {sumstock}份
                </div>
              </div>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.goods_list}>
              <Dropdown
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
                        setGoodslistData([]);
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
                        setGoodslistData([]);
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
              </Dropdown>
              <div className={styles.list}>
                <PullToRefresh
                  onRefresh={async () => {
                    setForceUpdate(forceUpdate + 1);
                    setGoodslistData([]);
                    await sleep(1000);
                  }}
                  renderText={status => {
                    return <Loading status={status} />;
                  }}
                >
                  <List>{goodsList}</List>
                  <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                </PullToRefresh>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
