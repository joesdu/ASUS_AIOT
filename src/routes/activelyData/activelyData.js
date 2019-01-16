import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Select, message } from "antd";
import styles from "./activelyData.less";
import $ from "jquery";
import classnames from "classnames";

const ReactHighcharts = require("react-highcharts");
const FormItem = Form.Item;
const { Option } = Select;

const ActivelyData = ({
  activelyData,
  loading,
  dispatch,
  form: {
    getFieldDecorator
  }
}) => {
  let { activeSummaryData, activeData, deviceProductListData, selected } = activelyData;

  let productID = 0;
  //查询条件
  const handleChange = e => {
    productID = e;
    let active = { userToken: localStorage.getItem("userToken"), period: 7, productId: e };
    //赛选数据
    dispatch({ type: "activelyData/ActiveSummary", payload: active });
    dispatch({ type: "activelyData/DeviceActive", payload: active });
    dispatch({ type: "activelyData/selected", payload: 7 });
  };

  var activeConfig = {
    chart: { height: 450 },
    xAxis: { categories: activeData.dateArray },
    yAxis: { title: { text: "活跃设备/个" }, plotLines: [{ value: 0, width: 1, color: "#808080" }] },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃设备/个", data: activeData.numArray }]
  };

  //定义表头
  const columns = [
    {
      title: "日期",
      dataIndex: "actDate",
      render: (text, record) => {
        return <div>{record.actDate}</div>;
      }
    },
    {
      title: "每日活跃数量",
      dataIndex: "num",
      render: (text, record) => {
        return <div>{record.num}</div>;
      }
    }
  ];

  const getData = k => {
    dispatch({ type: "activelyData/selected", payload: k });
    let active = { userToken: localStorage.getItem("userToken"), period: k, productId: productID };
    dispatch({ type: "activelyData/DeviceActive", payload: active });
  };

  return (
    <div>
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{ marginLeft: 30 }}>{getFieldDecorator("productId", { initialValue: "全部" })(
                    <Select placeholder="全部" onChange={handleChange} style={{ width: "100%" }}>
                      <Option value={0}>全部</Option>
                      {deviceProductListData.map(product => (
                        <Option value={product.productId}>
                          {product.productName}
                        </Option>
                      ))}
                    </Select>
                  )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: "15px" }} className={styles.indexTop}>
        <Card className={styles.indexTopL}>
          <div className={styles.indexCont}>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日活跃</span>
              <span style={{ color: "#1890FF" }}>{activeSummaryData.todayActive}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>昨日激活&nbsp;&nbsp;</span>
                <span>{activeSummaryData.yesterdayActive}&nbsp;</span>
              </div>
            </div>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>近7日活跃</span>
              <span style={{ color: "#1890FF" }}>{activeSummaryData.periodActive}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>上7日活跃&nbsp;&nbsp;</span>
                <span>{activeSummaryData.prePeriodActive}&nbsp;</span>
              </div>
            </div>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日活跃占比</span>
              <span style={{ color: "#1890FF" }}>{activeSummaryData.activeRate * 100} %</span>
              <div className={styles.indexBottom_text}>
                <span>昨日活跃占比&nbsp;&nbsp;</span>
                <span>{activeSummaryData.yesterdayActiveRate * 100} %</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: "15px" }}>
        <div className={styles.indexData}>
          <div className={styles.indexData_top}>
            <span>活跃数据趋势</span>
            <ul className={styles.indexData_topUL} style={{ float: "right" }}>
              <li className={selected == 7 ? styles.active : ""} onClick={getData.bind(this, 7)}>近7天</li>
              <li className={selected == 15 ? styles.active : ""} onClick={getData.bind(this, 15)}>近15天</li>
              <li className={selected == 30 ? styles.active : ""} onClick={getData.bind(this, 30)}>近30天</li>
            </ul>
            <div style={{ width: "100%" }}>
              <ReactHighcharts config={activeConfig} />
            </div>
          </div>
        </div>
      </Card>
      <Card title="活跃数据明细">
        <Table
          columns={columns}
          dataSource={activeData.listArray}
          bordered={false}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default connect(({ activelyData, loading }) => ({
  activelyData,
  loading: loading.models.activelyData
}))(Form.create()(ActivelyData));
