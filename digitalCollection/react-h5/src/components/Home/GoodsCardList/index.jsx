import React from "react";
import CardItem from "./CardItem";

export default function GoodsCardList(props) {
  const list = props.goodsList.map(g => <CardItem key={g.cId} {...g} />);
  return <>{list}</>;
}
