import React, { useState } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import DigitalCollectionList from "../../components/My/DigitalCollectionList";
import { PullToRefresh, InfiniteScroll } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import Loading from "../../components/common/Loading";
import styles from "../../assets/css/my/my_digitalCollection.less";

export default function My_digitalCollection() {
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
  }
  return (
    <>
      <NavigationBar path="/my" title="我的藏品" />
      <div className={styles.digitalCollection_page}>
        <PullToRefresh
          onRefresh={async () => {
            await sleep(1000);
          }}
          renderText={status => {
            return <Loading status={status} />;
          }}
        >
          <DigitalCollectionList />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </>
  );
}
