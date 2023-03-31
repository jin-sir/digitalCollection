import React from "react";
import styles from "../../assets/css/my/my.less";
import IconFont from "../../components/common/IconFont";
import NavigationBar from "../../components/common/NavigationBar";
import { List, Avatar, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

export default function My() {
  const navigate = useNavigate();
  const operateData = [
    [
      {
        title: "我的订单",
        icon: "icon-dingdan",
        text: "",
        path: "/order",
      },
      {
        title: "我的认证",
        icon: "icon-renzheng2",
        text: "已认证",
        path: "/realNameAuth",
      },
    ],
    [
      {
        title: "关于",
        icon: "icon-guanyu",
        text: "",
      },
      {
        title: "分享",
        icon: "icon-fenxiang",
        text: "",
      },
      {
        title: "设置",
        icon: "icon-shezhi",
        text: "",
      },
    ],
  ];
  const operateBoxs = operateData.map((it, i) => {
    const operates = it.map(operate => (
      <List.Item
        key={operate.icon}
        onClick={() => {
          console.log("first");
          navigate(operate.path);
        }}
        prefix={<IconFont type={operate.icon} />}
        extra={
          <span
            className={operate.text === "已认证" ? styles.authenticated : ""}
          >
            {operate.text}
          </span>
        }
      >
        {operate.title}
      </List.Item>
    ));

    return <List key={i} className={styles.operate_box}>{operates}</List>;
  });
  return (
    <div className={styles.my_page}>
      <NavigationBar backArrow={false} title="我的" />
      <div className={styles.person_info}>
        <div className={styles.info_top}>
          <Avatar
            fallback={
              <IconFont
                type="icon-wode"
                style={{
                  fontSize: "40px",
                }}
              />
            }
            className={styles.avatar}
          />
          <div className={styles.top_box}>
            <div className={styles.txtWeight}>cOG9Q0r6</div>
            <div>uID {10216984}</div>
          </div>
        </div>
        <div className={styles.info_bottom}>
          <div className={styles.top}>
            区块链地址：
            <span className={styles.txtWeight}>
              {"0x4fwejofjwefowefhweowjenfoweyweowjeoweufwef"}
            </span>
          </div>
          <div className={styles.bottom}>
            <Button
              className={styles.btn}
              onClick={() => {
                navigate("/my_digitalCollection");
              }}
            >
              <IconFont
                type="icon-shuzicangpin"
                style={{
                  fontSize: "20px",
                }}
              />
              <span className={styles.txt}>我的藏品</span>
            </Button>
            <Button
              className={styles.btn}
              onClick={() => {
                navigate("/my_points");
              }}
            >
              <IconFont
                type="icon-jifen"
                style={{
                  fontSize: "20px",
                }}
              />
              <span className={styles.txt}>我的积分</span>
            </Button>
          </div>
        </div>
      </div>
      {operateBoxs}
    </div>
  );
}
