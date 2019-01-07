import React, {Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Pagination,
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
} from 'antd';
import styles from '../TableList.less';
import $ from 'jquery';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;

const formItemLayout = {
  labelCol: {span: 3},
  wrapperCol: {span: 12},
};

const Devices = ({
  devices,
  loading,
  dispatch,
  formValues, //搜索条件
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    setFieldsValue,
    getFieldsValue,
  },
}) => {
  let {data, pagination, searchList, pageindex, pagesize} = devices;

  //定义表头
  const columns = [
    {
      title: '设备名称/ID',
      dataIndex: 'nameAndID',
      render: (text, record) => {
        return (
          <div>
            <div style={{color: '#272727'}}>{record.nameAndID.deviceName}</div>
            <div style={{color: '#B3B3B3'}}>{record.nameAndID.deviceId}</div>
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'states',
      render: (text, record) => {
        return (
          <div>
            <div style={{color: '#40D4D4'}}>{record.states.isAct}</div>
            <div style={{color: '#B3B3B3'}}>{record.states.status}</div>
          </div>
        );
      },
    },
    {
      title: '所属产品/生产UUID',
      dataIndex: 'productsAndUUID',
      render: (text, record) => {
        return (
          <div>
            <div style={{color: '#272727'}}>
              {record.productsAndUUID.productName}
            </div>
            <div style={{color: '#B3B3B3'}}>{record.productsAndUUID.uuid}</div>
          </div>
        );
      },
    },
    {
      title: '绑定用户/渠道',
      dataIndex: 'mobileAndSource',
      render: (text, record) => {
        return (
          <div>
            <div style={{color: '#272727'}}>
              {record.mobileAndSource.mobile}
            </div>
            <div style={{color: '#B3B3B3'}}>
              {record.mobileAndSource.source}
            </div>
          </div>
        );
      },
    },
    {
      title: '首次激活',
      dataIndex: 'firstActTime',
      render: (text, record) => {
        return <div>{moment (text).format ('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: '最近激活',
      dataIndex: 'lastActTime',
      render: (text, record) => {
        return <div>{moment (text).format ('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: '最近更新',
      dataIndex: 'updateTime',
      render: (text, record) => {
        return <div>{moment (text).format ('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        if (record.operation == '激活') {
          return (
            <div>
              <div>
                <Fragment>
                  <a
                    value={record.nameAndID.deviceId}
                    onClick={toLog.bind (this)}
                  >
                    日志
                  </a>
                </Fragment>
              </div>
              <div>
                <Fragment>
                  <a
                    value={record.nameAndID.deviceId}
                    onClick={toDetail.bind (this)}
                  >
                    设备详情
                  </a>
                </Fragment>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <Fragment>
                <a
                  value={record.nameAndID.deviceId}
                  onClick={toLog.bind (this)}
                >
                  日志
                </a>
              </Fragment>
            </div>
          );
        }
      },
    },
  ];

  const toLog = e => {
    e.context.router.push ({
      pathname: './devicelogs',
      query: {
        deviceId: e.value,
      },
    });
  };

  const toDetail = e => {
    e.context.router.push ({
      pathname: './deviceDetail',
      query: {
        deviceId: e.value,
      },
    });
  };
  //查询条件
  const handleSearch = e => {
    e.preventDefault ();
    let values = getFieldsValue ();
    let actTimeEnd = null;
    try {
      actTimeEnd = values.firstActivated[1].format (dateFormat);
    } catch (error) {}
    let actTimeStart = null;
    try {
      actTimeStart = values.firstActivated[0].format (dateFormat);
    } catch (error) {}
    let lastActTimeEnd = null;
    try {
      lastActTimeEnd = values.recentActivated[1].format (dateFormat);
    } catch (error) {}
    let lastActTimeStart = null;
    try {
      lastActTimeStart = values.recentActivated[0].format (dateFormat);
    } catch (error) {}
    let updateTimeEnd = null;
    try {
      updateTimeEnd = values.recentUpdates[0].format (dateFormat);
    } catch (error) {}
    let updateTimeStart = null;
    try {
      updateTimeStart = values.recentUpdates[0].format (dateFormat);
    } catch (error) {}
    let _value = {
      actTimeEnd: actTimeEnd,
      actTimeStart: actTimeStart,
      deviceId: values.deviceId == null || values.deviceId == ''
        ? null
        : values.deviceId,
      deviceName: values.deviceName == null || values.deviceName == ''
        ? null
        : values.deviceName,
      firstRow: null,
      isAct: values.isAct == null || values.isAct == '' ? null : values.isAct,
      lastActTimeEnd: lastActTimeEnd,
      lastActTimeStart: lastActTimeStart,
      mobile: values.mobile == null || values.mobile == ''
        ? null
        : values.mobile,
      pageNum: pageindex,
      pageRows: pagesize,
      productId: values.productId == null || values.productId == ''
        ? null
        : values.productId,
      source: values.source == null || values.source == ''
        ? null
        : values.source,
      status: values.status == null || values.status == ''
        ? null
        : values.status,
      updateTimeEnd: updateTimeEnd,
      updateTimeStart: updateTimeStart,
      uuid: values.uuid == null || values.uuid == '' ? null : values.uuid,
    };
    console.log (_value);
    if (JSON.stringify (_value) == '{}') {
      message.warning ('请选择查询条件');
      return;
    }
    //赛选数据
    dispatch ({
      type: 'devices/queryRule',
      payload: _value,
    });

    //保存查询条件
    dispatch ({
      type: 'devices/searchList',
      payload: _value,
    });
  };
  //重置
  const handleFormReset = () => {
    const fields = getFieldsValue ();
    for (let item in fields) {
      if ({}.hasOwnProperty.call (fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue (fields);
    dispatch ({
      type: 'devices/clearData',
    });
    //重置查询所有
    let _ars = {};
    dispatch ({
      type: 'devices/queryRule',
      payload: _ars,
    });
    //重置查询条件
    dispatch ({
      type: 'devices/searchList',
      payload: [],
    });
  };

  /**分页合集 start **/
  const showTotal = () => {
    return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
  };
  const onShowSizeChange = (current, pageSize) => {
    const postObj = {
      curPage: current,
      pageRows: pageSize,
    };
    dispatch ({
      type: 'devices/setPage',
      payload: current,
      size: pageSize,
    });
    //判断查询条件
    if (JSON.stringify (searchList) !== '{}') {
      let _c = {};
      _c = $.extend (postObj, searchList);
      dispatch ({
        type: 'devices/queryRule',
        payload: postObj,
      });
    } else {
      dispatch ({
        type: 'devices/queryRule',
        payload: postObj,
      });
    }
  };

  const getNowPage = (current, pageSize) => {
    let postObj = {
      curPage: current,
      pageRows: pageSize,
    };
    dispatch ({
      type: 'devices/setPage',
      payload: current,
      size: pageSize,
    });
    //判断查询条件
    if (JSON.stringify (searchList) !== '{}') {
      let _c = {};
      _c = $.extend (postObj, searchList);
      dispatch ({
        type: 'devices/queryRule',
        payload: postObj,
      });
    } else {
      dispatch ({
        type: 'devices/queryRule',
        payload: postObj,
      });
    }
  };
  /**分页合集 end **/

  const dateFormat = 'YYYY-MM-DD';

  return (
    <div>
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form onSubmit={handleSearch} layout="inline">
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                <Col md={8} sm={24}>
                  <FormItem label="设备ID" style={{marginLeft: 18}}>
                    {getFieldDecorator ('deviceId') (
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="设备名称" style={{marginLeft: 4}}>
                    {getFieldDecorator ('deviceName') (
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="生产UUID">
                    {getFieldDecorator ('uuid') (<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                <Col md={8} sm={24}>
                  <FormItem label="产品ID" style={{marginLeft: 18}}>
                    {getFieldDecorator ('productId') (
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="绑定用户" style={{marginLeft: 4}}>
                    {getFieldDecorator ('mobile') (<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="是否激活" style={{marginLeft: 4}}>
                    {getFieldDecorator ('isAct') (
                      <Select placeholder="全部" style={{width: '100%'}}>
                        <Option value={0}>未激活</Option>
                        <Option value={1}>已激活</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                <Col md={8} sm={24}>
                  <FormItem label="是否在线" style={{marginLeft: 4}}>
                    {getFieldDecorator ('status') (
                      <Select placeholder="全部" style={{width: '100%'}}>
                        <Option value={0}>离线</Option>
                        <Option value={1}>在线</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{marginLeft: 30}}>
                    {getFieldDecorator ('products') (
                      <Select placeholder="全部" style={{width: '100%'}}>
                        <Option value={1}>11111</Option>
                        <Option value={2}>22222</Option>
                        <Option value={3}>33333</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="渠道" style={{marginLeft: 30}}>
                    {getFieldDecorator ('source') (
                      <Select placeholder="全部" style={{width: '100%'}}>
                        <Option value={0}>Android</Option>
                        <Option value={1}>IOS</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                <Col md={8} sm={24}>
                  <FormItem label="首次激活" style={{marginLeft: 4}}>
                    {getFieldDecorator ('firstActivated') (
                      <RangePicker format={dateFormat} />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="最近激活" style={{marginLeft: 4}}>
                    {getFieldDecorator ('recentActivated') (
                      <RangePicker format={dateFormat} />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="最近更新" style={{marginLeft: 4}}>
                    {getFieldDecorator ('recentUpdates') (
                      <RangePicker format={dateFormat} />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{md: 8, lg: 24, xl: 48}}>
                <div style={{overflow: 'hidden'}}>
                  <span style={{float: 'right', marginBottom: 24}}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{marginLeft: 8}} onClick={handleFormReset}>
                      重置
                    </Button>
                  </span>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </Card>

      <Card style={{marginTop: 20}} title="设备列表">
        <Table
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
        />
        <Pagination
          style={{
            padding: '20px 0 0',
            textAlign: 'center',
            marginBottom: '10px',
          }}
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
};

export default connect (({devices, loading}) => ({
  devices,
  loading: loading.models.devices,
})) (Form.create () (Devices));
