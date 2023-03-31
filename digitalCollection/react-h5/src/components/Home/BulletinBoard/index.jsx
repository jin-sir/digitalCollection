import React, { useCallback } from "react";
import { useNavigate} from 'react-router-dom'
import { Swiper } from "antd-mobile";
import IconFont from "../../common/IconFont";
import styles from "./index.less";

export default function BulletinBoard() {
  const imageArr = [
    "【十八数藏上新公告】四星暴击，再度来袭！",
    "【十八数藏上新公告】四星暴击，再度来袭！",
    "【十八数藏上新公告】四星暴击，再度来袭！",
    "【十八数藏上新公告】四星暴击，再度来袭！",
  ];
  const items = imageArr.map((item, index) => (
    <Swiper.Item key={index}>
      <div className={styles.verticalContent}>
        {item}
      </div>
    </Swiper.Item>
  ));
  const navigate = useNavigate()
  const goToInfoPage = useCallback(() => {
    navigate('/announcement')
  })
  return (
    <div className={styles.bulletin_board}>
      <i className={styles.bullet_logo}></i>
      <Swiper
        className={styles.infor_swiper}
        direction="vertical"
        autoplay
        loop
        allowTouchMove={false}
        indicator={() => null}
      >
        {items}
      </Swiper>
      <IconFont onClick={goToInfoPage} type="icon-liebiao" className={styles.infor_liebiao} />
    </div>
  );
}
