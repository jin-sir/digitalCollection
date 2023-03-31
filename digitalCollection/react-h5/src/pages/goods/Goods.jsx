import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PullToRefresh, InfiniteScroll, Dropdown, List } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import Loading from "../../components/common/Loading";
import styles from "../../assets/css/goods/goods.less";
import NavigationBar from "../../components/common/NavigationBar";

export default function Goods() {
  const [getSearchArr] = useSearchParams();
  const gId = getSearchArr.getAll("gId");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterMode, setFilterMode] = useState("asc");
  const [filterTitle, setFilterTitle] = useState("价格升序");
  const dropdownRef = useRef();
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
  }

  useEffect(() => {});
  const navigate = useNavigate();
  const switchToGoodsDetail = useCallback(
    gid => {
      // createOrder ->orderId
      navigate("/goodsDetail?orderId=123");
    },
    [navigate]
  );
  const goodsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1].map(it => (
    <List.Item onClick={switchToGoodsDetail} key={it}>
      <div className={styles.list_item}>
        <div className={styles.goods_infor}>
          <div className={styles.left}>
            <span className={styles.goods_name}>{"金钱之王·远东豹"}</span>
            <span className={`${styles.status_default} ${styles.jishou}`}>锁定中</span>
          </div>
          <div className={styles.right}>{"￥5100"}</div>
        </div>
        <div>#313/2679</div>
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
              <NavigationBar path="/market" title={gId} />
              <div className={styles.infor}>
                <div className={styles.num_box}>
                  <span>限量</span>
                  784份
                </div>
                <div className={styles.num_box}>
                  <span>流通</span>
                  784份
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
              </Dropdown>
              <div className={styles.list}>
                <PullToRefresh
                  onRefresh={async () => {
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
