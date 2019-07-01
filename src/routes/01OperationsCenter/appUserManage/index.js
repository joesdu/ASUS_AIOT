import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Link } from "dva/router";
import { Table, Row, Col, Card, Form, Input, Button, message } from "antd";
import styles from "../../TableList.less";
import config from "../../../utils/config";
import utils from "../../../utils";

const AppUsers = ({
  appUsers,
  dispatch,
  form: {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue
  }
}) => {
  let { data, pagination, searchList } = appUsers;
  //定义表头
  const columns = [
    {
      title: "应用",
      dataIndex: "appSource",
      align: "left",
      width: 300,
      render: (text, record) => {
        return (
          <div style={{ color: "#272727" }}>{record.appSource}</div>
        );
      }
    },
    {
      title: "注册账号",
      dataIndex: "userName",
      width: 250,
      render: (text, record) => {
        return (
          <div style={{ color: "#272727" }}>{record.userName}</div>
        );
      }
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 250,
      render: (text, record) => {
        return (
          <div style={{ color: "#272727" }}>{record.mobile}</div>
        );
      }
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      width: 250,
      align: "left",
      render: (text, record) => {
        return (
          <div style={{ color: "#40272727D4D4" }}>{record.nickName}</div>
        );
      }
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      width: 200,
      render: (text, record) => {
        return (
          <div>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "",
      width: 150,
      render: (text, record) => {
        if (utils.inPages("20")) {
          return (
            <Fragment>
              <Link to={{ pathname: `/appUsersDetail`, state: { userId: record.userId } }}>查看详情</Link>
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <a href={"javascript:return false;"} style={{ opacity: 0.2, color: "#272727" }}>查看详情</a>
            </Fragment>
          );
        }
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
      userToken: config.userToken,
      appSource: appSource,
      firstRow: null,
      mobile: parm.mobile == null || parm.mobile == "" ? null : parm.mobile,
      nickName: parm.nickName == null || parm.nickName == "" ? null : parm.nickName,
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
    let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
    //赛选数据
    dispatch({ type: "appUsers/queryRule", payload: _value });

    //保存查询条件
    dispatch({ type: "appUsers/searchList", payload: _value });
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
    dispatch({ type: "appUsers/clearData" });
    //重置查询所有
    let _ars = getJsonPrams(null, 0, 10);
    dispatch({ type: "appUsers/queryRule", payload: _ars });
    //重置查询条件
    dispatch({ type: "appUsers/searchList", payload: [] });
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
        dispatch({ type: "appUsers/queryRule", payload: postObj });
      } else {
        dispatch({ type: "appUsers/queryRule", payload: postObj });
      }
    },
    onChange: (current, pageSize) => {
      let values = getFieldsValue();
      let postObj = getJsonPrams(values, current - 1, pageSize);
      //判断查询条件
      if (JSON.stringify(searchList) !== "{}") {
        dispatch({ type: "appUsers/queryRule", payload: postObj });
      } else {
        dispatch({ type: "appUsers/queryRule", payload: postObj });
      }
    },
    showTotal: () => {
      return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
    }
  }
  /**分页合集 end **/

  return (
    <div>
      <Card>
        <div className={styles.tableListForm}>
          <Form onSubmit={handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="应用" style={{ marginLeft: 30 }}>
                  {getFieldDecorator("appSource")(
                    < Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="注册邮箱" style={{ marginLeft: 4 }} disabled>
                  {getFieldDecorator("regEmail")(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item label="手机号" style={{ marginLeft: 17 }}>
                  {getFieldDecorator("mobile")(
                    <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item label="用户昵称" style={{ marginLeft: 4 }}>
                  {getFieldDecorator("nickName")(
                    <Input placeholder="请输入" />
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
        <Table columns={columns} dataSource={data} bordered={false} pagination={paginationObj} />
      </Card>
    </div>
  );
};

export default connect(({ appUsers, loading }) => ({
  appUsers,
  loading: loading.models.appUsers
}))(Form.create()(AppUsers));
