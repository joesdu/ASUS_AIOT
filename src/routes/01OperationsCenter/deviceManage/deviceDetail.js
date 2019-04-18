import React from "react";
import { connect } from "dva";
import { Row, Col, Card, Form } from "antd";
import styles from "../../TableList.less";

const DeviceDetail = ({
  deviceDetail
}) => {
  let { detailData } = deviceDetail;

  const getOnline = key => {
    if (key === 0 || key === "0") {
      return <label>否</label>;
    } else if (key === 1 || key === "1") {
      return <label>是</label>;
    } else {
      return <label></label>;
    }
  };

  const getSource = key => {
    if (key === 0 || key === "0") {
      return <label>Android</label>;
    } else if (key === 1 || key === "1") {
      return <label>IOS</label>;
    } else {
      return <label></label>;
    }
  };

  const getCard = (data) => {
    try {
      if (parseInt(data.length) <= 0) {
        return;
      }
      else {
        return (
          <Card style={{ marginTop: 20 }} title="设备运行状态">
            <div className={styles.tableListForm}>
              <Form layout="inline">
                {getRows(data)}
              </Form>
            </div>
          </Card>
        );
      }
    } catch (error) { }
  }

  const getRows = (data) => {
    try {
      let rowNum = parseInt((data.length - 1) / 3) + 1;
      const children = [];
      let index = 0;
      for (let i = 1; i <= rowNum; i++) {
        let functionStatus = [];
        if (data.length >= i * 3)
          functionStatus = [data[index], data[index + 1], data[index + 2]];
        else {
          let temp = i * 3 - data.length;
          if (temp == 2) {
            functionStatus = [data[index]];
          }
          if (temp == 1) {
            functionStatus = [data[index], data[index + 1]];
          }
        }
        children.push(
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {getCol(functionStatus)}
          </Row>
        );
        index = index + 3;
      }
      return children;
    } catch (error) { }
  };

  const getCol = (data) => {
    try {
      const children = [];
      for (let i = 0; i < data.length; i++) {
        children.push(
          <Col md={8} sm={24}>
            <Form.Item label={data[i].name}>
              <label>{data[i].value}</label>
            </Form.Item>
          </Col>
        );
      }
      return children;
    } catch (error) { }
  };

  return (
    <div>
      <Card title="基本信息">
        <div className={styles.tableListForm}>
          <Form layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="设备ID">
                  <label>{detailData.deviceId}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="生产UUID">
                  <label>{detailData.uuid}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="自定义名称">
                  <label>{detailData.customName}</label>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="默认名称">
                  <label>{detailData.defaultName}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="所属产品">
                  <label>{detailData.productName}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="产品ID">
                  <label>{detailData.productCode}</label>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="首次激活时间">
                  <label>{detailData.firstActTime}</label>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>

      <Card style={{ marginTop: 20 }} title="设备激活信息">
        <div className={styles.tableListForm}>
          <Form layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="是否激活">
                  <label>是</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="首次激活时间">
                  <label>{detailData.firstActTime}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="最近激活时间">
                  <label>{detailData.lastActTime}</label>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="更新时间">
                  <label>{detailData.updateTime}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="当前在线">
                  {getOnline(detailData.onlineStatus)}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="绑定用户">
                  <label>{detailData.userMobile}</label>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="经纬度">
                  <label>
                    {detailData.lng}，{detailData.lat}
                  </label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="地理位置">
                  <label>{detailData.city}</label>
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="渠道">
                  <label>{getSource(detailData.source)}</label>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      {getCard(detailData.functionStatus)}
    </div>
  );
};

export default connect(({ deviceDetail, loading }) => ({
  deviceDetail,
  loading: loading.models.deviceDetail
}))(Form.create()(DeviceDetail));
