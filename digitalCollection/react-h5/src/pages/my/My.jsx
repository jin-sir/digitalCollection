import React, { useEffect, useMemo, useState } from "react";
import styles from "../../assets/css/my/my.less";
import IconFont from "../../components/common/IconFont";
import NavigationBar from "../../components/common/NavigationBar";
import { List, Avatar, Button, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api";
import operationCookie from "../../utils/cookie";

export default function My() {
  const navigate = useNavigate();
  const [nick, setNick] = useState("");
  const [uId, setUId] = useState("");
  const [address, setAddress] = useState("");
  const [isSign, setIsSign] = useState(false);
  useEffect(() => {
    getUserInfo()
      .then(res => {
        const { code, data } = res;
        if (code === 0) {
          setNick(data.nick);
          setUId(data.uId);
          setAddress(data.address);
          setIsSign(data.isSign);
        }
      })
      .catch(e => {
        Toast.show({
          icon: "fail",
          content: "请先登录",
          afterClose: () => {
            navigate("/login");
          },
        });
      });
  });
  const operateData = useMemo(() => {
    return [
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
          text: isSign ? "已认证" : "未实名",
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
  }, [isSign]);
  const operateBoxs = operateData.map((it, i) => {
    const operates = it.map(operate => (
      <List.Item
        key={operate.icon}
        onClick={() => {
          if (operate.text === "已认证") {
            return;
          }
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

    return (
      <List key={i} className={styles.operate_box}>
        {operates}
      </List>
    );
  });
  console.log(operationCookie.getCookie("token") == true);
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
            <div className={styles.txtWeight}>{nick}</div>
            <div>uID {uId}</div>
          </div>
        </div>
        <div className={styles.info_bottom}>
          <div className={styles.top}>
            区块链地址：
            <span className={styles.txtWeight}>{address}</span>
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
      {operationCookie.getCookie("token") ? (
        <Button
          onClick={() => {
            operationCookie.removeCookie("token");
            Toast.show({
              icon: "success",
              content: "退出成功",
              afterClose: () => {
                navigate("/login");
              },
            });
          }}
          block
          shape="rounded"
          color="danger"
          style={{ marginTop: "10px" }}
        >
          退出登录
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
