import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import DigitalCollectionList from "../../components/My/DigitalCollectionList";
import { PullToRefresh, InfiniteScroll, Toast } from "antd-mobile";
import Loading from "../../components/common/Loading";
import styles from "../../assets/css/my/my_digitalCollection.less";
import { getUserProduct } from "../../api";
export default function My_digitalCollection() {
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUserProduct({ page, limit: 10 }).then(res => {
      const { code, data } = res;
      if (code === 0) {
        setCollections([...collections, ...data]);
        if (data.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        Toast.show({
          content: "Error",
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const [hasMore, setHasMore] = useState(false);
  async function loadMore() {
    setPage(page + 1);
  }
  return (
    <>
      <NavigationBar path="/my" title="我的藏品" />
      <div className={styles.digitalCollection_page}>
        <PullToRefresh
          onRefresh={async () => {
            if (page === 1) {
              const res = await getUserProduct({ page, limit: 10 });
              const { code, data } = res;
              if (code === 0) {
                setCollections(data);
                if (data.length < 10) {
                  setHasMore(false);
                } else {
                  setHasMore(true);
                }
              } else {
                Toast.show({
                  content: "Error",
                });
              }
            } else {
              setPage(1);
              setCollections([]);
            }
          }}
          renderText={status => {
            return <Loading status={status} />;
          }}
        >
          <DigitalCollectionList collections={collections} />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </>
  );
}
