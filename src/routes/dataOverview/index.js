import React from "react";
import { connect } from "dva";
import { Icon, Row, Col, Card, Form, Select, Divider } from "antd";
import styles from "./index.less";
import ReactHighcharts from "react-highcharts";

const FormItem = Form.Item;
const { Option } = Select;

const DataOverview = ({
  dataOverview,
  dispatch,
  form: {
    getFieldDecorator
  }
}) => {
  let { overviewData, activateData, activeData, areaData, deviceProductListData, activateSelected, activeSelected, areaSelected } = dataOverview;

  let productID = 0;
  //查询条件
  const handleChange = e => {
    productID = e;
    let overview = { userToken: localStorage.getItem("userToken"), productId: e };
    let activate = { userToken: localStorage.getItem("userToken"), period: 7, productId: e };
    let active = { userToken: localStorage.getItem("userToken"), period: 7, productId: e };
    let area = { userToken: localStorage.getItem("userToken"), period: 1, productId: e };
    //赛选数据
    dispatch({ type: "dataOverview/overview", payload: overview });
    dispatch({ type: "dataOverview/activate", payload: activate });
    dispatch({ type: "dataOverview/active", payload: active });
    dispatch({ type: "dataOverview/area", payload: area });
    dispatch({ type: "dataOverview/activateSelected", payload: 7 });
    dispatch({ type: "dataOverview/activeSelected", payload: 7 });
    dispatch({ type: "dataOverview/areaSelected", payload: 1 });
  };

  var activateConfig = {
    chart: { type: "areaspline", height: 450 },
    xAxis: { categories: activateData.dateArray },
    yAxis: { title: { text: "激活设备/个" }, plotLines: [{ value: 0, width: 1, color: "#81BCFF" }] },
    colors: ['#81BCFF'],
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "激活设备/个", data: activateData.numArray }]
  };

  var activeConfig = {
    chart: { type: "areaspline", height: 450 },
    xAxis: { categories: activeData.dateArray },
    yAxis: { title: { text: "活跃设备/个" }, plotLines: [{ value: 0, width: 1, color: "#81BCFF" }] },
    colors: ['#81BCFF'],
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃设备/个", data: activeData.numArray }]
  };

  var areaConfig = {
    chart: { height: 450, type: "column" },
    xAxis: { categories: areaData.areaArray },
    yAxis: { title: { text: "活跃数量/个" }, plotLines: [{ value: 0, width: 1, color: "#81BCFF" }] },
    colors: ['#81BCFF'],
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃数量/个", data: areaData.numArray }]
  };

  const getDiv = number => {
    if (number >= 0) {
      return (
        <span style={{ color: "#FF5F00" }}>{number}%&nbsp;<Icon type="caret-up" style={{ color: "#FF5F00", fontSize: "15px" }} /></span>
      );
    } else {
      return (
        <span style={{ color: "#13C2C2" }}>{number}%&nbsp;<Icon type="caret-down" style={{ color: "#13C2C2", fontSize: "15px" }} /></span>
      );
    }
  };

  const getActivateData = k => {
    dispatch({ type: "dataOverview/activateSelected", payload: k });
    let activate = { userToken: localStorage.getItem("userToken"), period: k, productId: productID };
    dispatch({ type: "dataOverview/activate", payload: activate });
  };

  const getActiveData = k => {
    dispatch({ type: "dataOverview/activeSelected", payload: k });
    let active = { userToken: localStorage.getItem("userToken"), period: k, productId: productID };
    dispatch({ type: "dataOverview/active", payload: active });
  };

  const getAreaData = k => {
    dispatch({ type: "dataOverview/areaSelected", payload: k });
    let area = { userToken: localStorage.getItem("userToken"), period: k, productId: productID };
    dispatch({ type: "dataOverview/area", payload: area });
  };

  return (
    <div>
      <Card>
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
      </Card>

      <div style={{ marginTop: "15px" }} className={styles.indexTop}>
        <Card className={styles.indexTopL} style={{ marginRight: "25px" }}>
          <div className={styles.indexCont}>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日激活</span>
              <span style={{ color: "#1890FF" }}>{overviewData.todayActivate}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>昨日激活&nbsp;&nbsp;</span>
                <span>{overviewData.yesterdayActivate}</span>
              </div>
            </div>
            <div className={styles.indexCont_span}>
              <span className={styles.indexTop_text}>较昨日环比</span>
              {getDiv(overviewData.yesterdayActivateRate)}
              <div className={styles.indexBottom_text}>
                <span>累计激活&nbsp;&nbsp;</span>
                <span>{overviewData.totalActivate}</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className={styles.indexTopL} style={{ position: "relative" }}>
          <div className={styles.indexCont}>
            <div className={styles.indexCont_span} style={{ marginRight: "10%" }}>
              <span className={styles.indexTop_text}>今日活跃</span>
              <span style={{ color: "#1890FF" }}>{overviewData.todayActive}&nbsp;</span>
              <div className={styles.indexBottom_text}>
                <span>昨日活跃&nbsp;&nbsp;</span>
                <span>{overviewData.yesterdayActive}</span>
              </div>
            </div>
            <div className={styles.indexCont_span}>
              <span className={styles.indexTop_text}>较昨日环比</span>
              {getDiv(overviewData.yesterdayActiveRate)}
              <div className={styles.indexBottom_text}>
                <span>活跃占比&nbsp;&nbsp;</span>
                <span>{overviewData.activeRate}&nbsp;%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: "15px" }}>
        <div className={styles.indexData}>
          <div className={styles.indexData_top}>
            <span>激活数据趋势</span>
            <ul className={styles.indexData_topUL} style={{ float: "right" }}>
              <li className={activateSelected == 7 ? styles.active : ""} onClick={getActivateData.bind(this, 7)}>近7天</li>
              <li className={activateSelected == 15 ? styles.active : ""} onClick={getActivateData.bind(this, 15)}>近15天</li>
              <li className={activateSelected == 30 ? styles.active : ""} onClick={getActivateData.bind(this, 30)}>近30天</li>
            </ul>
            <Divider />
            <div style={{ width: "100%", marginTop: "24px" }}>
              <ReactHighcharts config={activateConfig} />
            </div>
          </div>
        </div>
      </Card>
      <Card style={{ marginTop: "15px" }}>
        <div className={styles.indexData}>
          <div className={styles.indexData_top}>
            <span>活跃数据趋势</span>
            <ul className={styles.indexData_topUL} style={{ float: "right" }}>
              <li className={activeSelected == 7 ? styles.active : ""} onClick={getActiveData.bind(this, 7)}>近7天</li>
              <li className={activeSelected == 15 ? styles.active : ""} onClick={getActiveData.bind(this, 15)}>近15天</li>
              <li className={activeSelected == 30 ? styles.active : ""} onClick={getActiveData.bind(this, 30)}>近30天</li>
            </ul>
            <Divider />
            <div style={{ width: "100%", marginTop: "24px" }}>
              <ReactHighcharts config={activeConfig} />
            </div>
          </div>
        </div>
      </Card>
      <Card style={{ marginTop: "15px" }}>
        <div className={styles.indexData}>
          <div className={styles.indexData_top}>
            <span>活跃地区</span>
            <ul className={styles.indexData_topUL} style={{ float: "right" }}>
              <li className={areaSelected == 1 ? styles.active : ""} onClick={getAreaData.bind(this, 1)}>昨天</li>
              <li className={areaSelected == 7 ? styles.active : ""} onClick={getAreaData.bind(this, 7)}>近7天</li>
              <li className={areaSelected == 15 ? styles.active : ""} onClick={getAreaData.bind(this, 15)}>近15天</li>
              <li className={areaSelected == 30 ? styles.active : ""} onClick={getAreaData.bind(this, 30)}>近30天</li>
            </ul>
            <Divider />
            <div style={{ width: "100%", marginTop: "24px" }}>
              <ReactHighcharts config={areaConfig} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default connect(({ dataOverview, loading }) => ({
  dataOverview,
  loading: loading.models.dataOverview
}))(Form.create()(DataOverview));
