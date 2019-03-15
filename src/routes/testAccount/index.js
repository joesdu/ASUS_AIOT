import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Select, Button, message, Modal, Radio, Input } from "antd";
import styles from "../TableList.less";

const { Option } = Select;

const TestAccount = ({
    testAccount,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { pagination, searchList } = testAccount;

    //定义表头
    const columns = [
        {
            title: "所属产品",
            dataIndex: "",
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{"所属产品"}}</div>
                );
            }
        },
        {
            title: "手机号",
            dataIndex: "",
            align: 'left',
            render: (text, record) => {
                return <div style={{ color: "#272727" }}>{"234624572458745"}</div>;
            }
        },
        {
            title: "生产商",
            dataIndex: "",
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{"东莞灯场"}</div>
                );
            }
        },
        {
            title: "备注",
            dataIndex: "",
            align: 'left',
            render: (text, record) => {
                return <div style={{ color: "#272727" }}>{"--"}</div>;
            }
        },
        {
            title: "创建时间",
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
                        <div>
                            <Fragment>
                                <Link to={{ pathname: `/devices/Logs`, state: { deviceId: record.nameAndID.deviceId } }}>删除</Link>
                            </Fragment>
                        </div>
                        <div>
                            <Fragment>
                                <Link to={{ pathname: `/devices/Detail`, state: { deviceId: record.nameAndID.deviceId } }}>编辑</Link>
                            </Fragment>
                        </div>
                    </div>
                );
            }
        }
    ];

    const getJsonPrams = (parm, pageNum, pageRows) => {
        let productId = null;
        if (parm.productId == null || parm.productId == "" || parm.productId == "全部") {
            productId = null;
        } else {
            productId = parm.productId;
        }
        let phone = null;
        if (parm.phone == null || parm.phone == "") {
            phone = null;
        } else {
            phone = parm.phone;
        }
        return {
            userToken: localStorage.getItem("userToken"),
            firstRow: null,
            phone: phone,
            pageNum: pageNum,
            pageRows: pageRows,
            productId: productId
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
        dispatch({ type: "testAccount/feedbackList", payload: _value });
        //保存查询条件
        dispatch({ type: "testAccount/searchList", payload: _value });
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
        dispatch({ type: "testAccount/clearData" });
        //重置查询所有
        let _ars = getJsonPrams(null, 0, 10);
        dispatch({ type: "testAccount/feedbackList", payload: _ars });
        dispatch({ type: "testAccount/productList", payload: null });
        //重置查询条件
        dispatch({ type: "testAccount/searchList", payload: [] });
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
                dispatch({ type: "testAccount/feedbackList", payload: postObj });
            } else {
                dispatch({ type: "testAccount/feedbackList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "testAccount/feedbackList", payload: postObj });
            } else {
                dispatch({ type: "testAccount/feedbackList", payload: postObj });
            }
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

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
                                <Form.Item label="所属产品" style={{ marginLeft: 4 }}>
                                    {getFieldDecorator("productId", { initialValue: "全部" })(
                                        <Select placeholder="全部" style={{ width: "100%" }} disabled>
                                            <Option value={"全部"}>全部</Option>
                                            <Option value={1}>11111</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                                    {getFieldDecorator("phone")(<Input placeholder="请输入" />)}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <div style={{ overflow: "hidden" }}>
                                    <span style={{ float: "right", marginRight: 14 }}>
                                        <Button type="primary" htmlType="submit">查询</Button>
                                        <Button style={{ marginLeft: 14 }} onClick={handleFormReset}>重置</Button>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>

            <Card style={{ marginTop: 20 }} title="设备列表">
                <Form onSubmit={handleSearch} layout="inline">
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={8} sm={24}>
                            <Button type="primary">添加账号</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={null} bordered={false} pagination={paginationObj} />
            </Card>
        </div>
    );
};

export default connect(({ testAccount, loading }) => ({
    testAccount,
    loading: loading.models.testAccount
}))(Form.create()(TestAccount));
