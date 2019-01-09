import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import {
  Pagination,
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  message
} from "antd";
import styles from "../TableList.less";
import $ from "jquery";

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 }
};

const AppUsers = ({
  appUsers,
  loading,
  dispatch,
  formValues, //搜索条件
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { data, pagination, searchList, pageindex, pagesize } = appUsers;
  //定义表头
  const columns = [
    {
      title: "应用",
      dataIndex: "appSource",
      render: (text, record) => {
        return (
          <div>
            <div>{record.appSource}</div>
          </div>
        );
      }
    },
    {
      title: "注册账号",
      dataIndex: "userName",
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.userName}</div>
          </div>
        );
      }
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#272727" }}>{record.mobile}</div>
          </div>
        );
      }
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      render: (text, record) => {
        return (
          <div>
            <div style={{ color: "#40272727D4D4" }}>{record.nickName}</div>
          </div>
        );
      }
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: (text, record) => {
        return (
          <div>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "",
      render: (text, record) => {
        return (
          <div>
            <div>
              <Fragment>
                <a>查看详情</a>
              </Fragment>
            </div>
          </div>
        );
      }
    }
  ];

  const getJsonPrams = (parm, pageNum, pageRows) => {
    let appSource = null;
    if (parm.appSource == "全部" || parm.appSource == "") {
      appSource = null;
    } else {
      appSource = parm.appSource;
    }
    return {
      appSource: appSource,
      firstRow: null,
      mobile: parm.mobile == null || parm.mobile == "" ? null : parm.mobile,
      nickName:
        parm.nickName == null || parm.nickName == "" ? null : parm.nickName,
      pageNum: pageNum,
      pageRows: pageRows
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
    let _value = getJsonPrams(values, pageindex, pagesize);
    //赛选数据
    dispatch({
      type: "appUsers/queryRule",
      payload: _value
    });

    //保存查询条件
    dispatch({
      type: "appUsers/searchList",
      payload: _value
    });
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
    dispatch({
      type: "appUsers/clearData"
    });
    //重置查询所有
    let _ars = {};
    dispatch({
      type: "appUsers/queryRule",
      payload: _ars
    });
    //重置查询条件
    dispatch({
      type: "appUsers/searchList",
      payload: []
    });
  };

  /**分页合集 start **/
  const showTotal = total => {
    return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${
      pagination.pageCount
    } 页`;
  };
  const onShowSizeChange = (current, pageSize) => {
    let values = getFieldsValue();
    let postObj = getJsonPrams(values, current - 1, pageSize);
    dispatch({
      type: "appUsers/setPage",
      payload: current,
      size: pageSize
    });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({
        type: "appUsers/queryRule",
        payload: postObj
      });
    } else {
      dispatch({
        type: "appUsers/queryRule",
        payload: postObj
      });
    }
  };

  const getNowPage = (current, pageSize) => {
    let values = getFieldsValue();
    let postObj = getJsonPrams(values, current - 1, pageSize);
    dispatch({
      type: "appUsers/setPage",
      payload: current,
      size: pageSize
    });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({
        type: "appUsers/queryRule",
        payload: postObj
      });
    } else {
      dispatch({
        type: "appUsers/queryRule",
        payload: postObj
      });
    }
  };
  /**分页合集 end **/

  return (
    <div>
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form onSubmit={handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="应用" style={{ marginLeft: 30 }}>
                    {getFieldDecorator("appSource", {
                      initialValue: "全部"
                    })(
                      <Select placeholder="全部" style={{ width: "100%" }}>
                        <Option value={"全部"}>全部</Option>
                        <Option value={1}>11111</Option>
                        <Option value={2}>22222</Option>
                        <Option value={2}>33333</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="注册邮箱" style={{ marginLeft: 4 }} disabled>
                    {getFieldDecorator("regEmail")(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="手机号" style={{ marginLeft: 17 }}>
                    {getFieldDecorator("mobile")(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="用户昵称" style={{ marginLeft: 4 }}>
                    {getFieldDecorator("nickName")(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <div style={{ overflow: "hidden" }}>
                  <span style={{ float: "right", marginBottom: 24 }}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                      重置
                    </Button>
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
          dataSource={data}
          bordered={false}
          pagination={false}
        />
        <Pagination
          style={{
            padding: "20px 0 0",
            textAlign: "center",
            marginBottom: "10px"
          }}
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

export default connect(({ appUsers, loading }) => ({
  appUsers,
  loading: loading.models.appUsers
}))(Form.create()(AppUsers));
