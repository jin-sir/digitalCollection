import React from "react";
import OrderList from "../../components/Order/OrderList";
import MyPullToRefresh from "../../components/common/MyPullToRefresh";
import NavigationBar from "../../components/common/NavigationBar";

export default function Order() {
  return (
    <>
      <NavigationBar path="/my" title="我的订单" />
      <div className="order_page">
        <MyPullToRefresh onRefresh={() => {}}>
          <OrderList/>
        </MyPullToRefresh>
      </div>
    </>
  );
}
