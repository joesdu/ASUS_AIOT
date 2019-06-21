import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Input, Select, Button, Switch, Divider, Modal, Icon, message } from "antd";
import styles from "../../TableList.less";
import config from "../../../utils/config";

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
    let { personListData, personaListData, addBtnVisible, editBtnVisible, editModalData, pagination } = personManage;

    let deleteArray = [];
    //定义表头
    const columns = [
        {
            title: "用户名",
            dataIndex: "userName",
            width: 250,
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.userName}</div>
                );
            }
        },
        {
            title: "姓名",
            width: 250,
            align: 'left',
            dataIndex: "nickname",
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.nickname}</div>
                );
            },
        },
        {
            title: "手机号",
            dataIndex: "mobile",
            width: 250,
            align: 'left',
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.mobile}</div>
                );
            }
        },
        {
            title: "用户角色",
            dataIndex: "authorityName",
            align: 'left',
            width: 200,
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>{record.authorityName}</div>
                );
            }
        },
        {
            title: "状态",
            dataIndex: "status",
            width: 150,
            render: (text, record) => {
                return (
                    <Switch onChange={statesChange.bind(this, { record: record })} checkedChildren="开" unCheckedChildren="关" checked={record.status} />
                );
            }
        },
        {
            title: "最近登录时间",
            dataIndex: "loginTime",
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
                    <Fragment>
                        <a onClick={editModalShow.bind(this, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={deleteItem.bind(this, record)}>刪除</a>
                    </Fragment>
                );
            }
        }
    ];

    const getJsonPrams = (parm, pageNum, pageRows) => {
        return {
            authorityId: !!parm.authorityId && parm.authorityId != "全部" ? parm.authorityId : null,
            mobile: !!parm.mobile ? parm.mobile : null,
            nickname: !!parm.nickname ? parm.nickname : null,
            pageNum: pageNum,
            pageSize: pageRows,
            sortType: 1,
            status: parm.status == 0 ? 0 : parm.status == 1 ? 1 : null,
            userToken: config.userToken
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
        dispatch({ type: "personManage/getList", payload: _value });
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
        dispatch({ type: "personManage/getPersonaList" });
        //重置查询所有
        let _ars = getJsonPrams(fields, 0, 10);
        dispatch({ type: "personManage/getList", payload: _ars });
    };

    /**分页合集 start **/
    let paginationObj = {
        style: { padding: "20px 0 0", textAlign: "center", marginBottom: "10px" },
        total: pagination.total,
        defaultCurrent: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            dispatch({ type: "personManage/getList", payload: postObj });
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            dispatch({ type: "personManage/getList", payload: postObj });
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            deleteArray = selectedRows;
        }
    };

    const deleteItem = (_parm) => {
        deleteArray = [_parm];
        showDeleteConfirm();
    }

    const verifyData = (type, values) => {
        switch (type) {
            case "add":
                return !!values.authorityId_add && !!values.mobile_add && !!values.nickname_add && !!values.password_add && !!values.userName_add
                    && values.authorityId_add != "" && values.mobile_add != "" && values.nickname_add != "" && values.password_add != "" &&
                    values.userName_add != "";
            case "edit":
                return !!values.authorityId_edit && !!values.mobile_edit && !!values.nickname_edit && !!values.password_edit && !!values.userName_edit
                    && values.authorityId_edit != "" && values.mobile_edit != "" && values.nickname_edit != "" && values.password_edit != "" &&
                    values.userName_edit != "";
        }
    }

    const addModalSH = () => dispatch({ type: "personManage/setAddVisibleState", visible: !addBtnVisible });
    const addModalOk = () => {
        let values = getFieldsValue();
        if (!verifyData("add", values)) {
            console.log("提示错误:", values);
            message.info("请按照提示输入正确的参数");
            return;
        }
        dispatch({
            type: "personManage/add", payload: {
                add: {
                    authorityId: values.authorityId_add,
                    headImg: null,
                    mobile: values.mobile_add,
                    nickname: values.nickname_add,
                    password: values.password_add,
                    remark: values.remark_add,
                    status: values.status_add,
                    userName: values.userName_add,
                    userToken: config.userToken
                },
                query: getJsonPrams(values, pagination.current, pagination.pageSize)
            }
        });
        dispatch({ type: "personManage/setEditVisibleState", visible: false })
        addModalSH();
    }

    const editModalShow = (e) => {
        dispatch({ type: "personManage/setEditModalData", data: e })
        dispatch({ type: "personManage/setEditVisibleState", visible: true })
    };
    const editModalOk = () => {
        let values = getFieldsValue();
        if (!verifyData("edit", values)) {
            message.info("请按照提示输入正确的参数");
            return;
        }
        Modal.confirm({
            title: '确认修改',
            okText: '确定',
            cancelText: '取消',
            destroyOnClose: true,
            style: ({ marginTop: 130 }),
            icon: (<Icon type="info-circle" theme="twoTone" twoToneColor="#FBB937" />),
            content: "确认要修改此人员的信息吗?",
            onOk() {
                dispatch({
                    type: "personManage/edit", payload: {
                        edit: {
                            authorityId: values.authorityId_edit,
                            backUserId: editModalData.backUserId,
                            headImg: editModalData.headImg,
                            mobile: values.mobile_edit,
                            nickname: values.nickname_edit,
                            password: values.password_edit,
                            remark: values.remark_edit,
                            status: values.status_edit,
                            userName: values.userName_edit,
                            userToken: config.userToken
                        },
                        query: getJsonPrams(values, pagination.current, pagination.pageSize)
                    }
                });
                dispatch({ type: "personManage/setEditVisibleState", visible: false })
            }
        });
    }
    const editModalHide = () => {
        dispatch({ type: "personManage/setEditVisibleState", visible: false })
    }

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: '确认要删除所选人员吗？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            destroyOnClose: true,
            icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
            content: "删除所选人员后，对应人员无法登录",
            onOk() {
                dispatch({
                    type: "personManage/delete", payload: {
                        delete: {
                            backUserIds: deleteArray.map((item) => {
                                return item.backUserId;
                            }),
                            userToken: config.userToken
                        },
                        query: getJsonPrams(getFieldsValue(), pagination.current, pagination.pageSize)
                    }
                });
                deleteArray = [];
            }
        });
    }

    const statesChange = (e, checked) => {
        let temp = personListData.map((item) => {
            if (item.backUserId == e.record.backUserId) {
                item.status = checked;
            }
            return item;
        });
        dispatch({ type: "personManage/getListSuccess", payload: temp, page: pagination });
        let values = getFieldsValue();
        if (!checked) {
            Modal.confirm({
                okText: "确定",
                cancelText: "取消",
                title: '确认要停用此人员吗？',
                icon: (<Icon type="exclamation-circle" theme="twoTone" twoToneColor="#EEB422" />),
                content: '停用此人员后，此人员无法登录系统',
                onOk() {
                    dispatch({
                        type: "personManage/edit", payload: {
                            edit: {
                                authorityId: e.record.authorityId,
                                backUserId: e.record.backUserId,
                                headImg: e.record.headImg,
                                mobile: e.record.mobile,
                                nickname: e.record.nickname,
                                password: e.record.password,
                                remark: e.record.remark,
                                status: e.record.status,
                                userName: e.record.userName,
                                userToken: config.userToken
                            },
                            query: getJsonPrams(values, pagination.current, pagination.pageSize)
                        }
                    });
                },
                onCancel() {
                    dispatch({ type: "personManage/getList", payload: getJsonPrams(values, pagination.current, pagination.pageSize) });
                },
            });
        }
        else {
            dispatch({
                type: "personManage/edit", payload: {
                    edit: {
                        authorityId: e.record.authorityId,
                        backUserId: e.record.backUserId,
                        headImg: e.record.headImg,
                        mobile: e.record.mobile,
                        nickname: e.record.nickname,
                        password: e.record.password,
                        remark: e.record.remark,
                        status: checked,
                        userName: e.record.userName,
                        userToken: config.userToken
                    },
                    query: getJsonPrams(values, pagination.current, pagination.pageSize)
                }
            });
        }
    }


    return (
        <div>
            <Card>
                <div className={styles.tableListForm}>
                    <Form onSubmit={handleSearch} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <Form.Item label="手机号" style={{ marginLeft: 17 }}>
                                    {getFieldDecorator("mobile")(
                                        <Input placeholder="请输入手机号" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="名称" style={{ marginLeft: 30 }}>
                                    {getFieldDecorator("nickname")(
                                        <Input placeholder="请输入姓名/昵称" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <Form.Item label="角色" style={{ marginLeft: 30 }}>
                                    {getFieldDecorator("authorityId", { initialValue: "全部" })(
                                        <Select placeholder="全部" style={{ width: "100%" }}>
                                            <Option value={null}>全部</Option>
                                            {personaListData.map(item => (
                                                <Option value={item.authorityId}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <Form.Item label="状态" style={{ marginLeft: 30, marginBottom: 0 }}>
                                    {getFieldDecorator("status")(
                                        <Select placeholder="全部" style={{ width: "100%" }}>
                                            <Option value={null}>全部</Option>
                                            <Option value={1}>启用</Option>
                                            <Option value={0}>禁用</Option>
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
                                                {getFieldDecorator("nickname_add", {
                                                    rules: [{
                                                        required: true,
                                                        message: "请输入姓名"
                                                    }]
                                                })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="用户名" style={{ marginLeft: 18, width: 520 }}>
                                                {getFieldDecorator("userName_add", {
                                                    rules: [{
                                                        required: true,
                                                        message: "请输入用户名"
                                                    }]
                                                })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="密码" style={{ marginLeft: 31, width: 507 }}>
                                                {getFieldDecorator("password_add", {
                                                    rules: [{
                                                        required: true,
                                                        message: "请输入密码"
                                                    }]
                                                })(<Input.Password placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="手机号" style={{ marginLeft: 18, width: 520 }}>
                                                {getFieldDecorator("mobile_add", {
                                                    rules: [{
                                                        required: true,
                                                        message: "请输入正确的手机号码!",
                                                        pattern: /^1[34578]\d{9}$/
                                                    }],
                                                })(<Input placeholder="请输入" />)}
                                            </Form.Item>
                                            <Form.Item label="角色" style={{ marginLeft: 31, width: 507 }}>
                                                {getFieldDecorator("authorityId_add", {
                                                    rules: [{
                                                        required: true,
                                                        message: "请选择人员角色"
                                                    }]
                                                })(
                                                    <Select style={{ width: "100%" }}>
                                                        {personaListData.map(item => (
                                                            <Option value={item.authorityId}>{item.name}</Option>
                                                        ))}
                                                    </Select>)}
                                            </Form.Item>
                                            <Form.Item label="备注" style={{ marginLeft: 42, width: 496 }}>
                                                {getFieldDecorator("remark_add")(
                                                    <Input placeholder="请输入" />
                                                )}
                                            </Form.Item>
                                            <Form.Item label="启用状态" style={{ marginLeft: 16, marginBottom: 0, width: 520 }}>
                                                {getFieldDecorator("status_add", {
                                                    valuePropName: "checked",
                                                    initialValue: true
                                                })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: 82 }} type="danger" block onClick={showDeleteConfirm}>删除</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Modal title="编辑人员信息" visible={editBtnVisible} onOk={editModalOk} onCancel={editModalHide} okText="确认" cancelText="取消" destroyOnClose={true} width={850}>
                    <div className={styles.tableListForm}>
                        <Form layout="inline">
                            <Form.Item label="姓名" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("nickname_edit", {
                                    rules: [{
                                        required: true,
                                        message: "请输入姓名"
                                    }],
                                    initialValue: editModalData.nickname
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="用户名" style={{ marginLeft: 18, width: 520 }}>
                                {getFieldDecorator("userName_edit", {
                                    rules: [{
                                        required: true,
                                        message: "请输入用户名"
                                    }],
                                    initialValue: editModalData.userName
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="密码" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("password_edit", {
                                    rules: [{
                                        required: true,
                                        message: "请输入密码"
                                    }],
                                    initialValue: editModalData.password
                                })(<Input.Password placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="手机号" style={{ marginLeft: 18, width: 520 }}>
                                {getFieldDecorator("mobile_edit", {
                                    rules: [{
                                        required: true,
                                        message: "请输入正确的手机号码!",
                                        pattern: /^1[34578]\d{9}$/
                                    }],
                                    initialValue: editModalData.mobile
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="角色" style={{ marginLeft: 31, width: 507 }}>
                                {getFieldDecorator("authorityId_edit", {
                                    rules: [{
                                        required: true,
                                        message: "请选择人员角色"
                                    }],
                                    initialValue: editModalData.authorityId
                                })(
                                    <Select style={{ width: "100%" }}>
                                        {personaListData.map(item => (
                                            <Option value={item.authorityId}>{item.name}</Option>
                                        ))}
                                    </Select>)}
                            </Form.Item>
                            <Form.Item label="备注" style={{ marginLeft: 42, width: 496 }}>
                                {getFieldDecorator("remark_edit", {
                                    initialValue: editModalData.remark
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                            <Form.Item label="启用状态" style={{ marginLeft: 16, marginBottom: 0, width: 520 }}>
                                {getFieldDecorator("status_edit", {
                                    valuePropName: "checked",
                                    initialValue: editModalData.status
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
