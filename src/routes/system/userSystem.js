import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Pagination, Switch, Table, Row, Col, Card, Form, Input, Select, Button,  message } from 'antd';
import styles from '../TableList.less';
import styles2 from '../main.less';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import DescriptionList from '../../components/DescriptionList';

import { storeIds, userIds } from '../../utils/config';
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 12 },
}

const UserSystem = ({
	userSystem,
	loading,
	dispatch,
	formValues, //搜索条件
	form: {
		getFieldDecorator,
		validateFieldsAndScroll,
		validateFields,
		setFieldsValue,
		getFieldsValue
	},
}) => {
	let { data, pagination, searchList, pageindex, pagesize } = userSystem

	let _datas = []
	//角色信息
	try {
		_datas = data.data.list
	} catch (e) { }

	//定义表头  
	const columns = [
		{
			title: '用户名',
			dataIndex: 'name',
		},
		{
			title: '姓名/手机号',
			dataIndex: 'phone',
			render: (text, record) => {
				return (
					<div>
						<div>{record.username}</div>
						<div>{record.phone}</div>
					</div>
				)
			}
		},
		{
			title: '所属组织',
			dataIndex: 'orgName',
		},
		{
			title: '用户角色',
			dataIndex: 'designation',
		},
		{
			title: '状态',
			dataIndex: 'available',
			render: (text, record) => {
				if (parseInt(text) == 2) {
					return <Switch checkedChildren='开' unCheckedChildren='关' />
				} else {
					return <Switch checkedChildren='开' unCheckedChildren='关' defaultChecked />
				}
			}
		},
		{
			title: '最近登录时间',
			dataIndex: 'loginTime',
			render: (text, record) => {
				return (
					<div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
				)
			}
		},
		{
			title: '操作',
			render: (text, record) => (
				<div>
					<Fragment>
						<a>查看</a>
					</Fragment>
				</div>
			),
		},
	]
	//查询条件
	const handleSearch = (e) => {
		e.preventDefault();
		let values = getFieldsValue()
		if (JSON.stringify(values) == "{}") {
			message.warning('请选择查询条件')
			return
		}
		//赛选数据 
		values.storeId = storeIds
		dispatch({
			type: 'userSystem/queryRule',
			payload: values
		})

		//保存查询条件
		dispatch({
			type: 'userSystem/searchList',
			payload: values
		})
	}
	//重置
	const handleFormReset = () => {
		const fields = getFieldsValue()
		for (let item in fields) {
			if ({}.hasOwnProperty.call(fields, item)) {
				if (fields[item] instanceof Array) {
					fields[item] = []
				} else {
					fields[item] = undefined
				}
			}
		}
		setFieldsValue(fields)
		dispatch({
			type: 'userSystem/clearData',
		})
		//重置查询所有
		let _ars = {}
		_ars.storeId = storeIds
		dispatch({
			type: 'userSystem/queryRule',
			payload: _ars
		})
		//重置查询条件
		dispatch({
			type: 'userSystem/searchList',
			payload: []
		})
	}

	/**分页合集 start **/
	const showTotal = (total) => {
		return `共 ${pagination.total} 条 第 ${pagination.current} / ${pagination.pageCount} 页`;
	}
	const onShowSizeChange = (current, pageSize) => {
		const postObj = {
			"curPage": current,
			"pageRows": pageSize,
			'storeId': storeIds
		}
		dispatch({
			type: 'userSystem/setPage',
			payload: current,
			size: pageSize
		})
		//判断查询条件
		if (JSON.stringify(searchList) !== '{}') {
			let _c = {}
			_c = $.extend(postObj, searchList)
			dispatch({
				type: 'userSystem/queryRule',
				payload: postObj,
			})
		} else {
			dispatch({
				type: 'userSystem/queryRule',
				payload: postObj,
			})
		}
	}

	const getNowPage = (current, pageSize) => {
		let postObj = {
			"curPage": current,
			"pageRows": pageSize,
			'storeId': storeIds
		}
		dispatch({
			type: 'userSystem/setPage',
			payload: current,
			size: pageSize
		})
		//判断查询条件
		if (JSON.stringify(searchList) !== '{}') {
			let _c = {}
			_c = $.extend(postObj, searchList)
			dispatch({
				type: 'userSystem/queryRule',
				payload: postObj,
			})
		} else {
			dispatch({
				type: 'userSystem/queryRule',
				payload: postObj,
			})
		}
	}
	/**分页合集 end **/

	return (
		<div>
			<Card>
				<div className={styles.tableList}>
					<div className={styles.tableListForm}>
						<Form onSubmit={handleSearch} layout="inline">
							<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
								<Col md={8} sm={24}>
									<FormItem label="手机号">
										{getFieldDecorator('phone')(
											<Input placeholder="输入名称" />
										)}
									</FormItem>
								</Col>
								<Col md={8} sm={24}>
									<FormItem label="名称">
										{getFieldDecorator('name')(
											<Input placeholder="输入名称" />
										)}
									</FormItem>
								</Col>
								<Col md={8} sm={24}>
									<FormItem
										label="角色"
									>
										{getFieldDecorator('roleId')(
											<Select placeholder="全部" style={{ width: '100%' }}>
												<Option value='1'>下拉1</Option>
												<Option value='2'>下拉2</Option>
											</Select>
										)}
									</FormItem>
								</Col>
							</Row>
							<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
								<Col md={8} sm={24}>
									<FormItem label="状态">
										{getFieldDecorator('available')(
											<Select placeholder="全部" style={{ width: '100%' }}>
												<Option value={1}>开</Option>
												<Option value={2}>关</Option>
											</Select>
										)}
									</FormItem>
								</Col>
								<div style={{ overflow: 'hidden' }}>
									<span style={{ float: 'right', marginBottom: 24 }}>
										<Button type="primary" htmlType="submit">查询</Button>
										<Button style={{ marginLeft: 8 }} onClick={handleFormReset}>重置</Button>
									</span>
								</div>
							</Row>
						</Form>
					</div>
				</div>
			</Card>
			<Card style={{ marginTop: 20 }} title='设备列表'>
				<Table
					columns={columns}
					dataSource={_datas}
					bordered
					pagination={false}
				/>
				<Pagination
					style={{ padding: "20px 0 0", textAlign: "center", marginBottom: '10px' }}
					showSizeChanger
					showQuickJumper
					showTotal={showTotal}
					onChange={getNowPage}
					onShowSizeChange={onShowSizeChange}
					defaultCurrent={1}
					total={pagination.total}
				/>
			</Card>
		</div>
	);
}

export default connect(({ userSystem, loading }) =>
	({ userSystem, loading: loading.models.userSystem, }))(Form.create()(UserSystem))
