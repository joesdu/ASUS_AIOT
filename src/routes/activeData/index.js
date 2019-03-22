import React from "react";
import { connect } from "dva";
import { Table, Tabs, Row, Col, Card, Form, Select, Divider } from "antd";
import styles from "./index.less";

const ReactHighcharts = require("react-highcharts");
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const ActiveData = ({
  activeData,
  dispatch,
  form: {
    getFieldDecorator
  }
}) => {
  let { activateSummaryData, activateData, deviceProductListData, selected } = activeData;
  //查询条件
  let productID = 0;
  //查询条件
  const handleChange = e => {
    productID = e;
    let activate = { userToken: localStorage.getItem("userToken"), period: 7, productId: e };
    //赛选数据
    dispatch({ type: "activeData/ActivateSummary", payload: activate });
    dispatch({ type: "activeData/Activate", payload: activate });
    dispatch({ type: "activeData/selected", payload: 7 });
  };

  let dailyConfig = {
    chart: { type: "areaspline", height: 450 },
    xAxis: { categories: activateData.dateArray },
    yAxis: { title: { text: "激活设备/个" }, plotLines: [{ value: 0, width: 1, color: "#81BCFF" }] },
    plotOptions: { areaspline: { color: '#1890FF', fillOpacity: 0.5 } },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false },// 隐藏右下角版权
    series: [{ name: "激活设备/个", data: activateData.numArray }]
  };

  let totalConfig = {
    chart: { type: "areaspline", height: 450 },
    xAxis: { categories: activateData.dateArray },
    yAxis: { title: { text: "激活设备/个" }, plotLines: [{ value: 0, width: 1, color: "#81BCFF" }] },
    plotOptions: { areaspline: { color: '#1890FF', fillOpacity: 0.5 } },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "激活设备/个", data: activateData.totalArray }]
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
      title: "每日激活数量",
      dataIndex: "num",
      render: (text, record) => {
        return <div>{record.num}</div>;
      }
    },
    {
      title: "累计激活总数",
      dataIndex: "total",
      render: (text, record) => {
        return <div>{record.total}</div>;
      }
    }
  ];

  const getData = k => {
    dispatch({ type: "activeData/selected", payload: k });
    let activate = { userToken: localStorage.getItem("userToken"), period: k, productId: productID };
    dispatch({ type: "activeData/Activate", payload: activate });
  };

  return (
    <div>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("productId", { initialValue: "全部" })(
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
        <Card className={styles.indexTopL} bordered={false}>
          <div className={styles.indexCont}>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日激活</span>
              <span style={{ color: "#1890FF" }}>{activateSummaryData.todayActivate}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>昨日激活&nbsp;&nbsp;</span>
                <span>{activateSummaryData.yesterdayActivate}&nbsp;</span>
              </div>
            </div>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>近7日激活</span>
              <span style={{ color: "#1890FF" }}>{activateSummaryData.periodActivate}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>上7日激活&nbsp;&nbsp;</span>
                <span>{activateSummaryData.prePeriodActivate}&nbsp;</span>
              </div>
            </div>
            <div className={styles.indexCont_span} style={{ marginTop: "-48px", marginRight: "10%" }}>
              <span className={styles.indexTop_text}>累计激活总数</span>
              <span style={{ color: "#1890FF" }}>{activateSummaryData.totalActivate}&nbsp;</span>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: "15px" }} bordered={false}>
        <Tabs defaultActiveKey="1" size="large" tabBarExtraContent={
          <ul className={styles.indexData_topUL} style={{ float: "right" }}>
            <li className={selected == 7 ? styles.active : ""} onClick={getData.bind(this, 7)}>近7天</li>
            <li className={selected == 15 ? styles.active : ""} onClick={getData.bind(this, 15)}>近15天</li>
            <li className={selected == 30 ? styles.active : ""} onClick={getData.bind(this, 30)}>近30天</li>
          </ul>
        }>
          <TabPane tab="每日激活趋势" key="1">
            <ReactHighcharts config={dailyConfig} />
          </TabPane>
          <TabPane tab="累计激活趋势" key="2">
            <ReactHighcharts config={totalConfig} />
          </TabPane>
        </Tabs>
        <Divider />
          <div className={styles.indexData_top}>
            <span>激活数据明细</span>
            <Table columns={columns} dataSource={activateData.listArray} bordered={false} pagination={false} />
          </div>
      </Card>
    </div>
  );
};

export default connect(({ activeData, loading }) => ({
  activeData,
  loading: loading.models.activeData
}))(Form.create()(ActiveData));
