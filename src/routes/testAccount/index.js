import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Select, Button, message, Modal, Input, Icon } from "antd";
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
    let { deviceProductListData, testUserData, pagination, searchList, addBtnVisible } = testAccount;

    //定义表头
    const columns = [
        {
            title: "所属产品",
            dataIndex: "productName",
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.productName}</div>
                );
            }
        },
        {
            title: "手机号",
            dataIndex: "mobile",
            align: 'left',
            render: (text, record) => {
                return <div style={{ color: "#272727" }}>{record.mobile}</div>;
            }
        },
        {
            title: "生产商",
            dataIndex: "producer",
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.producer}</div>
                );
            }
        },
        {
            title: "备注",
            dataIndex: "remark",
            align: 'left',
            render: (text, record) => {
                return <div style={{ color: "#272727" }}>{record.remark}</div>;
            }
        },
        {
            title: "创建时间",
            dataIndex: "createdTime",
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
                                <a style={{ marginRight: 10 }} onClick={showDeleteConfirm.bind(this, { testUserId: record.testUserId, userToken: localStorage.getItem("userToken") })}>删除</a>
                                <a style={{ marginLeft: 10 }} onClick={showEditConfirm.bind(this, { record: record })}>编辑</a>
                            </Fragment>
                        </div>
                    </div>
                );
            }
        }
    ];

    const showEditConfirm = (e) => {
        Modal.confirm({
            title: '账户信息',
            okText: '确认',
            cancelText: '取消',
            destroyOnClose: true,
            width: 550,
            icon: (
                <Icon />
            ),
            content: (<div className={styles.tableListForm}>
                <Form layout="inline">
                    <Form.Item label="所属产品" style={{ marginLeft: 5 }}>
                        {getFieldDecorator("productId_edit", {
                            rules: [{ required: true, message: "请选择一个所属产品" }]
                        })(
                            <Select style={{ width: "100%" }}>
                                {deviceProductListData.map(product => (
                                    <Option value={product.productId}>
                                        {product.productName}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                        {getFieldDecorator("phone_edit", {
                            rules: [{ required: true, message: "请输入手机号码!" }]
                        })(<Input placeholder="请输入手机号" defaultValue={e.record.mobile} />)}
                    </Form.Item>
                    <Form.Item label="生产商" style={{ marginLeft: 29 }}>
                        {getFieldDecorator("producer_edit")(<Input placeholder="请输入生产商" defaultValue={e.record.producer} />)}
                    </Form.Item>
                    <Form.Item label="备注" style={{ marginLeft: 41, marginBottom: 0 }}>
                        {getFieldDecorator("remark_edit")(<Input placeholder="请输入备注内容" defaultValue={e.record.remark} />)}
                    </Form.Item>
                </Form>
            </div>),
            onOk() {
                let values = getFieldsValue();
                if (values.productId_edit == "" || values.productId_edit == null || values.productId_edit == undefined) {
                    message.error("请选择一个所属产品");
                    return;
                }
                if (values.phone_edit == "" || values.phone_edit == null || values.phone_edit == undefined) {
                    message.error("手机号不能为空");
                    return;
                }
                let obj = {
                    mobile: values.phone_edit,
                    producer: values.producer_edit,
                    productId: values.productId_edit,
                    remark: values.remark_edit,
                    testUserId: e.record.testUserId,
                    userToken: localStorage.getItem("userToken")
                }
                let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
                let _object = {
                    update: obj,
                    query: _value
                };
                dispatch({ type: "testAccount/update", payload: _object });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

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
        dispatch({ type: "testAccount/getList", payload: _value });
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
        dispatch({ type: "testAccount/productList" });
        //重置查询所有
        let _ars = getJsonPrams(null, 0, 10);
        dispatch({ type: "testAccount/getList", payload: _ars });
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
                dispatch({ type: "testAccount/getList", payload: postObj });
            } else {
                dispatch({ type: "testAccount/getList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "testAccount/getList", payload: postObj });
            } else {
                dispatch({ type: "testAccount/getList", payload: postObj });
            }
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    const showDeleteConfirm = (e) => {
        Modal.confirm({
            title: '确认要删除吗？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            destroyOnClose: true,
            icon: (
                <Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />
            ),
            onOk() {
                let values = getFieldsValue();
                let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
                let _object = {
                    delete: e,
                    query: _value
                };
                dispatch({ type: "testAccount/delete", payload: _object });
            },
            onCancel() {
                console.log('CancelDelete');
            },
        });
    }

    const addModalSH = () => dispatch({ type: "testAccount/setAddVisibleState", visible: !addBtnVisible });
    const addModalOk = () => {
        let values = getFieldsValue();
        if (values.productId_add == "" || values.productId_add == null || values.productId_add == undefined) {
            message.error("请选择一个所属产品");
            return;
        }
        if (values.phone_add == "" || values.phone_add == null || values.phone_add == undefined) {
            message.error("手机号不能为空");
            return;
        }
        let obj = {
            mobile: values.phone_add,
            producer: values.producer_add,
            productId: values.productId_add,
            remark: values.remark_add,
            userToken: localStorage.getItem("userToken")
        }
        let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
        let _object = {
            save: obj,
            query: _value
        };
        dispatch({ type: "testAccount/save", payload: _object });
        addModalSH();
    }

    return (
        <div>
            <Card>
                <div className={styles.tableForm}>
                    <Form onSubmit={handleSearch} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <Form.Item label="所属产品" style={{ marginLeft: 4 }}>
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
                <div style={{ marginBottom: 15 }}>
                    <Button type="primary" onClick={addModalSH}>添加账号</Button>
                    <Modal title="账户信息" visible={addBtnVisible} onOk={addModalOk} onCancel={addModalSH} okText="确认" cancelText="取消" destroyOnClose={true}>
                        <div className={styles.tableListForm}>
                            <Form layout="inline">
                                <Form.Item label="所属产品" style={{ marginLeft: 5 }}>
                                    {getFieldDecorator("productId_add", {
                                        rules: [{ required: true, message: "请选择一个所属产品" }]
                                    })(
                                        <Select style={{ width: "100%" }}>
                                            {deviceProductListData.map(product => (
                                                <Option value={product.productId}>
                                                    {product.productName}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                                    {getFieldDecorator("phone_add", {
                                        rules: [{ required: true, message: "请输入手机号码!" }]
                                    })(<Input placeholder="请输入手机号" />)}
                                </Form.Item>
                                <Form.Item label="生产商" style={{ marginLeft: 29 }}>
                                    {getFieldDecorator("producer_add")(<Input placeholder="请输入生产商" />)}
                                </Form.Item>
                                <Form.Item label="备注" style={{ marginLeft: 41, marginBottom: 0 }}>
                                    {getFieldDecorator("remark_add")(<Input placeholder="请输入备注内容" />)}
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>
                <Table columns={columns} dataSource={testUserData} bordered={false} pagination={paginationObj} />
            </Card>
        </div>
    );
};

export default connect(({ testAccount, loading }) => ({
    testAccount,
    loading: loading.models.testAccount
}))(Form.create()(TestAccount));
