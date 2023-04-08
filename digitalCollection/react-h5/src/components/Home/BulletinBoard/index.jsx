import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper } from "antd-mobile";
import IconFont from "../../common/IconFont";
import styles from "./index.less";

export default function BulletinBoard(props) {
  const items = props.titles.map((item, index) => (
    <Swiper.Item key={index}>
      <div className={styles.verticalContent}>{item}</div>
    </Swiper.Item>
  ));
  const navigate = useNavigate();
  const goToInfoPage = useCallback(() => {
    navigate("/announcement");
  }, [navigate]);
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
        {props.titles.length ? (
          items
        ) : (
          <Swiper.Item>
            <div className={styles.verticalContent}></div>
          </Swiper.Item>
        )}
      </Swiper>
      <IconFont
        onClick={goToInfoPage}
        type="icon-liebiao"
        className={styles.infor_liebiao}
      />
    </div>
  );
}
