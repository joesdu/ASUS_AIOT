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
  formValues, //搜索条件
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { data, selected } = activelyData;

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
      type: "activelyData/queryRule",
      payload: values
    });

    //保存查询条件
    dispatch({
      type: "activelyData/searchList",
      payload: values
    });
  };

  var config = {
    chart: { height: 450 },
    xAxis: { categories: data.activeData.dateArray },
    yAxis: {
      title: { text: "活跃设备/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃设备/个", data: data.activeData.numArray }]
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
    console.log(k);
    dispatch({
      type: "activelyData/selected",
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
              <span className={styles.indexTop_text}>今日活跃</span>
              <span style={{ color: "#1890FF" }}>
                {data.activeSummaryData.todayActive}&nbsp;
              </span>
              <div className={styles.indexBottom_text}>
                <span>昨日激活&nbsp;&nbsp;</span>
                <span>{data.activeSummaryData.yesterdayActive}&nbsp;</span>
              </div>
            </div>
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>近7日活跃</span>
              <span style={{ color: "#1890FF" }}>
                {data.activeSummaryData.periodActive}&nbsp;
              </span>
              <div className={styles.indexBottom_text}>
                <span>上7日活跃&nbsp;&nbsp;</span>
                <span>{data.activeSummaryData.prePeriodActive}&nbsp;</span>
              </div>
            </div>
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>今日活跃占比</span>
              <span style={{ color: "#1890FF" }}>
                {data.activeSummaryData.activeRate * 100} %
              </span>
              <div className={styles.indexBottom_text}>
                <span>昨日活跃占比&nbsp;&nbsp;</span>
                <span>
                  {data.activeSummaryData.yesterdayActiveRate * 100} %
                </span>
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
              <li
                className={selected == 0 ? styles.active : ""}
                onClick={getData.bind(this, 7)}
              >
                近7天
              </li>
              <li
                className={selected == 1 ? styles.active : ""}
                onClick={getData.bind(this, 15)}
              >
                近15天
              </li>
              <li
                className={selected == 2 ? styles.active : ""}
                onClick={getData.bind(this, 30)}
              >
                近30天
              </li>
            </ul>
            <div style={{ width: "100%" }}>
              <ReactHighcharts config={config} />
            </div>
          </div>
        </div>
      </Card>
      <Card title="活跃数据明细">
        <Table
          columns={columns}
          dataSource={data.activeData.listArray}
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
