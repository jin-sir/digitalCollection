import React, { useState } from "react";
import { Form, Button, Input, Checkbox } from "antd-mobile";
import NavigationBar from "../components/common/NavigationBar";

import styles from "../assets/css/login.less";

export default function Login() {
  const [isAgree, setIsAgree] = useState(false);
  return (
    <div className={styles.login_page}>
      <NavigationBar path="/home" title="登录" />
      <div className={styles.login_main}>
        <div className={styles.login_form}>
          <Form
            onFinish={() => {}}
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
            <Form.Item name="账号" label="账号">
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item name="密码" label="密码">
              <Input placeholder="请输入密码" />
            </Form.Item>
          </Form>
          <Checkbox
            checked={isAgree}
            onChange={e => {
              setIsAgree(e);
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
