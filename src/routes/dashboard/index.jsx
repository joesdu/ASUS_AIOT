import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Alert, Layout, Tabs, Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
import styles from './TableList.less';
import $ from 'jquery';
import classnames from 'classnames';

const ReactHighcharts = require('react-highcharts');
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const Dashboard = ({
	home,
	loading,
	dispatch,
	formValues, //搜索条件
	form: {
		getFieldDecorator,
		validateFieldsAndScroll,
		setFieldsValue,
		getFieldsValue
	},
}) => {

	const { selected } = home

	var config = {
		chart: {
			height: 250,
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
		},
		title: {
			text: null,
		},
		legend: {
			enabled: false
		},
		yAxis: {
			title: {
				enabled: false
			},
		},
		series: [{
			data: [10, 20, 30, 25, 24, 23, 22]
		}]
	};

	const getData = (k) => {
		dispatch({
			type: 'home/selected',
			payload: k
		})
	}

	return (
		<div>
			<div className={styles.indexTop}>
				<Card className={styles.indexTopL} title='名片状态' style={{ marginRight: '15px' }}>
					<div className={styles.indexCont}>
						<div className={styles.indexCont_img}>
							<img src='./images/indextop1.png' />
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>371</span>
							<span>员工总数</span>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>365</span>
							<span>已开通名片</span>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>25/236</span>
							<span>剩余/总可开通数</span>
						</div>

					</div>
				</Card>
				<Card className={styles.indexTopL} title='账号状态' style={{ position: 'relative' }}>
					<span style={{ position: 'absolute', top: '18px', right: '10px' }}>开通时间：2017-09-07至2019-09-08</span>
					<div className={styles.indexCont}>
						<div className={styles.indexCont_img2}>
							<img src='./images/indextop2.png' />
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>100</span>
							<span>已使用天数</span>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>201</span>
							<span>剩余可用天数</span>
						</div>
						<div className={styles.indexCont_span}>
							<span className={styles.indexTop_num}>25</span>
							<span>已获客户数</span>
						</div>
					</div>
				</Card>
			</div>
			<Card title='数据概览' style={{ marginTop: '15px' }}>
				<div className={styles.indexData}>
					<div className={styles.indexDataLeft} style={{ marginRight: '15px' }}>
						<ul className={styles.indexDataLeft_topUL}>
							<li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>汇总</li>
							<li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>昨天</li>
							<li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近7天</li>
							<li className={selected == 3 ? styles.active : ''} onClick={getData.bind(this, 3)}>近30天</li>
						</ul>
						<ul className={styles.indexDataLeft_contUL}>
							<li>
								<span className={styles.num}>1234</span>
								<span>客户总数</span>
							</li>
							<li>
								<span className={styles.num}>56</span>
								<span>跟进总数</span>
							</li>
							<li>
								<span className={styles.num}>98</span>
								<span>浏览总数</span>
							</li>
							<li>
								<span className={styles.num}>35</span>
								<span>被转发总数</span>
							</li>
							<li>
								<span className={styles.num}>41</span>
								<span>被保存总数</span>
							</li>
							<li>
								<span className={styles.num}>36</span>
								<span>被点赞总数</span>
							</li>
						</ul>
					</div>
					<div className={styles.indexDataRight}>
						<div className={styles.indexDataRight_top}>
							<span>数据指标</span>
							<Select defaultValue="lucy" style={{ float: 'left' }}>
								<Option value="jack">客户数</Option>
								<Option value="lucy">客户数2</Option>
							</Select>
							<ul className={styles.indexDataLeft_topUL} style={{ float: 'left' }}>
								<li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>7天</li>
								<li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>15天</li>
							</ul>
							<div style={{ width: '100%' }}>
								<ReactHighcharts config={config}></ReactHighcharts>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<Card title='营销应用' style={{ marginTop: '15px' }}>
				<div className={styles.indexBtmFlex}>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img1]: true })}>
							<img src='./images/indexbtm1.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>官网编辑</div>
							<div>对小程序官网模块化编辑</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img2]: true })}>
							<img src='./images/indexbtm2.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>新增员工</div>
							<div>在企业通讯录中快速新增员工</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img3]: true })}>
							<img src='./images/indexbtm3.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>雷达权限管理</div>
							<div>管理员工名片和雷达的启用/停用</div>
						</div>
					</div>
				</div>
				<div className={styles.indexBtmFlex} style={{ marginTop: '25px' }}>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img4]: true })}>
							<img src='./images/indexbtm4.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>商品管理</div>
							<div>对商城中商品编辑</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img5]: true })}>
							<img src='./images/indexbtm5.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>订单管理</div>
							<div>查询和管理订单发货</div>
						</div>
					</div>
					<div>
						<div className={classnames({ [styles.img]: true, [styles.img6]: true })}>
							<img src='./images/indexbtm6.png' />
						</div>
						<div className={styles.indexBtm_span}>
							<div className={styles.indexBtm_span_num}>售后订单管理</div>
							<div>快速进行退款售后服务</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default connect(({ home, loading }) => ({ home, loading }))(Form.create()(Dashboard))
