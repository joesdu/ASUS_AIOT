import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Button, Row, Form, Input, Checkbox } from "antd";
import { config } from "utils";
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

/*   //蒲公英特效
  !function () {
    function n(n, e, t) { return n.getAttribute(e) || t }
    function e(n) { return document.getElementsByTagName(n) }
    function t() { var t = e("script"), o = t.length, i = t[o - 1]; return { l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .4), c: n(i, "color", "0,0,0"), n: n(i, "count", 60) } }
    function o() { a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight }
    function i() {
      r.clearRect(0, 0, a, c);
      var n, e, t, o, m, l;
      s.forEach(function (i, x) {
        for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++)
          n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
      }), x(i)
    }
    var a, c, u, m = document.createElement("canvas"), d = t(), l = "c_n" + d.l, r = m.getContext("2d"), x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) { window.setTimeout(n, 1e3 / 45) }, w = Math.random, y = { x: null, y: null, max: 2e4 };
    m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) { n = n || window.event, y.x = n.clientX, y.y = n.clientY }, window.onmouseout = function () { y.x = null, y.y = null };
    for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1; s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 })
    }
    u = s.concat([y]), setTimeout(function () { i() }, 500)
  }(); */

  // let _url = urls + 'verificationCode/verificationCode.do?'
  function handleOk() {
    validateFields((err, values) => {
      if (!err) {
        let md = forge.md.md5.create();
        md.update(values.pwd);
        values.pwd = md.digest().toHex();
        console.log(values.pwd);
        dispatch({
          type: "login/login",
          payload: values
        });
      }
    });
  }
  // const changeCode = () => {
  // 	document.getElementById('imgs').src = _url + Math.random();
  // }
  return (
    <div classNanme={styles.box}>
      <link rel="icon" href="./images/favicon.ico" type="image/x-icon" />
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
              <Input
                type="password"
                onPressEnter={handleOk}
                placeholder="密码"
              />
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
          <div className={styles.checxBox}>
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
