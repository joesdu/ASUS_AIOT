import React from "react";
import { connect } from "dva";
import moment from "moment";
import { Table, Card, Form } from "antd";
import styles from "../TableList.less";

const DeviceLogs = ({
    deviceLogs,
    dispatch
}) => {
    let { data, pagination, deviceId } = deviceLogs;

    //定义表头
    const columns = [
        {
            title: "时间",
            dataIndex: "createTime",
            key: "createTime",
            render: (text, record) => {
                return (
                    <div>{moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                );
            }
        },
        {
            title: "日志内容",
            dataIndex: "description",
            key: "description",
            render: (text, record) => {
                return <div>{record.description}</div>;
            }
        }
    ];

    const getJsonPrams = (pageNum, pageRows) => {
        return {
            userToken: localStorage.getItem("userToken"),
            deviceId: deviceId,
            firstRow: null,
            pageNum: pageNum,
            pageRows: pageRows
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
            let postObj = getJsonPrams(current - 1, pageSize);
            dispatch({ type: "deviceLogs/queryRule", payload: postObj });
        },
        onChange: (current, pageSize) => {
            let postObj = getJsonPrams(current - 1, pageSize);
            dispatch({ type: "deviceLogs/queryRule", payload: postObj });
        },
        showTotal: () => {
            return `共 ${pagination.total} 条 第 ${pagination.current + 1} / ${pagination.pageCount} 页`;
        }
    }
    /**分页合集 end **/

    return (
        <Card style={{ marginTop: 20 }} title="设备日志">
            <Table columns={columns} dataSource={data} bordered={false} pagination={paginationObj} />
        </Card>
    );
};

export default connect(({ deviceLogs, loading }) => ({
    deviceLogs,
    loading: loading.models.deviceLogs
}))(Form.create()(DeviceLogs));
