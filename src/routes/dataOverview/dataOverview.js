import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Icon, Row, Col, Card, Form, Select, message } from 'antd';
import styles from './dataOverview.less';
import $ from 'jquery';
import classnames from 'classnames';

const ReactHighcharts = require('react-highcharts');
const FormItem = Form.Item;
const { Option } = Select;

const DataOverview = ({
    dataOverview,
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
    let { data, selected } = dataOverview

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
        dispatch({
            type: 'dataOverview/queryRule',
            payload: values
        })

        //保存查询条件
        dispatch({
            type: 'dataOverview/searchList',
            payload: values
        })
    }
    
    var config0= {
        chart: {
            height: 450,
        },
        xAxis: {
            categories: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
        },
        yAxis : {
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
        credits: {
            enabled: false             // 隐藏右下角版权
        },
        series: [{
            name: '激活设备/个',
            data: [190, 230, 310, 285, 264, 213, 295]
        }]
    };

    var config1 = {
        chart: {
            height: 450,
        },
        xAxis: {
            categories: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
        },
        yAxis: {
            title: {
                text: '活跃设备/个'
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
        credits: {
            enabled: false             // 隐藏右下角版权
        },
        series: [{
            name: '活跃设备/个',
            data: [910, 620, 830, 725, 924, 423, 622]
        }]
    };

    var config2 = {
        chart: {
            height: 450,
            type: 'column'
        },
        xAxis: {
            categories: ['上海', '重庆', '北京', '山西', '云南', '四川', '江苏', '广东', '安徽', '浙江']
        },
        yAxis: {
            title: {
                text: '活跃数量/个'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false             // 隐藏右下角版权
        },
        series: [{
            name:'活跃数量/个',
            data: [10, 20, 30, 25, 24, 23, 22, 45, 26, 14]
        }]
    };

    const getData = (k) => {
        dispatch({
            type: 'dataOverview/selected',
            payload: k
        })
    }

    const afterRender = (chart) => { /* do stuff with the chart  */
        console.log('重绘之前');
        try {
            chart.reflow();
        }
        catch (e) {
            console.log(e)
        }
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
                <Card className={styles.indexTopL} style={{ marginRight: '25px' }}>
                    <div className={styles.indexCont}>
                        <div className={styles.indexCont_span} style={{ marginRight: '10%'}}>
                            <span className={styles.indexTop_text}>今日激活</span>
                            <span style={{ color:'#1890FF'}}>154</span>
                            <div className={styles.indexBottom_text}>
                                <span>昨日激活&nbsp;&nbsp;</span>
                                <span>98</span>
                            </div>
                        </div>
                        <div className={styles.indexCont_span}>
                            <span className={styles.indexTop_text}>较昨日环比</span>
                            <span style={{ color: '#FF5F00' }}>38.5% <Icon type="caret-up" style={{ color: '#FF5F00', fontSize:'15px' }} /></span>
                            <div className={styles.indexBottom_text}>
                                <span>累计激活&nbsp;&nbsp;</span>
                                <span>12,398</span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className={styles.indexTopL} style={{ position: 'relative' }}>
                    <div className={styles.indexCont}>
                        <div className={styles.indexCont_span} style={{ marginRight: '10%' }}>
                            <span className={styles.indexTop_text}>今日活跃</span>
                            <span style={{ color: '#1890FF' }}>431</span>
                            <div className={styles.indexBottom_text}>
                                <span>昨日活跃&nbsp;&nbsp;</span>
                                <span>698</span>
                            </div>
                        </div>
                        <div className={styles.indexCont_span}>
                            <span className={styles.indexTop_text}>较昨日环比</span>
                            <span style={{ color: '#13C2C2' }}>38.5% <Icon type="caret-down" style={{ color: '#13C2C2', fontSize: '15px' }} /></span>
                            <div className={styles.indexBottom_text}>
                                <span>活跃占比&nbsp;&nbsp;</span>
                                <span>3.4%</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card style={{ marginTop: '15px' }}>
                <div className={styles.indexData}>
                    <div className={styles.indexData_top}>
                        <span>激活数据趋势</span>
                        <ul className={styles.indexData_topUL} style={{ float: 'right' }}>
                            <li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>近7天</li>
                            <li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>近15天</li>
                            <li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近30天</li>
                        </ul>
                        <div style={{ width: '100%' }}>
                            <ReactHighcharts config={config0} callback={afterRender}></ReactHighcharts>
                        </div>
                    </div>
                </div>
            </Card>
            <Card style={{ marginTop: '15px' }}>
                <div className={styles.indexData}>
                    <div className={styles.indexData_top}>
                        <span>活跃数据趋势</span>
                        <ul className={styles.indexData_topUL} style={{ float: 'right' }}>
                            <li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>近7天</li>
                            <li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>近15天</li>
                            <li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近30天</li>
                        </ul>
                        <div style={{ width: '100%' }}>
                            <ReactHighcharts config={config1}></ReactHighcharts>
                        </div>
                    </div>
                </div>
            </Card>
            <Card style={{ marginTop: '15px' }}>
                <div className={styles.indexData}>
                    <div className={styles.indexData_top}>
                        <span>活跃地区</span>
                        <ul className={styles.indexData_topUL} style={{ float: 'right' }}>
                            <li className={selected == 0 ? styles.active : ''} onClick={getData.bind(this, 0)}>昨天</li>
                            <li className={selected == 1 ? styles.active : ''} onClick={getData.bind(this, 1)}>近7天</li>
                            <li className={selected == 2 ? styles.active : ''} onClick={getData.bind(this, 2)}>近15天</li>
                            <li className={selected == 3 ? styles.active : ''} onClick={getData.bind(this, 3)}>近30天</li>
                        </ul>
                        <div style={{ width: '100%' }}>
                            <ReactHighcharts config={config2}></ReactHighcharts>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default connect(({ dataOverview, loading }) =>
    ({ dataOverview, loading: loading.models.dataOverview, }))(Form.create()(DataOverview))
