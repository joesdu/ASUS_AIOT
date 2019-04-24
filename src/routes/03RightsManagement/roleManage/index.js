import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Link } from "dva/router";
import { Table, Row, Col, Card, Form, Button, Switch, Modal, Input, Divider, Icon } from "antd";

const RoleManagement = ({
    roleManagement,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { roleListData, pagination, searchList } = roleManagement;

    //定义表头
    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            align: 'left',
            width: 400,
            render: (text, record) => {
                return (
                    <div style={{ color: "#272727" }}>
                        <div>{record.name}</div>
                    </div>
                );
            }
        },
        {
            title: "状态",
            dataIndex: "states",
            render: (text, record) => {
                return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={statesChange.bind(this, record)} defaultChecked={record.states} />);
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
            width: 150,
            render: (text, record) => {
                return (
                    <div>
                        <Fragment>
                            <Link to={{ pathname: `/roleAddEdit`, record: record }}>編輯</Link>
                            <Divider type="vertical" />
                            <a onClick={deleteModal.bind(this, { related: record.related })}>刪除</a>
                        </Fragment>
                    </div>
                );
            }
        }
    ];

    const getJsonPrams = (parm, pageNum, pageRows) => {
        let searchParm = parm.searchParm
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
                dispatch({ type: "roleManagement/getRoleList", payload: postObj });
            } else {
                dispatch({ type: "roleManagement/getRoleList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "roleManagement/getRoleList", payload: postObj });
            } else {
                dispatch({ type: "roleManagement/getRoleList", payload: postObj });
            }
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    const statesChange = (record, checked) => {
        if (!checked) {
            Modal.confirm({
                okText: "确定",
                cancelText: "取消",
                title: '确认要停用此角色吗？',
                icon: (<Icon type="exclamation-circle" theme="twoTone" twoToneColor="#EEB422" />),
                content: '停用此角色后，此角色下的人员不能登录系统',
                onOk() {

                    dispatch({ type: "roleManagement/getRoleList", payload: "2" });
                },
                onCancel() {
                    dispatch({ type: "roleManagement/getRoleList", payload: "1" });
                },
            });
        }
    }

    const deleteModal = (e) => {
        if (e.related) {
            Modal.error({
                okText: "取消",
                okType: "default",
                title: '无法删除此角色',
                icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
                content: '此角色有相关员工，若要删除此角色，需先将所有相关员工都移除',
            });
        } else {
            Modal.confirm({
                title: '确认要删除此角色吗？',
                content: '删除此角色后，将角色信息将被清除',
                icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
                okText: "确定",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    };

    return (
        <div>
            <Card>
                <Form layout="inline" style={{ marginBottom: 15 }}>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button style={{ width: 82 }} type="primary" onClick={() => { dispatch({ type: "roleManagement/addNew" }) }}>+ 新建</Button>
                            </Form.Item>
                            <Form.Item style={{ float: "right" }}>
                                {getFieldDecorator("searchParm")(
                                    <Input.Search
                                        placeholder="请输入"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 260 }}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={roleListData} bordered={false} pagination={paginationObj} />
            </Card>
        </div>
    );
};

export default connect(({ roleManagement, loading }) => ({
    roleManagement,
    loading: loading.models.roleManagement
}))(Form.create()(RoleManagement));
