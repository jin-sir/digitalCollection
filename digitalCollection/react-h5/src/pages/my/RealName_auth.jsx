import React, { useState } from "react";
import { Form, Button, Input, Toast } from "antd-mobile";
import NavigationBar from "../../components/common/NavigationBar";
import {realname} from '../../api'

import styles from "../../assets/css/login.less";

export default function RealName_auth() {
  return (
    <div className={styles.login_page}>
      <NavigationBar path="/my" title="实名认证" />
      <div className={styles.login_main}>
        <div className={styles.login_form}>
          <Form
            onFinish={async (obj) => {
              const res = await realname(obj)
              const {code, msg} = res
              if (code === 0) {
                Toast.show({
                  content:msg
                })
              } else {
                Toast.show({
                  content:msg
                })
              }
            }}
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
            <Form.Item name="username" label="姓名" rules={[{ required: true }]}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item name="IDCard" label="身份证号" rules={[{ required: true }]}>
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
