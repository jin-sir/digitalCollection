import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";

import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Announcement from "../pages/announcement/Announcement";
import AnnouncementDetails from "../pages/announcement/AnnouncementDetails";
import Goods from "../pages/goods/Goods";
import GoodsDetail from "../pages/goods/Goods_details";
import My from "../pages/my/My";
import MyPoints from "../pages/my/My_points";
import MyDigitalCollection from "../pages/my/My_digitalCollection";
import Order from '../pages/order/Order'
import OrderDetails from '../pages/order/Order_details'
import RealNameAuth from '../pages/my/RealName_auth'
import { useRoutes } from "react-router-dom";

const routeConfig = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/goods",
    element: <Goods />,
  },
  {
    path: "/goodsDetail",
    element: <GoodsDetail />,
  },
  {
    path: "/announcementDetail/:aId",
    element: <AnnouncementDetails />,
  },
  {
    path: "/my_points",
    element: <MyPoints />,
  },
  {
    path: "/my_digitalCollection",
    element: <MyDigitalCollection />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/order_details",
    element: <OrderDetails />,
  },
  {
    path: "/realNameAuth",
    element: <RealNameAuth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/announcement",
        element: <Announcement />,
      },
      {
        path: "/my",
        element: <My />,
      },
    ],
  },
];
const View = () => {
  const element = useRoutes(routeConfig);
  return <>{element}</>;
};
export default View;
