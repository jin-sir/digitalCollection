import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../assets/css/announcement/announcement_detail.less";
import { getAnnouncementDetail } from "../../api";
import NavigationBar from "../../components/common/NavigationBar";
import moment from "moment";

export default function Announcement_details(props) {
  const { aId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    getAnnouncementDetail({ infoId: aId }).then(res => {
      const { code, data } = res;
      if (code === 0) {
        setContent(data.content);
        setTitle(data.title);
        setTime(data.updatedAt);
      }
    });
  }, [aId]);
  return (
    <>
      <NavigationBar path={"/announcement"} title={"平台公告"} />
      <div className={styles.detail_page}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>
          {moment(time).format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <div className={styles.content}>
          <p>
            <strong>尊敬的麒麟数藏用户：</strong>
          </p>
          <p>
            <strong>您好！</strong>
          </p>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
        <div className={styles.content}>
          <p>敬请广大用户知悉！</p>
          <p className={styles.qlAlignRight}>
            <strong>&nbsp;麒麟数藏</strong>
          </p>
          <p className={styles.qlAlignRight}>
            <strong>2023年4月9日</strong>
          </p>
        </div>
      </div>
    </>
  );
}
