import React, {useState} from "react";
import { Tabs, InfiniteScroll  } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";
import InfoList from "../../components/Announcement/InfoList";
import styles from "../../assets/css/announcement/announcement.less";

export default function Announcement() {
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
  }
  return (
    <div className={styles.announcement_page}>
      <NavigationBar backArrow={false} title="发现" />
      <div className={styles.info_content}>
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
              title="平台公告"
              className={styles.tab_item}
              key="digitalCollection"
            >
              <InfoList />
              <InfoList />
              <InfoList />
              <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </Tabs.Tab>
          </Tabs>
      </div>
    </div>
  );
}
