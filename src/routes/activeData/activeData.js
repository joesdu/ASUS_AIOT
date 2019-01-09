import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Tabs, Icon, Row, Col, Card, Form, Select, message } from "antd";
import styles from "./activeData.less";
import $ from "jquery";
import classnames from "classnames";

const ReactHighcharts = require("react-highcharts");
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const ActiveData = ({
  activeData,
  loading,
  dispatch,
  formValues, //搜索条件
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { data, selected } = activeData;
  //查询条件
  const handleSearch = e => {
    e.preventDefault();
    let values = getFieldsValue();
    if (JSON.stringify(values) == "{}") {
      message.warning("请选择查询条件");
      return;
    }
    //赛选数据
    dispatch({
      type: "activeData/queryRule",
      payload: values
    });

    //保存查询条件
    dispatch({
      type: "activeData/searchList",
      payload: values
    });
  };

  let config1 = {
    chart: { height: 450 },
    xAxis: {
      categories: data.activateData.dateArray
    },
    yAxis: {
      title: { text: "激活设备/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "激活设备/个", data: data.activateData.numArray }]
  };

  let config2 = {
    chart: { height: 450 },
    xAxis: { categories: data.activateData.dateArray },
    yAxis: {
      title: { text: "激活设备/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "激活设备/个", data: data.activateData.totalArray }]
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
    console.log(k);
    dispatch({
      type: "activeData/selected",
      payload: k
    });
  };

  return (
    <div>
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form onSubmit={handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="当前产品" style={{ marginLeft: 4 }}>
                    {getFieldDecorator("products")(
                      <Select placeholder="全部产品" style={{ width: "100%" }}>
                        <Option value={1}>11111</Option>
                        <Option value={2}>22222</Option>
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
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>今日激活</span>
              <span style={{ color: "#1890FF" }}>
                {data.activateSummaryData.todayActivate}&nbsp;
              </span>
              <div className={styles.indexBottom_text}>
                <span>昨日激活&nbsp;&nbsp;</span>
                <span>{data.activateSummaryData.yesterdayActivate}&nbsp;</span>
              </div>
            </div>
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>近7日激活</span>
              <span style={{ color: "#1890FF" }}>
                {data.activateSummaryData.periodActivate}&nbsp;
              </span>
              <div className={styles.indexBottom_text}>
                <span>上7日激活&nbsp;&nbsp;</span>
                <span>{data.activateSummaryData.prePeriodActivate}&nbsp;</span>
              </div>
            </div>
            <div
              className={styles.indexCont_span}
              style={{ marginTop: "-48px", marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>累计激活总数</span>
              <span style={{ color: "#1890FF" }}>
                {data.activateSummaryData.totalActivate}&nbsp;
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: "15px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="每日激活趋势" key="1">
            <div className={styles.indexData}>
              <div className={styles.indexData_top}>
                <ul
                  className={styles.indexData_topUL}
                  style={{ float: "right" }}
                >
                  <li
                    className={selected == 0 ? styles.active : ""}
                    onClick={getData.bind(this, 0)}
                  >
                    近7天
                  </li>
                  <li
                    className={selected == 1 ? styles.active : ""}
                    onClick={getData.bind(this, 1)}
                  >
                    近15天
                  </li>
                  <li
                    className={selected == 2 ? styles.active : ""}
                    onClick={getData.bind(this, 2)}
                  >
                    近30天
                  </li>
                </ul>
                <div style={{ width: "100%" }}>
                  <ReactHighcharts config={config1} />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="累计激活趋势" key="2">
            <div className={styles.indexData}>
              <div className={styles.indexData_top}>
                <ul
                  className={styles.indexData_topUL}
                  style={{ float: "right" }}
                >
                  <li
                    className={selected == 0 ? styles.active : ""}
                    onClick={getData.bind(this, 0)}
                  >
                    近7天
                  </li>
                  <li
                    className={selected == 1 ? styles.active : ""}
                    onClick={getData.bind(this, 1)}
                  >
                    近15天
                  </li>
                  <li
                    className={selected == 2 ? styles.active : ""}
                    onClick={getData.bind(this, 2)}
                  >
                    近30天
                  </li>
                </ul>
                <div style={{ width: "100%" }}>
                  <ReactHighcharts config={config2} />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      <Card title="激活数据明细">
        <Table
          columns={columns}
          dataSource={data.activateData.listArray}
          bordered={false}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default connect(({ activeData, loading }) => ({
  activeData,
  loading: loading.models.activeData
}))(Form.create()(ActiveData));
