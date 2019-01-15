import React, { Fragment } from "react";
import { connect } from "dva";
import { Table, Row, Col, Card, Form } from "antd";
import styles from "../TableList.less";

const FormItem = Form.Item;

const UserDetail = ({
  userDetail,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { data } = userDetail;

  //定义表头
  const columns = [
    {
      title: "设备ID",
      dataIndex: "deviceId",
      render: (text, record) => {
        return <div>{record.deviceId}</div>;
      }
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
      render: (text, record) => {
        return <div>{record.deviceName}</div>;
      }
    },
    {
      title: "所属产品",
      dataIndex: "productName",
      render: (text, record) => {
        return <div>{record.productName}</div>;
      }
    },
    {
      title: "PID",
      dataIndex: "productId",
      render: (text, record) => {
        return <div>{record.productId}</div>;
      }
    },
    {
      title: "产品类型",
      dataIndex: "categoryName",
      render: (text, record) => {
        return <div>{record.categoryName}</div>;
      }
    },
    {
      title: "添加方式",
      dataIndex: "connectType",
      render: (text, record) => {
        return <div>{record.connectType}</div>;
      }
    }
  ];

  return (
    <div className={styles.tableList}>
      <Card title="基本信息">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="应用">
                    <label>{data.appSource}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="注册账号">
                    <label>{data.mobile}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="手机号">
                    <label>{data.mobile}</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="昵称">
                    <label>{data.nickName}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="注册时间">
                    <label>{data.createdTime}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="绑定设备">
                    <label style={{ fontWeight: "bold" }}>{data.deviceNum}个设备</label>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>
      <Card style={{ marginTop: 20 }} title="绑定设备列表">
        <Table
          columns={columns}
          dataSource={data.devices}
          bordered={false}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default connect(({ userDetail, loading }) => ({
  userDetail,
  loading: loading.models.userDetail
}))(Form.create()(UserDetail));