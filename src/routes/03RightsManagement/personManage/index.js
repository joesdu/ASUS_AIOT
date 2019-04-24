import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Input, Select, Button, DatePicker, Switch, Divider, Modal, Icon, message } from "antd";
import styles from "../../TableList.less";

const { Option } = Select;

const PersonManage = ({
    personManage,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { personListData, personaListData, addBtnVisible, editBtnVisible, editModalData, pagination, searchList } = personManage;
    //定义表头
    const columns = [
        {
            title: "用户名",
            dataIndex: "username",
            width: 250,
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.username}</div>
                );
            }
        },
        {
            title: "姓名",
            width: 250,
            align: 'left',
            dataIndex: "name",
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.name}</div>
                );
            },
        },
        {
            title: "手机号",
            dataIndex: "phone",
            width: 250,
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.phone}</div>
                );
            }
        },
        {
            title: "用户角色",
            dataIndex: "userRoles",
            align: 'left',
            width: 200,
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.userRoles}</div>
                );
            }
        },
        {
            title: "状态",
            dataIndex: "states",
            width: 150,
            render: (text, record) => {
                return (<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={record.states} />);
            }
        },
        {
            title: "最近登录时间",
            dataIndex: "createTime",
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.createTime - b.createTime,
            render: (text, record) => {
                return <div style={{ color: "#B3B3B3" }}>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
            }
        },
        {
            title: "操作",
            dataIndex: "",
            width: 150,
            render: (text, record) => {
                return (
                    <div>
                        <Fragment>
                            <a onClick={editModalShow.bind(this, record)}>编辑</a>
                            <Divider type="vertical" />
                            <a onClick={showDeleteConfirm.bind(this, record)}>刪除</a>
                        </Fragment>
                    </div>
                );
            }
        }
    ];

    const getJsonPrams = (parm, pageNum, pageRows) => {
        let status = null;
        if (parm.status == "离线") {
            status = 0;
        } else if (parm.status == "在线") {
            status = 1;
        }
        let productId = null;
        if (parm.productId == null || parm.productId == "" || parm.productId == "全部") {
            productId = null;
        } else {
            productId = parm.productId;
        }
        return {
            userToken: localStorage.getItem("userToken"),
            firstRow: null,
            isAct: isAct,
            lastActTimeEnd: lastActTimeEnd,
            lastActTimeStart: lastActTimeStart,
            mobile: parm.mobile == null || parm.mobile == "" ? null : parm.mobile,
            pageNum: pageNum,
            pageRows: pageRows,
            productId: productId,
            source: source,
            status: status,
            updateTimeEnd: updateTimeEnd,
            updateTimeStart: updateTimeStart,
            uuid: parm.uuid == null || parm.uuid == "" ? null : parm.uuid
        };
    };

    //查询条件
    const handleSearch = e => {
        e.preventDefault();
        let values = getFieldsValue();
        if (JSON.stringify(_value) == "{}") {
            message.warning("请选择查询条件");
            return;
        }
        let _value = getJsonPrams(values, pagination.current, pagination.pageSize);
        //赛选数据
        dispatch({ type: "personManage/devicesList", payload: _value });
        //保存查询条件
        dispatch({ type: "personManage/searchList", payload: _value });
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
        dispatch({ type: "personManage/clearData" });
        dispatch({ type: "personManage/productList" });
        //重置查询所有
        let _ars = getJsonPrams(null, 0, 10);
        dispatch({ type: "personManage/devicesList", payload: _ars });
        //重置查询条件
        dispatch({ type: "personManage/searchList", payload: [] });
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
                dispatch({ type: "personManage/devicesList", payload: postObj });
            } else {
                dispatch({ type: "personManage/devicesList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "personManage/devicesList", payload: postObj });
            } else {
                dispatch({ type: "personManage/devicesList", payload: postObj });
            }
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    const addModalSH = () => dispatch({ type: "personManage/setAddVisibleState", visible: !addBtnVisible });
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
        dispatch({ type: "personManage/save", payload: _object });
        addModalSH();
    }

    const editModalShow = (e) => {
        dispatch({ type: "personManage/setEditModalData", data: e })
        dispatch({ type: "personManage/setEditVisibleState", visible: true })
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
        dispatch({ type: "personManage/update", payload: { update: obj, query: _value } });
        dispatch({ type: "personManage/setEditVisibleState", visible: false })
    }
    const editModalHide = () => {
        dispatch({ type: "personManage/setEditVisibleState", visible: false })
    }

    const showDeleteConfirm = (e) => {
        Modal.confirm({
            title: '确认要删除所选人员吗？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            destroyOnClose: true,
            icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
            content: "删除所选人员后，对应人员无法登录",
            onOk() {
                dispatch({ type: "personManage/delete", payload: { delete: e, query: getJsonPrams(getFieldsValue(), pagination.current, pagination.pageSize) } });
            },
            onCancel() { console.log('CancelDelete'); },
        });
    }


    return (
        <div>
            <Card>
                <div className={styles.tableListForm}>
                    <Form onSubmit={handleSearch} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <Form.Item label="手机号" style={{ marginLeft: 17 }}>
                                    {getFieldDecorator("phone")(
                                        <Input placeholder="请输入手机号" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="名称" style={{ marginLeft: 30 }}>
                                    {getFieldDecorator("name")(
                                        <Input placeholder="请输入姓名/昵称" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="角色" style={{ marginLeft: 30 }}>
                                    {getFieldDecorator("person", { initialValue: "全部" })(
                                        <Select placeholder="全部" style={{ width: "100%" }}>
                                            <Option value={null}>全部</Option>
                                            {personaListData.map(item => (
                                                <Option value={item.id}>
                                                    {item.userRoles}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <Form.Item label="状态" style={{ marginLeft: 30, marginBottom: 0 }}>
                                    {getFieldDecorator("mobile")(
                                        <Select placeholder="全部" style={{ width: "100%" }}>
                                            <Option value={null}>全部</Option>
                                            <Option value={1}>开</Option>
                                            <Option value={0}>关</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24} style={{ marginLeft: "33.33333333%" }}>
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

            <Card style={{ marginTop: 20 }}>
                <Form layout="inline" style={{ marginBottom: 15 }}>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button style={{ width: 82 }} type="primary" block onClick={addModalSH}>+ 新建</Button>
                                <Modal title="新增人员" visible={addBtnVisible} onOk={addModalOk} onCancel={addModalSH} okText="确认" cancelText="取消" destroyOnClose={true} width={850}>
                                    <div className={styles.tableListForm}>
                                        <Form layout="inline">
                                            <Form.Item label="姓名" style={{ marginLeft: 31, width: 507 }}>
                                                {getFieldDecorator("name_add", { rules: [{ required: true, message: "请输入姓名" }] })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="用户名" style={{ marginLeft: 18, width: 520 }}>
                                                {getFieldDecorator("userName_add", { rules: [{ required: true, message: "请输入用户名" }] })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="密码" style={{ marginLeft: 31, width: 507 }}>
                                                {getFieldDecorator("password_add", { rules: [{ required: true, message: "请输入密码" }] })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="手机号" style={{ marginLeft: 18, width: 520 }}>
                                                {getFieldDecorator("mobile_add", { rules: [{ required: true, message: "请输入正确的手机号码!", pattern: /^1[34578]\d{9}$/ }], })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="角色" style={{ marginLeft: 31, width: 507 }}>
                                                {getFieldDecorator("persona_add", { rules: [{ required: true, message: "请选择人员角色" }] })(
                                                    <Select style={{ width: "100%" }}>
                                                        {personaListData.map(item => (
                                                            <Option value={item.id}>{item.userRoles}</Option>
                                                        ))}
                                                    </Select>)}
                                            </Form.Item>
                                            <Form.Item label="备注" style={{ marginLeft: 42, width: 496 }}>
                                                {getFieldDecorator("remark_add")(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="启用状态" style={{ marginLeft: 16, marginBottom: 0, width: 520 }}>
                                                {getFieldDecorator("states_add", { valuePropName: "checked", initialValue: true })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: 82 }} type="danger" block>删除</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Modal title="编辑人员信息" visible={editBtnVisible} onOk={editModalOk} onCancel={editModalHide} okText="确认" cancelText="取消" destroyOnClose={true} width={850}>
                    <div className={styles.tableListForm}>
                        <Form layout="inline">
                            <Form.Item label="姓名" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("name_edit", {
                                    rules: [{ required: true, message: "请输入姓名" }],
                                    initialValue: editModalData.name
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="用户名" style={{ marginLeft: 18, width: 520 }}>
                                {getFieldDecorator("userName_edit", {
                                    rules: [{ required: true, message: "请输入用户名" }],
                                    initialValue: editModalData.username
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="密码" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("password_edit", {
                                    rules: [{ required: true, message: "请输入密码" }],
                                    initialValue: editModalData.password
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="手机号" style={{ marginLeft: 18, width: 520 }}>
                                {getFieldDecorator("mobile_edit", {
                                    rules: [{
                                        required: true, message: "请输入正确的手机号码!",
                                        pattern: /^1[34578]\d{9}$/
                                    }],
                                    initialValue: editModalData.phone
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="角色" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("persona_edit", {
                                    rules: [{ required: true, message: "请选择人员角色" }],
                                    initialValue: editModalData.userRoles
                                })(
                                    <Select style={{ width: "100%" }}>
                                        {personaListData.map(item => (
                                            <Option value={item.id}>{item.userRoles}</Option>
                                        ))}
                                    </Select>)}
                            </Form.Item>
                            <Form.Item label="备注" style={{ marginLeft: 42, width: 496 }}>
                                {getFieldDecorator("remark_edit", {
                                    initialValue: editModalData.remark
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="启用状态" style={{ marginLeft: 16, marginBottom: 0, width: 520 }}>
                                {getFieldDecorator("states_edit", {
                                    valuePropName: "checked",
                                    initialValue: editModalData.states
                                })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Table columns={columns} dataSource={personListData} bordered={false} pagination={paginationObj} rowSelection={rowSelection} />
            </Card>
        </div>
    );
};

export default connect(({ personManage, loading }) => ({
    personManage,
    loading: loading.models.personManage
}))(Form.create()(PersonManage));
