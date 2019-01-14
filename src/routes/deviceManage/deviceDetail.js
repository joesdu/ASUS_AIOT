import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Pagination, Table, Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from "antd";
import styles from "../TableList.less";
import styles2 from "../main.less";
import $ from "jquery";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DeviceDetail = ({
  deviceDetail,
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
  let { data } = deviceDetail;

  const getOnline = key => {
    if (key == 0) {
      return <label>否</label>;
    } else {
      return <label>是</label>;
    }
  };

  const getSource = key => {
    if (key == 0) {
      return <label>Android</label>;
    } else {
      return <label>IOS</label>;
    }
  };

  const getRows = key => { };

  return (
    <div>
      <Card title="基本信息">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="设备ID">
                    <label>{data.deviceId}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="生产UUID">
                    <label>{data.uuid}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="自定义名称">
                    <label>{data.customName}</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="默认名称">
                    <label>{data.defaultName}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="所属产品">
                    <label>{data.productName}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="产品ID">
                    <label>{data.productCode}</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="WiFi固件版本">
                    <label>1.2.31-12</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="MCU固件版本">
                    <label>3.33.290-23fd</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="首次激活时间">
                    <label>{data.firstActTime}</label>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>

      <Card title="设备激活信息">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="是否激活">
                    <label>是</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="首次激活时间">
                    <label>{data.firstActTime}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="最近激活时间">
                    <label>{data.lastActTime}</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="更新时间">
                    <label>{data.updateTime}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="当前在线">
                    {getOnline(data.onlineStatus)}
                    <label>是</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="绑定用户">
                    <label>{data.userMobile}</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="经纬度">
                    <label>
                      {data.lng}，{data.lat}
                    </label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="地理位置">
                    <label>{data.city}</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="渠道">
                    <label>{getSource(data.source)}</label>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>

      <Card title="设备运行状态">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="开关">
                    <label>是</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="模式">
                    <label>阅读模式</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="亮度">
                    <label>35</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="色温">
                    <label>3570</label>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default connect(({ deviceDetail, loading }) => ({
  deviceDetail,
  loading: loading.models.deviceDetail
}))(Form.create()(DeviceDetail));
