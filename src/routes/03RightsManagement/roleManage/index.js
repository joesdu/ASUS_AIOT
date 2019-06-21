import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Link } from "dva/router";
import { Table, Row, Col, Card, Form, Button, Switch, Modal, Input, Divider, Icon } from "antd";
import config from "../../../utils/config";

const RoleManagement = ({
    roleManagement,
    dispatch
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
            dataIndex: "status",
            render: (text, record) => {
                return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={statesChange.bind(this, { record: record })} checked={record.status} />);
            }
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
            render: (text, record) => {
                return <div>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>;
            }
        },
        {
            title: "操作",
            dataIndex: "",
            width: 150,
            render: (text, record) => {
                return (
                    <Fragment>
                        <Link to={{ pathname: `/roleEdit`, record: record }}>編輯</Link>
                        <Divider type="vertical" />
                        <a onClick={deleteModal.bind(this, { record: record })}>刪除</a>
                    </Fragment>
                );
            }
        }
    ];

    const getJsonPrams = (pageNum, pageRows) => {
        return {
            name: "",
            pageNum: pageNum,
            pageSize: pageRows,
            sortType: 1,
            userToken: config.userToken
        };
    };

    /**分页合集 start **/
    let paginationObj = {
        style: {
            padding: "20px 0 0",
            textAlign: "center",
            marginBottom: "10px"
        },
        total: pagination.total,
        defaultCurrent: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: (current, pageSize) => {
            dispatch({
                type: "roleManagement/getList",
                payload: getJsonPrams(current - 1, pageSize)
            });
        },
        onChange: (current, pageSize) => {
            dispatch({
                type: "roleManagement/getList",
                payload: getJsonPrams(current - 1, pageSize)
            });
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/
    const search = (value) => {
        let postObj = getJsonPrams(pagination.current, pagination.pageSize);
        postObj.name = value;
        dispatch({ type: "roleManagement/getList", payload: postObj });
    }

    const statesChange = (e, checked) => {
        let temp = roleListData.map((item) => {
            if (item.authorityId == e.record.authorityId) {
                item.status = checked;
            }
            return item;
        });
        dispatch({
            type: "roleManagement/getListSuccess",
            payload: temp,
            page: pagination
        });
        if (!checked) {
            Modal.confirm({
                okText: "确定",
                cancelText: "取消",
                title: '确认要停用此角色吗？',
                icon: (<Icon type="exclamation-circle" theme="twoTone" twoToneColor="#EEB422" />),
                content: '停用此角色后，此角色下的人员不能登录系统',
                onOk() {
                    dispatch({
                        type: "roleManagement/edit", payload: {
                            edit: {
                                authorityId: e.record.authorityId,
                                description: e.record.description,
                                name: e.record.name,
                                pageIds: e.record.pageIds,
                                status: e.record.status,
                                userToken: config.userToken
                            },
                            query: getJsonPrams(pagination.current, pagination.pageSize)
                        }
                    });
                },
                onCancel() {
                    dispatch({
                        type: "roleManagement/getList",
                        payload: getJsonPrams(pagination.current, pagination.pageSize)
                    });
                },
            });
        }
        else {
            dispatch({
                type: "roleManagement/edit", payload: {
                    edit: {
                        authorityId: e.record.authorityId,
                        description: e.record.description,
                        name: e.record.name,
                        pageIds: e.record.pageIds,
                        status: checked,
                        userToken: config.userToken
                    },
                    query: getJsonPrams(pagination.current, pagination.pageSize)
                }
            });
        }
    }

    const deleteModal = async (e) => {
        await dispatch({
            type: "roleManagement/checkDelete",
            payload: {
                authorityId: e.record.authorityId,
                userToken: config.userToken
            }
        });
        if (localStorage.getItem("RemoveRoleDetection") > 0) {
            Modal.error({
                okText: "取消",
                okType: "default",
                title: '无法删除此角色',
                icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
                content: '此角色有相关员工，若要删除此角色，需先将所有相关员工都移除',
            });
        }
        if (localStorage.getItem("RemoveRoleDetection") == 0) {
            Modal.confirm({
                title: '确认要删除此角色吗？',
                content: '删除此角色后，将角色信息将被清除',
                icon: (<Icon type="close-circle" theme="twoTone" twoToneColor="#CD0000" />),
                okText: "确定",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    dispatch({
                        type: "roleManagement/delete",
                        payload: {
                            delete: {
                                authorityId: e.record.authorityId,
                                userToken: config.userToken
                            },
                            query: getJsonPrams(pagination.current, pagination.pageSize)
                        }
                    });
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
        localStorage.removeItem("RemoveRoleDetection");
    };

    return (
        <div>
            <Card>
                <Form layout="inline" style={{ marginBottom: 15 }}>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button style={{ width: 82 }} type="primary" onClick={() => { dispatch({ type: "roleManagement/add" }) }}>+ 新建</Button>
                            </Form.Item>
                            <Form.Item style={{ float: "right" }}>
                                <Input.Search
                                    placeholder="请输入"
                                    onSearch={search}
                                    style={{ width: 260 }}
                                />
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
