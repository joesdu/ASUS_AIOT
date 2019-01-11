import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Pagination, Table, Card, Form, message } from "antd";
import styles from "../TableList.less";
import styles2 from "../main.less";
import $ from "jquery";

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 }
};

const UserDetail = ({
  userDetail,
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
  let { data, pagination, searchList, pageindex, pagesize } = userDetail;

  //定义表头
  const columns = [
    {
      title: "设备ID",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    },
    {
      title: "设备名称",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    },
    {
      title: "所属产品",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    },
    {
      title: "PID",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    },
    {
      title: "产品类型",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    },
    {
      title: "添加方式",
      dataIndex: "",
      render: (text, record) => {
        return <div>{}</div>;
      }
    }
  ];

  /**分页合集 start **/
  const showTotal = total => {
    return `共 ${pagination.total} 条 第 ${pagination.current} / ${
      pagination.pageCount
    } 页`;
  };
  const onShowSizeChange = (current, pageSize) => {
    const postObj = {
      curPage: current,
      pageRows: pageSize
    };
    dispatch({
      type: "userDetail/setPage",
      payload: current,
      size: pageSize
    });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({
        type: "userDetail/queryRule",
        payload: postObj
      });
    } else {
      dispatch({
        type: "userDetail/queryRule",
        payload: postObj
      });
    }
  };

  const getNowPage = (current, pageSize) => {
    let postObj = {
      curPage: current,
      pageRows: pageSize
    };
    dispatch({
      type: "userDetail/setPage",
      payload: current,
      size: pageSize
    });
    //判断查询条件
    if (JSON.stringify(searchList) !== "{}") {
      let _c = {};
      _c = $.extend(postObj, searchList);
      dispatch({
        type: "userDetail/queryRule",
        payload: postObj
      });
    } else {
      dispatch({
        type: "userDetail/queryRule",
        payload: postObj
      });
    }
  };
  /**分页合集 end **/

  return (
    <div className={styles.tableList}>
      <Card title="基本信息">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="应用">
                    <label>A豆家智能</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="注册账号">
                    <label>86-188 8888 8888</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="手机号">
                    <label>86-188 8888 8888</label>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="昵称">
                    <label>Adam</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="注册时间">
                    <label>2018-04-12 21:21:54</label>
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="绑定设备">
                    <label>7个设备</label>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>
      <Card style={{ marginTop: 20 }} title="绑定设备列表">
        <Table
          columns={columns}
          dataSource={data}
          bordered
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

export default connect(({ userDetail, loading }) => ({
  userDetail,
  loading: loading.models.userDetail
}))(Form.create()(UserDetail));
