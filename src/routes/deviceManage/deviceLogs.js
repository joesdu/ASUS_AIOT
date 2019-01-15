import React, { Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import { Pagination, Table, Card, Form, message } from "antd";
import styles from "../TableList.less";
import $ from "jquery";

const DeviceLogs = ({
    deviceLogs,
    loading,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { data, pagination, pageindex, pagesize } = deviceLogs;

    //定义表头
    const columns = [
        {
            title: "时间",
            dataIndex: "createTime",
            render: (text, record) => {
                return (
                    <div>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                );
            }
        },
        {
            title: "日志内容",
            dataIndex: "description",
            render: (text, record) => {
                return <div>{record.description}</div>;
            }
        }
    ];

    const getJsonPrams = (pageNum, pageRows) => {
        return {
            userToken: localStorage.getItem("userToken"),
            deviceId: localStorage.getItem("deviceId"),
            firstRow: null,
            pageNum: pageNum,
            pageRows: pageRows
        };
    };

    /**分页合集 start **/
    const showTotal = total => {
        return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${
            pagination.pageCount
            } 页`;
    };

    const onShowSizeChange = (current, pageSize) => {
        let postObj = getJsonPrams(current - 1, pageSize);
        dispatch({ type: "deviceLogs/setPage", payload: current, size: pageSize });
        dispatch({ type: "deviceLogs/queryRule", payload: postObj });
    };

    const getNowPage = (current, pageSize) => {
        let postObj = getJsonPrams(current - 1, pageSize);
        dispatch({ type: "deviceLogs/setPage", payload: current, size: pageSize });
        dispatch({ type: "deviceLogs/queryRule", payload: postObj });
    };
    /**分页合集 end **/

    return (
        <div className={styles.tableList}>
            <Card style={{ marginTop: 20 }} title="设备日志">
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered={false}
                    pagination={false}
                />
                <Pagination
                    style={{ padding: "20px 0 0", textAlign: "center", marginBottom: "10px" }}
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

export default connect(({ deviceLogs, loading }) => ({
    deviceLogs,
    loading: loading.models.deviceLogs
}))(Form.create()(DeviceLogs));
