import React from "react";
import { connect } from "dva";
import { Button, Form, Input, Icon, Checkbox } from "antd";
import styles from "./login.less";

const forge = require("node-forge");

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 18 } };

const Login = ({
  dispatch,
  form: {
    getFieldDecorator,
    validateFields
  }
}) => {
  function handleOk() {
    validateFields((err, values) => {
      if (!err) {
        let md = forge.md.md5.create();
        md.update(values.pwd);
        values.pwd = md.digest().toHex();
        dispatch({ type: "login/login", payload: values });
      }
    });
  }
  return (
    <div className={styles.box}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <span>adol智能运营管理系统</span>
        </div>
        <div className={styles.logoTitle}>全渠道 · 大数据 · 精运营</div>
        <form className={styles.logoForm}>
          <Form.Item label="" {...formItemLayout} hasFeedback>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(<Input placeholder="账户/手机号" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={handleOk} />)}
          </Form.Item>
          <Form.Item label="" {...formItemLayout}>
            {getFieldDecorator("pwd", {
              rules: [{ required: true, message: "请输入密码" }]
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={handleOk} placeholder="密码" />)}
          </Form.Item>
          {/* <Form.Item label='' {...formItemLayout}>
            {getFieldDecorator('checkCode', {
              rules: [{ required: true, message: '请输入验证码' }]
            })(<Input placeholder="验证码" prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={handleOk} />)}
            <img id='imgs' onClick={changeCode} style={{ marginLeft: '30px' }} src={_url} />
          </Form.Item>
          <div className={styles.checkBox}>
            <Checkbox>记住密码</Checkbox>
          </div> */}
          <Button type="primary" size="large" onClick={handleOk}>登录</Button>
        </form>
        <div className={styles.copyRight}>
          <div class={styles.logoFlex}>
            <span>帮助</span>
            <span>隐私</span>
            <span>条款</span>
          </div>
          <div className={styles.logoBtm}>
            <span>Copyright © </span>adol.asus.com.cn,All Rights Reserved.
          </div>
        </div>
      </div>
        <img style={{ position: "absolute", left: "10%", top: "12%" }} src="bg_left_top.png" />
        <img style={{ position: "absolute", left: "12%",bottom: "11%" }} src="bg_left_bottom.png" />
        <img style={{ position: "absolute", right: "13%", top: "15%" }} src="bg_right_top.png" />
        <img style={{ position: "absolute", right: "8%", bottom: "17%" }} src="bg_right_bottom.png" />
    </div>
  );
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));
