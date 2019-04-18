import React from "react";
import { connect } from "dva";
import { Table, Row, Col, Card, Form, Select, Divider } from "antd";
import styles from "./index.less";

const ReactHighcharts = require("react-highcharts");
const { Option } = Select;

const ActivelyData = ({
  activelyData,
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
    chart: { type: "areaspline", height: 450 },
    xAxis: { categories: activeData.dateArray },
    yAxis: { title: { text: "活跃设备/个" }, plotLines: [{ value: 0, width: 1, color: "#1890FF" }] },
    title: { text: null },
    plotOptions: { areaspline: { color: '#1890FF', fillOpacity: 0.5 } },
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
      <Card bordered={false}>
        <div className={styles.tableListForm}>
          <Form layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="产品" style={{ marginLeft: 30 }}>{getFieldDecorator("productId", { initialValue: "全部" })(
                  <Select placeholder="全部" onChange={handleChange} style={{ width: "100%" }}>
                    <Option value={0}>全部</Option>
                    {deviceProductListData.map(product => (
                      <Option value={product.productId}>
                        {product.productName}
                      </Option>
                    ))}
                  </Select>
                )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>

      <div style={{ marginTop: "15px" }} className={styles.indexTop} bordered={false}>
        <Card className={styles.indexTopL} bordered={false}>
          <div className={styles.indexCont}>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日活跃</span>
              <span style={{ color: "#1890FF" }}>{activeSummaryData.todayActive}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>昨日活跃&nbsp;&nbsp;</span>
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
              <span style={{ color: "#1890FF" }}>{activeSummaryData.activeRate}&nbsp;%</span>
              <div className={styles.indexBottom_text}>
                <span>昨日活跃占比&nbsp;&nbsp;</span>
                <span>{activeSummaryData.yesterdayActiveRate}&nbsp;%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: "15px" }} bordered={false}>
        <div className={styles.indexData}>
          <div className={styles.indexData_top}>
            <span>活跃数据趋势</span>
            <ul className={styles.indexData_topUL} style={{ float: "right" }}>
              <li className={selected == 7 ? styles.active : ""} onClick={getData.bind(this, 7)}>近7天</li>
              <li className={selected == 15 ? styles.active : ""} onClick={getData.bind(this, 15)}>近15天</li>
              <li className={selected == 30 ? styles.active : ""} onClick={getData.bind(this, 30)}>近30天</li>
            </ul>
            <Divider />
            <div style={{ width: "100%", marginTop: "24px" }}>
              <ReactHighcharts config={activeConfig} />
            </div>
            <Divider />
            <span>活跃数据明细</span>
            <Table columns={columns} dataSource={activeData.listArray} bordered={false} pagination={false} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default connect(({ activelyData, loading }) => ({
  activelyData,
  loading: loading.models.activelyData
}))(Form.create()(ActivelyData));
