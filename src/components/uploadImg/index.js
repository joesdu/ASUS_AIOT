import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import $ from 'jquery';
import {connect} from 'dva';
import {Route, Redirect, Switch, routerRedux, Link} from 'dva/router';
import { message,Upload,Modal ,Form,Input, Button, Select, Divider,Card } from 'antd';

import styles from '../../routes/products/productClass.less';

const UploadImg = ({
	uploadImg,
	labelVisible,
	labelUploadVisible,
	dispatch,
	form: {
		getFieldDecorator,
		validateFieldsAndScroll,
		validateFields,
		setFieldsValue,
		getFieldsValue
	},
	
}) => {
	//const { data } = uploadImg
	//alert(data)
	return (
		<div>
			<div>今天是个好日子啊</div>
		</div>
	)
}

export default connect(({ uploadImg }) => ({ uploadImg }))(Form.create()(UploadImg))