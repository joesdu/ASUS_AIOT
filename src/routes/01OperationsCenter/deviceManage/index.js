import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Link } from "dva/router";
import { Table, Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from "antd";
import styles from "../../TableList.less";
import config from "../../../utils/config";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Devices = ({
  devices,
  dispatch,
  form: {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { deviceListData, deviceProductListData, pagination, searchList } = devices;
  //定义表头
  const columns = [
    {
      title: "设备名称/ID",
      dataIndex: "nameAndID",
      width: 250,
      align: 'left',
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.nameAndID.deviceName}</div>
            <div style={{ color: "#B3B3B3" }}>{record.nameAndID.deviceId}</div>
          </div>
        );
      }
    },
    {
      title: "状态",
      width: 150,
      dataIndex: "states",
      render: (text, record) => {
        if (record.states.isAct === '激活') {
          return (
            <div>
              <div style={{ color: "#40D4D4" }}>{record.states.isAct}</div>
              <div style={{ color: "#B3B3B3" }}>{record.states.status}</div>
            </div>
          );
        } else {
          return (
            <div>
              <div style={{ color: "#272727" }}>{record.states.isAct}</div>
              <div style={{ color: "#B3B3B3" }}>{record.states.status}</div>
            </div>
          );
        }
      }
    },
    {
      title: "所属产品/生产UUID",
      dataIndex: "productsAndUUID",
      width: 250,
      align: 'left',
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.productsAndUUID.productName}</div>
            <div style={{ color: "#B3B3B3" }}>{record.productsAndUUID.uuid}</div>
          </div>
        );
      }
    },
    {
      title: "绑定用户/渠道",
      dataIndex: "mobileAndSource",
      align: 'left',
      width: 150,
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.mobileAndSource.mobile}</div>
            <div style={{ color: "#B3B3B3" }}>{record.mobileAndSource.source}</div>
          </div>
        );
      }
    },
    {
      title: "首次激活",
      dataIndex: "firstActTime",
      render: (text, record) => {
        if (record.operation === "激活" || record.firstActTime != null) {
          return <div style={{ color: "#B3B3B3" }}>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
        }
      }
    },
    {
      title: "最近激活",
      dataIndex: "lastActTime",
      render: (text, record) => {
        if (record.operation === "激活" || record.lastActTime != null) {
          return <div style={{ color: "#B3B3B3" }}>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
        }
      }
    },
    {
      title: "最近更新",
      dataIndex: "updateTime",
      render: (text, record) => {
        if (record.operation === "激活" || record.updateTime != null) {
          return <div style={{ color: "#B3B3B3" }}>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
        }
      }
    },
    {
      title: "操作",
      width: 100,
      dataIndex: "operation",
      render: (text, record) => {
        if (record.operation === "激活") {
          return (
            <div>
              <div>
                <Fragment>
                  <Link to={{ pathname: `/devicesLogs`, state: { deviceId: record.nameAndID.deviceId } }}>日志</Link>
                </Fragment>
              </div>
              <div>
                <Fragment>
                  <Link to={{ pathname: `/devicesDetail`, state: { deviceId: record.nameAndID.deviceId } }}>设备详情</Link>
                </Fragment>
              </div>
            </div>
          );
        } else {
          return (
            <Fragment>
              <Link to={{ pathname: `/devicesLogs`, state: { deviceId: record.nameAndID.deviceId } }}>日志</Link>
            </Fragment>
          );
        }
      }
    }
  ];

  const getJsonPrams = (parm, pageNum, pageRows) => {
    let actTimeEnd = null;
    try {
      actTimeEnd = parm.firstActivated[1].format(dateFormat);
    } catch (error) { }
    let actTimeStart = null;
    try {
      actTimeStart = parm.firstActivated[0].format(dateFormat);
    } catch (error) { }
    let lastActTimeEnd = null;
    try {
      lastActTimeEnd = parm.recentActivated[1].format(dateFormat);
    } catch (error) { }
    let lastActTimeStart = null;
    try {
      lastActTimeStart = parm.recentActivated[0].format(dateFormat);
    } catch (error) { }
    let updateTimeEnd = null;
    try {
      updateTimeEnd = parm.recentUpdates[1].format(dateFormat);
    } catch (error) { }
    let updateTimeStart = null;
    try {
      updateTimeStart = parm.recentUpdates[0].format(dateFormat);
    } catch (error) { }
    let isAct = null;
    if (parm.isAct == "未激活") {
      isAct = 0;
    } else if (parm.isAct == "已激活") {
      isAct = 1;
    }
    let source = null;
    if (parm.source == "Android") {
      source = 0;
    } else if (parm.source == "IOS") {
      source = 1;
    }
    let status = null;
    if (parm.status == "离线") {
      status = 0;
    } else if (parm.status == "在线") {
      status = 1;
    }
    let productId = null;
    if (parm.productId == null || parm.productId == "" || parm.productId == "全部") {
      productId = null;
    } else {
      productId = parm.productId;
    }
    return {
      userToken: config.userToken,
      actTimeEnd: actTimeEnd,
      actTimeStart: actTimeStart,
      deviceId: parm.deviceId == null || parm.deviceId == "" ? null : parm.deviceId,
      deviceName: parm.deviceName == null || parm.deviceName == "" ? null : parm.deviceName,
      firstRow: null,
      isAct: isAct,
      lastActTimeEnd: lastActTimeEnd,
      lastActTimeStart: lastActTimeStart,
      mobile: parm.mobile == null || parm.mobile == "" ? null : parm.mobile,
      pageNum: pageNum,
      pageRows: pageRows,
      productId: productId,
      source: source,
      status: status,
      updateTimeEnd: updateTimeEnd,
      updateTimeStart: updateTimeStart,
      uuid: parm.uuid == null || parm.uuid == "" ? null : parm.uuid
    };
  };

  //查询条件
  const handleSearch = e => {
    e.preventDefault();
    let values = getFieldsValue();
    if (JSON.stringify(_value) == "{}") {
      message.warning("请选择查询条件");
      return;
    }
    let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
    //赛选数据
    dispatch({ type: "devices/devicesList", payload: _value });
    //保存查询条件
    dispatch({ type: "devices/searchList", payload: _value });
  };
  //重置
  const handleFormReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    dispatch({ type: "devices/clearData" });
    dispatch({ type: "devices/productList" });
    //重置查询所有
    let _ars = getJsonPrams(null, 0, 10);
    dispatch({ type: "devices/devicesList", payload: _ars });
    //重置查询条件
    dispatch({ type: "devices/searchList", payload: [] });
  };

  /**分页合集 start **/
  let paginationObj = {
    style: { padding: "20px 0 0", textAlign: "center", marginBottom: "10px" },
    total: pagination.total,
    defaultCurrent: 1,
    pageSize: pagination.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (current, pageSize) => {
      let values = getFieldsValue();
      let postObj = getJsonPrams(values, current - 1, pageSize);
      //判断查询条件
      if (JSON.stringify(searchList) !== "{}") {
        dispatch({ type: "devices/devicesList", payload: postObj });
      } else {
        dispatch({ type: "devices/devicesList", payload: postObj });
      }
    },
    onChange: (current, pageSize) => {
      let values = getFieldsValue();
      let postObj = getJsonPrams(values, current - 1, pageSize);
      //判断查询条件
      if (JSON.stringify(searchList) !== "{}") {
        dispatch({ type: "devices/devicesList", payload: postObj });
      } else {
        dispatch({ type: "devices/devicesList", payload: postObj });
      }
    },
    showTotal: () => {
      return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
    }
  }
  /**分页合集 end **/

  const dateFormat = "YYYY-MM-DD";

  return (
    <div>
      <Card>
        <div className={styles.tableListForm}>
          <Form onSubmit={handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="设备ID" style={{ marginLeft: 18 }}>
                  {getFieldDecorator("deviceId")(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="设备名称" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("deviceName")(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="生产UUID">
                  {getFieldDecorator("uuid")(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="绑定用户" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("mobile")(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="是否激活" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("isAct", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }}>
                      <Option value={"全部"}>全部</Option>
                      <Option value={"未激活"}>未激活</Option>
                      <Option value={"已激活"}>已激活</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="是否在线" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("status", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }}>
                      <Option value={"全部"}>全部</Option>
                      <Option value={"离线"}>离线</Option>
                      <Option value={"在线"}>在线</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="产品" style={{ marginLeft: 30 }}>
                  {getFieldDecorator("productId", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }}>
                      <Option value={null}>全部</Option>
                      {deviceProductListData.map(product => (
                        <Option value={product.productId}>
                          {product.productName}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="渠道" style={{ marginLeft: 30 }}>
                  {getFieldDecorator("source", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }}>
                      <Option value={"全部"}>全部</Option>
                      <Option value={"Android"}>Android</Option>
                      <Option value={"IOS"}>IOS</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="首次激活" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("firstActivated")(
                    <RangePicker format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="最近激活" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("recentActivated")(
                    <RangePicker format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="最近更新" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("recentUpdates")(
                    <RangePicker format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <div style={{ overflow: "hidden" }}>
                <span style={{ float: "right", marginRight: 14 }}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 14 }} onClick={handleFormReset}>重置</Button>
                </span>
              </div>
            </Row>
          </Form>
        </div>
      </Card>

      <Card style={{ marginTop: 20 }} title="设备列表">
        <Table columns={columns} dataSource={deviceListData} bordered={false} pagination={paginationObj} />
      </Card>
    </div>
  );
};

export default connect(({ devices, loading }) => ({
  devices,
  loading: loading.models.devices
}))(Form.create()(Devices));
