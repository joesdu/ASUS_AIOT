import React, { Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Pagination, Table, Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import styles from '../TableList.less';
import styles2 from '../main.less';
import $ from 'jquery';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 },
}

const UserFeedback = ({
  userFeedback,
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
    let { data, pagination, searchList, pageindex, pagesize } = userFeedback

  let _datas = []
  //角色信息
  try {
    _datas = data
  } catch (e) { }

  //定义表头
  const columns = [
    {
      title: '反馈内容',
      dataIndex: 'description',
      render: (text, record) => {
        return (
          <div>{record.description}</div>
        );
      }
    },
    {
      title: '用户账号/昵称',
      dataIndex: 'mobileAndNickname',
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: '#40D4D4' }}>{record.mobile}</div>
            <div style={{ color: '#B3B3B3' }}>{record.nickname}</div>
          </div>
        );
      }
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      render: (text, record) => {
        return (
          <div style={{ color: '#40D4D4' }}>{record.productName}</div>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'isProcessed',
      render: (text, record) => {
        if (record.isProcessed== '已处理') {
          return <div style={{ color: '#40D4D4' }}>已处理</div>
        } else {
          return <div style={{ color: '#1E1E1E' }}>未处理</div>
        }
      }
    },
    {
      title: '反馈时间',
      dataIndex: 'createTime',
      render: (text, record) => {
        return (
          <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        return (
          <div>
            <div>
              <Fragment>
                <a onClick={markClick(record.feedbackId)}>标记</a>
              </Fragment>
            </div>
          </div>
        );
      }
    }
  ]

  const markClick = (e) => {
    

  }

  //查询条件
  const handleSearch = (e) => {
    e.preventDefault();
    let values = getFieldsValue()
    if (JSON.stringify(values) == "{}") {
      message.warning('请选择查询条件')
      return
    }
    //赛选数据
    dispatch({
      type: 'userFeedback/queryRule',
      payload: values
    })

    //保存查询条件
    dispatch({
      type: 'userFeedback/searchList',
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
      type: 'userFeedback/clearData',
    })
    //重置查询所有
    let _ars = {}
    dispatch({
      type: 'userFeedback/queryRule',
      payload: _ars
    })
    //重置查询条件
    dispatch({
      type: 'userFeedback/searchList',
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
      "pageRows": pageSize
    }
    dispatch({
      type: 'userFeedback/setPage',
      payload: current,
      size: pageSize
    })
    //判断查询条件
    if (JSON.stringify(searchList) !== '{}') {
      let _c = {}
      _c = $.extend(postObj, searchList)
      dispatch({
        type: 'userFeedback/queryRule',
        payload: postObj,
      })
    } else {
      dispatch({
        type: 'userFeedback/queryRule',
        payload: postObj,
      })
    }
  }

  const getNowPage = (current, pageSize) => {
    let postObj = {
      "curPage": current,
      "pageRows": pageSize
    }
    dispatch({
      type: 'userFeedback/setPage',
      payload: current,
      size: pageSize
    })
    //判断查询条件
    if (JSON.stringify(searchList) !== '{}') {
      let _c = {}
      _c = $.extend(postObj, searchList)
      dispatch({
        type: 'userFeedback/queryRule',
        payload: postObj,
      })
    } else {
      dispatch({
        type: 'userFeedback/queryRule',
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
                  <FormItem label="应用" style={{ marginLeft: 30 }} >
                    {getFieldDecorator('applied')(
                      <Select placeholder="全部" style={{ width: '100%' }} disabled>
                        <Option value={1}>11111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{ marginLeft: 30 }}>
                    {getFieldDecorator('productId')(
                      <Select placeholder="全部" style={{ width: '100%' }}>
                        <Option value={1}>11111</Option>
                        <Option value={2}>22222</Option>
                        <Option value={2}>33333</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="状态" style={{ marginLeft: 30 }}>
                    {getFieldDecorator('isProcessed')(
                      <Select placeholder="全部" style={{ width: '100%' }}>
                        <Option value={0}>未处理</Option>
                        <Option value={1}>已处理</Option>                        
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="反馈时间" style={{ marginLeft: 4 }}>
                    {getFieldDecorator('recentActivated')(
                      <RangePicker />
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
  )
}

export default connect(({ userFeedback, loading }) =>
    ({ userFeedback, loading: loading.models.userFeedback, }))(Form.create()(UserFeedback))
