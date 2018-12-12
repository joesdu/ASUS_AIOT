import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { config } from 'utils'
import styles from './login.less'
import { urls } from '../../utils/config'

const FormItem = Form.Item

const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 18 },
}

const Login = ({
	dispatch,
	login,
	form: {
		getFieldDecorator,
		validateFieldsAndScroll,
		validateFields,
		setFieldsValue,
		getFieldsValue
	},
}) => {
	let _url = urls + 'verificationCode/verificationCode.do?'
	function handleOk() {
		validateFields((err, values) => {
			if (!err) {

				dispatch({
					type: 'login/login',
					payload: values
				})
			}
		})
	}
	const changeCode = () => {
		document.getElementById('imgs').src = _url + Math.random();
	}
	return (
		<div classNanme={styles.box}>
			<link rel="icon" href="./images/favicon.ico" type="image/x-icon" />
			<div className={styles.form}>
				<div className={styles.logo}>
					<span>A豆云平台后台系统</span>
				</div>
				<div className={styles.logoTitle}>全渠道 · 大数据 · 精运营</div>
				<form className={styles.logoForm}>
					<FormItem
						label=''
						{...formItemLayout}
						hasFeedback>
						{getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: '请输入用户名'
								},
							],
						})(<Input onPressEnter={handleOk} placeholder="账户/手机号" />)}
						<div className={styles.iconUsername}></div>
					</FormItem>
					<FormItem
						label=''
						{...formItemLayout}
						hasFeedback>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: '请输入密码'
								},
							],
						})(<Input type="password" onPressEnter={handleOk} placeholder="密码" />)}
						<div className={styles.iconPassword}></div>
					</FormItem>
					<FormItem
						label=''
						{...formItemLayout}
					>
						{getFieldDecorator('checkcode', {
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
					<div className={styles.checxBox}><Checkbox>记住密码</Checkbox></div>
					<Button type="primary" size='large' onClick={handleOk}>登录</Button>
				</form>
				<div className={styles.copyRight}>
					<div class={styles.logoFlex}>
						<span>帮助</span>
						<span>隐私</span>
						<span>条款</span>
					</div>
					<div className={styles.logoBtm}><span>Copyright © 2017</span>设计业务软件部出品</div>
				</div>

			</div>
			<div className={styles.bg1}></div>
			<div className={styles.bg2}></div>
			<div className={styles.bg3}></div>
			<div className={styles.bg4}></div>
		</div>
	)
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
