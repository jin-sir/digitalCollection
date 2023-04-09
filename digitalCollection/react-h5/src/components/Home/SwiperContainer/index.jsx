import React from "react";
import { Swiper, Image } from "antd-mobile";
import { basePath } from "../../../api";

export default function SwiperContainer(props) {
  const items = props.swiperList.map((swiper, index) => (
    <Swiper.Item key={swiper.id}>
      <Image
        style={{ height: "200px" }}
        src={basePath + swiper.url}
        fit="fill"
      />
    </Swiper.Item>
  ));
  return (
    <Swiper loop style={{ "--border-radius": "8px" }}>
      {items}
    </Swiper>
  );
}
