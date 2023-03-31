import React from "react";
import { Swiper } from "antd-mobile";
import styles from "./index.less";

export default function SwiperContainer() {
  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div className={styles.content} style={{ background: color }}>
        {index + 1}
      </div>
    </Swiper.Item>
  ));
  return (
    <Swiper loop style={{ "--border-radius": "8px" }}>
      {items}
    </Swiper>
  );
}
