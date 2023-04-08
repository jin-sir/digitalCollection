import React, { useCallback, useState } from "react";
import { Form, Button, Input, Checkbox, Toast } from "antd-mobile";
import NavigationBar from "../components/common/NavigationBar";
import styles from "../assets/css/register.less";
import { getVeriCode, resigter } from "../api";

export default function Register() {
  const [form] = Form.useForm();
  const [isAgree, setIsAgree] = useState(false);
  const [isSendCode, setSendCode] = useState(false);
  const [isRegDisabled, setIsRegDisabled] = useState(true);
  const [veriCodeTxt, setVeriCodeTxt] = useState("发送验证码");
  const startTime = useCallback(() => {
    if (isRegDisabled) {
      setIsRegDisabled(false);
    }
    setSendCode(true);
    let count = 60;
    setVeriCodeTxt(`${count}秒`);
    let timer = setInterval(() => {
      count--;
      if (count < 0) {
        clearTimeout(timer);
        setVeriCodeTxt("重新发送");
        setSendCode(false);
      } else {
        setVeriCodeTxt(`${count}秒`);
      }
    }, 1000);
  }, [isRegDisabled]);
  const handleVeriCode = useCallback(async () => {
    const account = form.getFieldValue("account");
    const mail = form.getFieldValue("mail");
    if (!account) {
      Toast.show({
        icon: "fail",
        content: "请输入账号",
      });
      return;
    }
    if (!mail) {
      Toast.show({
        icon: "fail",
        content: "请输入邮箱",
      });
      return;
    }
    startTime();
    const res = await getVeriCode({ account, mail });
    console.log(res);
  }, [form, startTime]);
  const handleRegister = useCallback(
    async form => {
      if (!isAgree) {
        Toast.show({
          icon: "fail",
          content: "请先阅读并同意协议",
        });
        return;
      }
      if (form.pwd !== form.again_password) {
        Toast.show({
          icon: "fail",
          content: "两次密码不一致，请重新输入",
        });
        return;
      }
      const info = {
        account: form.account,
        pwd: form.pwd,
        veri_code: form.veri_code,
        higher_level: form.higher_level,
      };
      const { msg, code } = await resigter(info);
      if (code === 0) {
        Toast.show({
          icon: "success",
          content: msg,
        });
      } else {
        Toast.show({
          icon: "fail",
          content: msg,
        });
      }
    },
    [isAgree]
  );
  const veri_code_button = (
    <Button disabled={isSendCode} onClick={handleVeriCode}>
      {veriCodeTxt}
    </Button>
  );
  return (
    <div className={styles.login_page}>
      <NavigationBar path="/home" title="注册" />
      <div className={styles.login_main}>
        <div className={styles.login_form}>
          <Form
            form={form}
            onFinish={handleRegister}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                disabled={isRegDisabled}
                style={{
                  "--background-color": "#666",
                  "--border-radius": "8px",
                  "--border-color": "#666",
                }}
              >
                注册
              </Button>
            }
          >
            <Form.Item name="account" label="账号" rules={[{ required: true }]}>
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
              <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="again_password"
              label="确认密码"
              rules={[{ required: true }]}
            >
              <Input placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item name="mail" label="邮箱" rules={[{ required: true }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="veri_code"
              label="验证码"
              extra={veri_code_button}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Form.Item name="higher_level" label="邀请码">
              <Input placeholder="请输入邀请码" />
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
