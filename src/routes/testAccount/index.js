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
    let { deviceProductListData, testUserData, pagination, searchList, addBtnVisible, editBtnVisible, editModalData } = testAccount;

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
            width: 150,
            render: (text, record) => {
                return (
                    <Fragment>
                        <a style={{ marginRight: 10 }} onClick={showDeleteConfirm.bind(this, { testUserId: record.testUserId, userToken: localStorage.getItem("userToken") })}>删除</a>
                        <a style={{ marginLeft: 10 }} onClick={editModalShow.bind(this, record)}>编辑</a>
                    </Fragment>
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
        let mobile = null;
        if (parm.mobile == null || parm.mobile == "") {
            mobile = null;
        } else {
            mobile = parm.mobile;
        }
        return {
            userToken: localStorage.getItem("userToken"),
            firstRow: null,
            mobile: mobile,
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
        total: pagination.total, defaultCurrent: 1, pageSize: pagination.pageSize,
        showSizeChanger: true, showQuickJumper: true,
        onShowSizeChange: (current, pageSize) => {
            let postObj = getJsonPrams(getFieldsValue(), current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "testAccount/getList", payload: postObj });
            } else {
                dispatch({ type: "testAccount/getList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let postObj = getJsonPrams(getFieldsValue(), current - 1, pageSize);
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
            icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
            onOk() {
                dispatch({ type: "testAccount/delete", payload: { delete: e, query: getJsonPrams(getFieldsValue(), pagination.current, pagination.pageSize) } });
            },
            onCancel() { console.log('CancelDelete'); },
        });
    }

    const addModalSH = () => dispatch({ type: "testAccount/setAddVisibleState", visible: !addBtnVisible });
    const addModalOk = () => {
        let values = getFieldsValue();
        if (values.productId_add == "" || values.productId_add == null || values.productId_add == undefined) {
            message.error("请选择一个所属产品");
            return;
        }
        if (values.mobile_add == "" || values.mobile_add == null || values.mobile_add == undefined) {
            message.error("手机号不能为空");
            return;
        }
        let obj = {
            mobile: values.mobile_add,
            producer: values.producer_add,
            productId: values.productId_add,
            remark: values.remark_add,
            userToken: localStorage.getItem("userToken")
        }
        let _object = {
            save: obj,
            query: getJsonPrams(values, pagination.current, pagination.pageSize)
        };
        dispatch({ type: "testAccount/save", payload: _object });
        addModalSH();
    }

    const editModalShow = (e) => {
        dispatch({ type: "testAccount/setEditModalData", data: e })
        dispatch({ type: "testAccount/setEditVisibleState", visible: true })
    };
    const editModalOk = () => {
        let values = getFieldsValue();
        if (values.productId_edit == "" || values.productId_edit == null || values.productId_edit == undefined) {
            message.error("请选择一个所属产品");
            return;
        }
        if (values.mobile_edit == "" || values.mobile_edit == null || values.mobile_edit == undefined) {
            message.error("手机号不能为空");
            return;
        }
        let obj = {
            mobile: values.mobile_edit,
            producer: values.producer_edit,
            productId: values.productId_edit,
            remark: values.remark_edit,
            testUserId: editModalData.testUserId,
            userToken: localStorage.getItem("userToken")
        }
        let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
        dispatch({ type: "testAccount/update", payload: { update: obj, query: _value } });
        dispatch({ type: "testAccount/setEditVisibleState", visible: false })
    }
    const editModalHide = () => {
        dispatch({ type: "testAccount/setEditVisibleState", visible: false })
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
                                                <Option value={product.productId}>{product.productName}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                                    {getFieldDecorator("mobile")(<Input placeholder="请输入" />)}
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
                                                <Option value={product.productId}>{product.productName}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                                    {getFieldDecorator("mobile_add", { rules: [{ required: true, message: "请输入正确的手机号码!", pattern: /^1[34578]\d{9}$/ }], })(<Input placeholder="请输入手机号" />)}
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

                    <Modal title="账户信息" visible={editBtnVisible} onOk={editModalOk} onCancel={editModalHide} okText="确认" cancelText="取消" destroyOnClose={true}>
                        <div className={styles.tableListForm}>
                            <Form layout="inline">
                                <Form.Item label="所属产品" style={{ marginLeft: 5 }}>
                                    {getFieldDecorator("productId_edit", {
                                        rules: [{ required: true, message: "请选择一个所属产品" }],
                                        initialValue: editModalData.productId
                                    })(
                                        <Select placeholder="请选择一个所属产品">
                                            {deviceProductListData.map(product => (
                                                <Option value={product.productId}>{product.productName}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="手机号" style={{ marginLeft: 18 }}>
                                    {getFieldDecorator("mobile_edit", { rules: [{ required: true, message: "请输入手机号码!", pattern: /^1[34578]\d{9}$/ }], initialValue: editModalData.mobile })(<Input placeholder="请输入手机号" />)}
                                </Form.Item>
                                <Form.Item label="生产商" style={{ marginLeft: 29 }}>
                                    {getFieldDecorator("producer_edit", { initialValue: editModalData.producer })(<Input placeholder="请输入生产商" />)}
                                </Form.Item>
                                <Form.Item label="备注" style={{ marginLeft: 41, marginBottom: 0 }}>
                                    {getFieldDecorator("remark_edit", { initialValue: editModalData.remark })(<Input placeholder="请输入备注内容" />)}
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
