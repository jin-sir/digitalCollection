import React, { useState, useEffect } from "react";
import { Tabs, InfiniteScroll } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";
import InfoList from "../../components/Announcement/InfoList";
import styles from "../../assets/css/announcement/announcement.less";
import IconFont from "../../components/common/IconFont";
import { getTitle } from "../../api";

export default function Announcement() {
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    getTitle({ page, limit: 10 }).then(res => {
      const { code, data } = res;
      if (code === 0) {
        setTitles([...titles, ...data]);
        setLoading(false);
      }
      if (data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, forceUpdate]);
  async function loadMore() {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
  }
  return (
    <div className={styles.announcement_page}>
      <NavigationBar backArrow={false} title="发现" />
      <div className={styles.info_content}>
        <IconFont
          onClick={() => {
            setForceUpdate(forceUpdate + 1);
            setTitles([])
          }}
          className={styles.reLoad}
          type="icon-shuaxin"
          style={{
            fontSize: "28px",
          }}
        />
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
            <InfoList datas={titles} />
            {titles.length ? (
              <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            ) : (
              ""
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}
