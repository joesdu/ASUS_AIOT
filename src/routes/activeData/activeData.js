import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table,Tabs, Icon, Row, Col, Card, Form, Select, message } from 'antd';
import styles from './activeData.less';
import $ from 'jquery';
import classnames from 'classnames';

const ReactHighcharts = require('react-highcharts');
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const ActiveData = ({
    activeData,
    loading,
    dispatch,
    formValues, //搜索条件
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue,
        getFieldsValue
    },
}) => {
    let { data, selected } = activeData

    let _datas = []
    //角色信息
    try {
        _datas = data.data.list
    } catch (e) { }

    //查询条件
    const handleSearch = (e) => {
        e.preventDefault();
        let values = getFieldsValue()
        if (JSON.stringify(values) == "{}") {
            message.warning('请选择查询条件')
            return
        }
        //赛选数据
        values.storeId = storeIds
        dispatch({
            type: 'activeData/queryRule',
            payload: values
        })

        //保存查询条件
        dispatch({
            type: 'activeData/searchList',
            payload: values
        })
    };

    var config = {
        chart: {
            height: 450,
        },
        xAxis: {
            categories: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
        },
        yAxis: {
            title: {
                text: '激活设备/个'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '激活设备/个',
            data: [190, 230, 310, 285, 264, 213, 295]
        }]
    };

    //定义表头
    const columns = [
        {
            title: '日期',
            dataIndex: '',
            render: (text, record) => {
                return (
                    <div>{moment(text).format('YYYY-MM-DD')}</div>
                )
            }
        },
        {
            title: '每日激活数量',
            dataIndex: '',
            render: (text, record) => {
                return (
                    <div></div>
                );
            }
        },
        {
            title: '累计激活总数',
            dataIndex: '',
            render: (text, record) => {
                return (
                    <div></div>
                );
            }
        }
    ];

    const getData = (k) => {
        console.log(k);
        dispatch({
            type: 'activeData/selected',
            payload: k
        })
    }

    const callback = (key) => {
        console.log(key);
    };


    return (
        <div>
            <Card>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>
                        <Form onSubmit={handleSearch} layout="inline">
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="当前产品" style={{ marginLeft: 4 }} >
                                        {getFieldDecorator('products')(
                                            <Select placeholder="全部产品" style={{ width: '100%' }}>
                                                <Option value={1}>11111</Option>
                                                <Option value={2}>22222</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Card>

            <div style={{ marginTop: '15px' }} className={styles.indexTop}>
                <Card className={styles.indexTopL}>
                    <div className={styles.indexCont}>
                        <div className={styles.indexCont_span} style={{ marginRight: '10%' }}>
                            <span className={styles.indexTop_text}>今日激活</span>
                            <span style={{ color: '#1890FF' }}>154</span>
                            <div className={styles.indexBottom_text}>
                                <span>昨日激活&nbsp;&nbsp;</span>
                                <span>98</span>
                            </div>
                        </div>
                        <div className={styles.indexCont_span} style={{ marginRight: '10%' }}>
                            <span className={styles.indexTop_text}>近7日激活</span>
                            <span style={{ color: '#1890FF' }}>1,180</span>
                            <div className={styles.indexBottom_text}>
                                <span>上7日激活&nbsp;&nbsp;</span>
                                <span>1,039</span>
                            </div>
                        </div>
                        <div className={styles.indexCont_span} style={{ marginTop: '-48px',marginRight: '10%' }}>
                            <span className={styles.indexTop_text}>累计激活总数</span>
                            <span style={{ color: '#1890FF' }}>12,398</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card style={{ marginTop: '15px' }}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="每日激活趋势" key="1">
                        <div className={styles.indexData}>
                            <div className={styles.indexData_top}>
                                <ul className={styles.indexData_topUL} style={{ float: 'right' }}>
                                    <li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>近7天</li>
                                    <li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>近15天</li>
                                    <li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近30天</li>
                                </ul>
                                <div style={{ width: '100%' }}>
                                    <ReactHighcharts config={config}></ReactHighcharts>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="累计激活趋势" key="2">
                        <div className={styles.indexData}>
                            <div className={styles.indexData_top}>
                                <ul className={styles.indexData_topUL} style={{ float: 'right' }}>
                                    <li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>近7天</li>
                                    <li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>近15天</li>
                                    <li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近30天</li>
                                </ul>
                                <div style={{ width: '100%' }}>
                                    <ReactHighcharts config={config}></ReactHighcharts>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
            <Card title='激活数据明细'>
                <Table
                    columns={columns}
                    //dataSource={}
                    bordered
                    pagination={false}
                />
            </Card>
        </div>
    )
}

export default connect(({ activeData, loading }) =>
    ({ activeData, loading: loading.models.activeData, }))(Form.create()(ActiveData))
