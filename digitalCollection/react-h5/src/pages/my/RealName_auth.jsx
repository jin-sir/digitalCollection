import React, { useState } from "react";
import { Form, Button, Input, Checkbox } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";

import styles from "../../assets/css/login.less";

export default function RealName_auth() {
  const [isAgree, setIsAgree] = useState(false);
  return (
    <div className={styles.login_page}>
      <NavigationBar path="/my" title="实名认证" />
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
                立即认证
              </Button>
            }
          >
            <Form.Item name="姓名" label="姓名">
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item name="身份证号" label="身份证号">
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
