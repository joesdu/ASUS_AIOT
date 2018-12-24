import React, { Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Pagination, Table, Card, Form, message } from 'antd';
import styles from '../TableList.less';
import styles2 from '../main.less';
import $ from 'jquery';

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
}

const DeviceLogs = ({
    deviceLogs,
    loading,
    dispatch,
    formValues, //搜索条件
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
        setFieldsValue,
        getFieldsValue
    },
}) => {
    let { data, pagination, searchList, pageindex, pagesize } = deviceLogs

    //定义表头
    const columns = [
        {
            title: '时间',
            dataIndex: 'createTime',
            render: (text, record) => {
                return (
                    <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
                )
            }
        },
        {
            title: '日志内容',
            dataIndex: 'description',
            render: (text, record) => {
                return (
                    <div>{record.description}</div>
                )
            }
        }
    ]

    /**分页合集 start **/
    const showTotal = (total) => {
        return `共 ${pagination.total} 条 第 ${pagination.current} / ${pagination.pageCount} 页`;
    }
    const onShowSizeChange = (current, pageSize) => {
        const postObj = {
            "curPage": current,
            "pageRows": pageSize
        }
        dispatch({
            type: 'deviceLogs/setPage',
            payload: current,
            size: pageSize
        })
        //判断查询条件
        if (JSON.stringify(searchList) !== '{}') {
            let _c = {}
            _c = $.extend(postObj, searchList)
            dispatch({
                type: 'deviceLogs/queryRule',
                payload: postObj,
            })
        } else {
            dispatch({
                type: 'deviceLogs/queryRule',
                payload: postObj,
            })
        }
    }

    const getNowPage = (current, pageSize) => {
        let postObj = {
            "curPage": current,
            "pageRows": pageSize
        }
        dispatch({
            type: 'deviceLogs/setPage',
            payload: current,
            size: pageSize
        })
        //判断查询条件
        if (JSON.stringify(searchList) !== '{}') {
            let _c = {}
            _c = $.extend(postObj, searchList)
            dispatch({
                type: 'deviceLogs/queryRule',
                payload: postObj,
            })
        } else {
            dispatch({
                type: 'deviceLogs/queryRule',
                payload: postObj,
            })
        }
    }
    /**分页合集 end **/

    return (
        <div className={styles.tableList}>
            <Card style={{ marginTop: 20 }} title='设备日志'>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                />
                <Pagination
                    style={{ padding: "20px 0 0", textAlign: "center", marginBottom: '10px' }}
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
    )
}

export default connect(({ deviceLogs, loading }) =>
    ({ deviceLogs, loading: loading.models.deviceLogs, }))(Form.create()(DeviceLogs))
