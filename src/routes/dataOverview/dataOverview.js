import React from "react";
import { connect } from "dva";
import { Icon, Row, Col, Card, Form, Select } from "antd";
import styles from "./dataOverview.less";
import ReactHighcharts from "react-highcharts";

const FormItem = Form.Item;
const { Option } = Select;

const DataOverview = ({
  dataOverview,
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
  let {
    overviewData,
    activateData,
    activeData,
    areaData,
    deviceProductListData,
    activateSelected,
    activeSelected,
    areaSelected
  } = dataOverview;

  !function () {
    function n(n, e, t) {
      return n.getAttribute(e) || t
    }

    function e(n) {
      return document.getElementsByTagName(n)
    }

    function t() {
      var t = e("script"), o = t.length, i = t[o - 1];
      return {
        l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .4), c: n(i, "color", "0,0,0"), n: n(i, "count", 100)
      }
    }

    function o() {
      a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function i() {
      r.clearRect(0, 0, a, c);
      var n, e, t, o, m, l;
      s.forEach(function (i, x) {
        for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++)
          n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
            t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
      }),
        x(i)
    }

    var a, c, u, m = document.createElement("canvas"),
      d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
      x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (n) {
          window.setTimeout(n, 1e3 / 45)
        },
      w = Math.random, y = { x: null, y: null, max: 2e4 }; m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o,
        window.onmousemove = function (n) {
          n = n || window.event, y.x = n.clientX, y.y = n.clientY
        },
        window.onmouseout = function () {
          y.x = null, y.y = null
        };
    for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1; s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 })
    }
    u = s.concat([y]),
      setTimeout(function () { i() }, 1000)
  }();

  let productID = 0;
  //查询条件
  const handleChange = e => {
    productID = e;
    let overview = {
      userToken: localStorage.getItem("userToken"),
      productId: e
    };
    let activate = {
      userToken: localStorage.getItem("userToken"),
      period: 7,
      productId: e
    };
    let active = {
      userToken: localStorage.getItem("userToken"),
      period: 7,
      productId: e
    };
    let area = {
      userToken: localStorage.getItem("userToken"),
      period: 1,
      productId: e
    };
    //赛选数据
    dispatch({ type: "dataOverview/queryOverviewData", payload: overview });
    dispatch({
      type: "dataOverview/queryActivateData",
      payload: activate
    });
    dispatch({ type: "dataOverview/queryActiveData", payload: active });
    dispatch({ type: "dataOverview/queryAreaData", payload: area });
    dispatch({ type: "dataOverview/activateSelected", payload: 7 });
    dispatch({ type: "dataOverview/activeSelected", payload: 7 });
    dispatch({ type: "dataOverview/areaSelected", payload: 1 });
  };

  var activateConfig = {
    chart: { height: 450 },
    xAxis: { categories: activateData.dateArray },
    yAxis: {
      title: { text: "激活设备/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "激活设备/个", data: activateData.numArray }]
  };

  var activeConfig = {
    chart: { height: 450 },
    xAxis: { categories: activeData.dateArray },
    yAxis: {
      title: { text: "活跃设备/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃设备/个", data: activeData.numArray }]
  };

  var areaConfig = {
    chart: { height: 450, type: "column" },
    xAxis: { categories: areaData.areaArray },
    yAxis: {
      title: { text: "活跃数量/个" },
      plotLines: [{ value: 0, width: 1, color: "#808080" }]
    },
    title: { text: null },
    legend: { enabled: false },
    credits: { enabled: false }, // 隐藏右下角版权
    series: [{ name: "活跃数量/个", data: areaData.numArray }]
  };

  const getDiv = number => {
    if (number >= 0) {
      return (
        <span style={{ color: "#FF5F00" }}>
          {number}%&nbsp;
          <Icon
            type="caret-up"
            style={{ color: "#FF5F00", fontSize: "15px" }}
          />
        </span>
      );
    } else {
      return (
        <span style={{ color: "#13C2C2" }}>
          {number}%&nbsp;
          <Icon
            type="caret-down"
            style={{ color: "#13C2C2", fontSize: "15px" }}
          />
        </span>
      );
    }
  };

  const getActivateData = k => {
    dispatch({ type: "dataOverview/activateSelected", payload: k });
    let activate = {
      userToken: localStorage.getItem("userToken"),
      period: k,
      productId: productID
    };
    dispatch({ type: "dataOverview/queryActivateData", payload: activate });
  };

  const getActiveData = k => {
    dispatch({ type: "dataOverview/activeSelected", payload: k });
    let active = {
      userToken: localStorage.getItem("userToken"),
      period: k,
      productId: productID
    };
    dispatch({ type: "dataOverview/queryActiveData", payload: active });
  };

  const getAreaData = k => {
    dispatch({ type: "dataOverview/areaSelected", payload: k });
    let area = {
      userToken: localStorage.getItem("userToken"),
      period: k,
      productId: productID
    };
    dispatch({ type: "dataOverview/queryAreaData", payload: area });
  };

  return (
    <div>
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("productId", {
                      initialValue: "全部"
                    })(
                      <Select
                        placeholder="全部"
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      >
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
        <Card className={styles.indexTopL} style={{ marginRight: "25px" }}>
          <div className={styles.indexCont}>
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>今日激活</span>
              <span style={{ color: "#1890FF" }}>
                {overviewData.todayActivate}&nbsp;
              </span>
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
            <div
              className={styles.indexCont_span}
              style={{ marginRight: "10%" }}
            >
              <span className={styles.indexTop_text}>今日活跃</span>
              <span style={{ color: "#1890FF" }}>
                {overviewData.todayActive}&nbsp;
              </span>
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
                <span>{overviewData.activeRate * 100}&nbsp;%</span>
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
              <li
                className={activateSelected == 7 ? styles.active : ""}
                onClick={getActivateData.bind(this, 7)}
              >
                近7天
              </li>
              <li
                className={activateSelected == 15 ? styles.active : ""}
                onClick={getActivateData.bind(this, 15)}
              >
                近15天
              </li>
              <li
                className={activateSelected == 30 ? styles.active : ""}
                onClick={getActivateData.bind(this, 30)}
              >
                近30天
              </li>
            </ul>
            <div style={{ width: "100%" }}>
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
              <li
                className={activeSelected == 7 ? styles.active : ""}
                onClick={getActiveData.bind(this, 7)}
              >
                近7天
              </li>
              <li
                className={activeSelected == 15 ? styles.active : ""}
                onClick={getActiveData.bind(this, 15)}
              >
                近15天
              </li>
              <li
                className={activeSelected == 30 ? styles.active : ""}
                onClick={getActiveData.bind(this, 30)}
              >
                近30天
              </li>
            </ul>
            <div style={{ width: "100%" }}>
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
              <li
                className={areaSelected == 1 ? styles.active : ""}
                onClick={getAreaData.bind(this, 1)}
              >
                昨天
              </li>
              <li
                className={areaSelected == 7 ? styles.active : ""}
                onClick={getAreaData.bind(this, 7)}
              >
                近7天
              </li>
              <li
                className={areaSelected == 15 ? styles.active : ""}
                onClick={getAreaData.bind(this, 15)}
              >
                近15天
              </li>
              <li
                className={areaSelected == 30 ? styles.active : ""}
                onClick={getAreaData.bind(this, 30)}
              >
                近30天
              </li>
            </ul>
            <div style={{ width: "100%" }}>
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
