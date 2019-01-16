import React from "react";
import { connect } from "dva";
import { Button, Row, Form, Input, Checkbox } from "antd";
import styles from "./login.less";

const FormItem = Form.Item;
const forge = require("node-forge");

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
};

const Login = ({
  dispatch,
  login,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  // let _url = urls + 'verificationCode/verificationCode.do?'
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
  // const changeCode = () => {
  // 	document.getElementById('imgs').src = _url + Math.random();
  // }
  return (
    <div className={styles.box}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <span>A豆云平台后台系统</span>
        </div>
        <div className={styles.logoTitle}>全渠道 · 大数据 · 精运营</div>
        <form className={styles.logoForm}>
          <FormItem label="" {...formItemLayout} hasFeedback>
            {getFieldDecorator("userName", {
              rules: [
                {
                  required: true,
                  message: "请输入用户名"
                }
              ]
            })(<Input onPressEnter={handleOk} placeholder="账户/手机号" />)}
            <div className={styles.iconUsername} />
          </FormItem>
          <FormItem label="" {...formItemLayout} hasFeedback>
            {getFieldDecorator("pwd", {
              rules: [
                {
                  required: true,
                  message: "请输入密码"
                }
              ]
            })(
              <Input type="password" onPressEnter={handleOk} placeholder="密码" />
            )}
            <div className={styles.iconPassword} />
          </FormItem>
          {/* <FormItem
						label=''
						{...formItemLayout}
					>
						{getFieldDecorator('checkCode', {
							rules: [
								{
									required: true,
									message: '请输入验证码'
								},
							],
						})(
							<Input onPressEnter={handleOk} style={{ width: '240px' }} placeholder="验证码" />
						)}
						<img id='imgs' onClick={changeCode} style={{ marginLeft: '30px' }} src={_url} />
						<div className={styles.iconCode}></div>
					</FormItem> 
          <div className={styles.checkBox}>
            <Checkbox>记住密码</Checkbox>
          </div>*/}
          <Button type="primary" size="large" onClick={handleOk}>
            登录
          </Button>
        </form>
        <div className={styles.copyRight}>
          <div class={styles.logoFlex}>
            <span>帮助</span>
            <span>隐私</span>
            <span>条款</span>
          </div>
          <div className={styles.logoBtm}>
            <span>Copyright © 2019&nbsp;</span>商业设计业务软件部出品
          </div>
        </div>
      </div>
      <div className={styles.bg1} />
      <div className={styles.bg2} />
      <div className={styles.bg3} />
      <div className={styles.bg4} />
    </div>
  );
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));
