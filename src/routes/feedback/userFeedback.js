import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Pagination, Table, Row, Col, Card, Form, Select, Button, DatePicker, Radio, message, Modal } from "antd";
import styles from "../TableList.less";
import $ from "jquery";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const UserFeedback = ({
  userFeedback,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { feedbackData, deviceProductListData, pagination, searchList, pageIndex, pagesize } = userFeedback;

  //定义表头
  const columns = [
    {
      title: "反馈内容",
      dataIndex: "description",
      render: (text, record) => {
        return <div>{record.description}</div>;
      }
    },
    {
      title: "用户账号/昵称",
      dataIndex: "mobileAndNickname",
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>
              {record.mobileAndNickname.mobile}
            </div>
            <div style={{ color: "#B3B3B3" }}>
              {record.mobileAndNickname.nickname}
            </div>
          </div>
        );
      }
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      render: (text, record) => {
        return <div style={{ color: "#272727" }}>{record.productName}</div>;
      }
    },
    {
      title: "状态",
      dataIndex: "isProcessed",
      render: (text, record) => {
        if (record.isProcessed == "1" || record.isProcessed == 1) {
          return <div style={{ color: "#272727" }}>已处理</div>;
        } else {
          return <div style={{ color: "#1E1E1E" }}>未处理</div>;
        }
      }
    },
    {
      title: "反馈时间",
      dataIndex: "createTime",
      render: (text, record) => {
        return <div>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
      }
    },
    {
      title: "操作",
      dataIndex: "",
      render: (text, record) => {
        return (
          <div>
            <Fragment>
              <a onClick={showModal.bind(this, { feedbackId: record.feedbackId, isProcessed: record.isProcessed })}>标记</a>
            </Fragment>
          </div>
        );
      }
    }
  ];

  const getJsonPrams = (parm, pageNum, pageRows) => {
    let recentActivatedEnd = null;
    try {
      recentActivatedEnd = parm.recentActivated[1].format(dateFormat);
    } catch (error) { }
    let recentActivatedStart = null;
    try {
      recentActivatedStart = parm.recentActivated[0].format(dateFormat);
    } catch (error) { }
    let isProcessed = null;
    if (parm.isProcessed == "未处理") {
      isProcessed = 0;
    } else if (parm.isProcessed == "已处理") {
      isProcessed = 1;
    }
    let productId = null;
    if (parm.productId == null || parm.productId == "" || parm.productId == "全部") {
      productId = null;
    } else {
      productId = parm.productId;
    }
    return {
      userToken: localStorage.getItem("userToken"),
      endTime: recentActivatedEnd,
      firstRow: null,
      isProcessed: isProcessed,
      pageNum: pageNum,
      pageRows: pageRows,
      productId: productId,
      startTime: recentActivatedStart
    };
  };

  //查询条件
  const handleSearch = e => {
    e.preventDefault();
    let values = getFieldsValue();
    if (JSON.stringify(values) == "{}") {
      message.warning("请选择查询条件");
      return;
    }
    let _value = getJsonPrams(values, pageIndex, pagesize);
    //赛选数据
    dispatch({ type: "userFeedback/feedbackList", payload: _value });

    //保存查询条件
    dispatch({ type: "userFeedback/searchList", payload: _value });
  };
  //重置
  const handleFormReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    dispatch({ type: "userFeedback/clearData" });
    //重置查询所有
    let _ars = getJsonPrams(null, 0, 10);
    dispatch({ type: "userFeedback/feedbackList", payload: _ars });
    dispatch({ type: "userFeedback/productList", payload: null });
    //重置查询条件
    dispatch({ type: "userFeedback/searchList", payload: [] });
  };

  /**分页合集 start **/
  const showTotal = total => { return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`; };

  const onShowSizeChange = (current, pageSize) => {
    let values = getFieldsValue();
    let postObj = getJsonPrams(values, current - 1, pageSize);

    dispatch({ type: "userFeedback/setPage", payload: current, size: pageSize });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({ type: "userFeedback/feedbackList", payload: postObj });
    } else {
      dispatch({ type: "userFeedback/feedbackList", payload: postObj });
    }
  };

  const getNowPage = (current, pageSize) => {
    let values = getFieldsValue();
    let postObj = getJsonPrams(values, current - 1, pageSize);
    dispatch({ type: "userFeedback/setPage", payload: current, size: pageSize });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({ type: "userFeedback/feedbackList", payload: postObj });
    } else {
      dispatch({ type: "userFeedback/feedbackList", payload: postObj });
    }
  };
  /**分页合集 end **/

  const dateFormat = "YYYY-MM-DD";

  const showModal = e => {
    Modal.confirm({
      title: "标记",
      okText: "确认",
      cancelText: "取消",
      content: (
        <div>
          <label>标记 : </label>
          {/* <RadioGroup style={{ marginTop: "20px" }}>
            <Radio value={1} style={{ marginRight: "50px" }}>
              已处理
            </Radio>
            <Radio value={2} style={{ marginLeft: "50px" }}>
              未处理
            </Radio>
          </RadioGroup> */}
          <span>是否调整反馈状态?</span>
        </div>
      ),
      onOk() {
        if (e.isProcessed == "1" || e.isProcessed == 1) {
          e.isProcessed = 0;
        } else {
          e.isProcessed = 1;
        }
        let values = getFieldsValue();
        let _value = getJsonPrams(values, pageIndex, pagesize);
        let _object = {
          update: { feedbackId: e.feedbackId, isProcessed: e.isProcessed, userToken: localStorage.getItem("userToken") },
          query: _value
        };
        dispatch({ type: "userFeedback/updateFeedback", payload: _object });
      },
      onCancel() {
        console.log("Cancel");
      }
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
                  <FormItem label="应用" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("application", { initialValue: "全部" })(
                      <Select placeholder="全部" style={{ width: "100%" }} disabled>
                        <Option value={"全部"}>全部</Option>
                        <Option value={1}>11111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="产品" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("productId", { initialValue: "全部" })(
                      <Select placeholder="全部" style={{ width: "100%" }}>
                        <Option value={null}>全部</Option>
                        {deviceProductListData.map(product => (
                          <Option value={product.productId}>
                            {product.productName}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="状态" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("isProcessed", { initialValue: "全部" })(
                      <Select placeholder="全部" style={{ width: "100%" }}>
                        <Option value={"全部"}>全部</Option>
                        <Option value={"未处理"}>未处理</Option>
                        <Option value={"已处理"}>已处理</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="反馈时间" style={{ marginLeft: 4 }}>
                    {getFieldDecorator("recentActivated")(
                      <RangePicker format={dateFormat} />
                    )}
                  </FormItem>
                </Col>
                <div style={{ overflow: "hidden" }}>
                  <span style={{ float: "right", marginBottom: 24 }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>重置</Button>
                  </span>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </Card>

      <Card style={{ marginTop: 20 }} title="设备列表">
        <Table
          columns={columns}
          dataSource={feedbackData}
          bordered={false}
          pagination={false}
        />
        <Pagination
          style={{ padding: "20px 0 0", textAlign: "center", marginBottom: "10px" }}
          showSizeChanger
          showQuickJumper
          showTotal={showTotal}
          onChange={getNowPage}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={pagination.total}
        />
      </Card>
    </div>
  );
};

export default connect(({ userFeedback, loading }) => ({
  userFeedback,
  loading: loading.models.userFeedback
}))(Form.create()(UserFeedback));
