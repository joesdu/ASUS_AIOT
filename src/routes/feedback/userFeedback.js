import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Select, Button, DatePicker, message, Modal, Radio, Input } from "antd";
import styles from "../TableList.less";

const { Option } = Select;
const { RangePicker } = DatePicker;

const UserFeedback = ({
  userFeedback,
  dispatch,
  form: {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { feedbackData, deviceProductListData, pagination, searchList } = userFeedback;

  //定义表头
  const columns = [
    {
      title: "反馈内容",
      dataIndex: "descriptionAndRemark",
      align: 'left',
      render: (text, record) => {
        return (
          <div style={{ color: "#272727" }}>
            <div>{record.descriptionAndRemark.description}</div>
            <div>{record.descriptionAndRemark.remark}</div>
          </div>
        );
      }
    },
    {
      title: "联系方式",
      dataIndex: "contact",
      align: 'left',
      render: (text, record) => {
        return <div style={{ color: "#272727" }}>{record.contact}</div>;
      }
    },
    {
      title: "用户账号/昵称",
      dataIndex: "mobileAndNickname",
      align: 'left',
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.mobileAndNickname.mobile}</div>
            <div style={{ color: "#B3B3B3" }}>{record.mobileAndNickname.nickname}</div>
          </div>
        );
      }
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      align: 'left',
      render: (text, record) => {
        return <div style={{ color: "#272727" }}>{record.productName}</div>;
      }
    },
    {
      title: "状态",
      dataIndex: "isProcessed",
      render: (text, record) => {
        if (record.isProcessed === "1" || record.isProcessed === 1) {
          return <div style={{ color: "#40D4D4" }}>已处理</div>;
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
              <a onClick={showModal.bind(this, { feedbackId: record.feedbackId, isProcessed: record.isProcessed, remark: record.descriptionAndRemark.remark })}>标记</a>
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
    let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
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
  let paginationObj = {
    style: { padding: "20px 0 0", textAlign: "center", marginBottom: "10px" },
    total: pagination.total,
    defaultCurrent: 1,
    pageSize: pagination.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (current, pageSize) => {
      let values = getFieldsValue();
      let postObj = getJsonPrams(values, current - 1, pageSize);
      //判断查询条件
      if (JSON.stringify(searchList) !== "{}") {
        dispatch({ type: "userFeedback/feedbackList", payload: postObj });
      } else {
        dispatch({ type: "userFeedback/feedbackList", payload: postObj });
      }
    },
    onChange: (current, pageSize) => {
      let values = getFieldsValue();
      let postObj = getJsonPrams(values, current - 1, pageSize);
      //判断查询条件
      if (JSON.stringify(searchList) !== "{}") {
        dispatch({ type: "userFeedback/feedbackList", payload: postObj });
      } else {
        dispatch({ type: "userFeedback/feedbackList", payload: postObj });
      }
    },
    showTotal: () => {
      return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
    }
  }
  /**分页合集 end **/

  const dateFormat = "YYYY-MM-DD";

  let radioSelect = 1;
  const radioChange = (e) => {
    radioSelect = e.target.value;
  };

  let radioOption = [
    { label: "已处理", value: 1 },
    { label: "未处理", value: 0 }
  ];

  const showModal = (e) => {
    Modal.confirm({
      title: "标记",
      okText: "确认",
      cancelText: "取消",
      content: (
        <div className={styles.tableForm}>
          <Form>
            <Form.Item label="标记" style={{ marginLeft: 30 }}>
              <Radio.Group defaultValue={1} options={radioOption} onChange={radioChange} />
            </Form.Item>
            <Form.Item label="处理批注" style={{ marginLeft: 4 }}>
              <Input.TextArea id="markText" placeholder="请输入你的处理批注信息" autosize={{ minRows: 3, maxRows: 5 }} style={{ marginTop: "10px" }} />
            </Form.Item>
          </Form>
        </div>
      ),
      onOk() {
        let values = getFieldsValue();
        let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
        let markText = document.getElementById("markText").value;
        let _object = {
          update: { feedbackId: e.feedbackId, isProcessed: radioSelect, remark: markText, userToken: localStorage.getItem("userToken") },
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
        <div className={styles.tableListForm}>
          <Form onSubmit={handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="应用" style={{ marginLeft: 30 }}>
                  {getFieldDecorator("application", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }} disabled>
                      <Option value={"全部"}>全部</Option>
                      <Option value={1}>11111</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="产品" style={{ marginLeft: 30 }}>
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
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="状态" style={{ marginLeft: 30 }}>
                  {getFieldDecorator("isProcessed", { initialValue: "全部" })(
                    <Select placeholder="全部" style={{ width: "100%" }}>
                      <Option value={"全部"}>全部</Option>
                      <Option value={"未处理"}>未处理</Option>
                      <Option value={"已处理"}>已处理</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="反馈时间" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("recentActivated")(
                    <RangePicker format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <div style={{ overflow: "hidden" }}>
                <span style={{ float: "right", marginRight: 14 }}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 14 }} onClick={handleFormReset}>重置</Button>
                </span>
              </div>
            </Row>
          </Form>
        </div>
      </Card>

      <Card style={{ marginTop: 20 }} title="设备列表">
        <Table columns={columns} dataSource={feedbackData} bordered={false} pagination={paginationObj} />
      </Card>
    </div>
  );
};

export default connect(({ userFeedback, loading }) => ({
  userFeedback,
  loading: loading.models.userFeedback
}))(Form.create()(UserFeedback));
