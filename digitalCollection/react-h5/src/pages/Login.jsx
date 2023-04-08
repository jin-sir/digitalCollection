import React, { useCallback, useState } from "react";
import { Form, Button, Input, Checkbox, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/common/NavigationBar";
import { login } from "../api";

import styles from "../assets/css/login.less";

export default function Login() {
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState(false);
  const handleLogin = useCallback(
    async form => {
      console.log(isAgree);
      if (!isAgree) {
        Toast.show({
          icon: "fail",
          content: "请先阅读并同意协议",
        });
        return;
      }
      const { code, msg } = await login(form);
      if (code === 0) {
        Toast.show({
          icon: "success",
          content: msg,
          afterClose: () => {
            navigate("/home");
          },
        });
      } else {
        Toast.show({
          icon: "fail",
          content: msg,
        });
      }
    },
    [isAgree, navigate]
  );
  return (
    <div className={styles.login_page}>
      <NavigationBar path="/home" title="登录" />
      <div className={styles.login_main}>
        <div className={styles.login_form}>
          <Form
            onFinish={handleLogin}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                style={{
                  "--background-color": "#666",
                  "--border-radius": "8px",
                  "--border-color": "#666",
                }}
              >
                登录
              </Button>
            }
          >
            <Form.Item name="account" label="账号" rules={[{ required: true }]}>
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
              <Input placeholder="请输入密码" />
            </Form.Item>
          </Form>
          <Checkbox
            checked={isAgree}
            onChange={e => {
              console.log(e);
              setIsAgree(e);
              console.log(isAgree);
            }}
            style={{
              padding: "20px 12px",
              "--icon-size": "16px",
              fontWeight: "600",
              "--font-size": "12px",
            }}
          >
            已阅读并同意《用户服务协议》《隐私权政策》
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
