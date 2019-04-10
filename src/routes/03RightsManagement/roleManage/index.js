import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Row, Col, Card, Form, Button, Switch, Modal, Radio, Input, Divider } from "antd";

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
            width: 500,
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
            dataIndex: "name",
            align: 'left',
            render: (text, record) => {
                if (record.states === 1) {
                    return (<div>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                    </div>);
                } else {
                    return (<div>
                        <Switch checkedChildren="开" unCheckedChildren="关" />
                    </div>);
                }
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
                            <a onClick={showModal.bind(this, {})}>編輯</a>
                            <Divider type="vertical" />
                            <a onClick={showModal.bind(this, {})}>刪除</a>
                        </Fragment>
                    </div>
                );
            }
        }
    ];

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
                dispatch({ type: "userFeedback/feedbackList", payload: postObj });
            } else {
                dispatch({ type: "userFeedback/feedbackList", payload: postObj });
            }
        },
        onChange: (current, pageSize) => {
            let values = getFieldsValue();
            let postObj = getJsonPrams(values, current - 1, pageSize);
            //判断查询条件
            if (JSON.stringify(searchList) !== "{}") {
                dispatch({ type: "userFeedback/feedbackList", payload: postObj });
            } else {
                dispatch({ type: "userFeedback/feedbackList", payload: postObj });
            }
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    const dateFormat = "YYYY-MM-DD";

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
            destroyOnClose: true,
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
                <Form layout="inline" style={{ marginBottom: 15 }}>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button type="primary">新建</Button>
                            </Form.Item>
                            <Form.Item style={{ float: "right" }}>
                                {getFieldDecorator("searchParm")(
                                    <Input.Search
                                        placeholder="请输入"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 200 }}
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
