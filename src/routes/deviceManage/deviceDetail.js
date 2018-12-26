import React, { Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Pagination, Table, Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import styles from '../TableList.less';
import styles2 from '../main.less';
import $ from 'jquery';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
}

const DeviceDetail = ({
    deviceDetail,
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
    let { data, pagination, searchList, pageindex, pagesize } = devices

    return (
        <div>
            <Card title="基本信息">
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>
                        <Form layout="inline">
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="设备ID" >
                                        <label>1390190391OIEIO93901092</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="生产UUID">
                                        <label>391093PEIEOIkjs93910</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="自定义名称">
                                        <label>智能台灯-公版-1</label>
                                    </FormItem>
                                </Col>                                
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="默认名称" >
                                        <label>智能台灯-公版-1</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="所属产品">
                                        <label>智能台灯</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="产品ID">
                                        <label>1390190391OIEIO93901092</label>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="WiFi固件版本" >
                                        <label>1.2.31-12</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="MCU固件版本">
                                        <label>3.33.290-23fd</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="首次激活时间">
                                        <label>2018-04-12  21:21:54</label>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Card>

            <Card title="设备激活信息">
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>
                        <Form layout="inline">
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="是否激活" >
                                        <label>是</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="首次激活时间">
                                        <label>2018-04-12  21:21:54</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="最近激活时间">
                                        <label>2018-04-12  21:21:54</label>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="更新时间" >
                                        <label>2018-04-12  21:21:54</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="当前在线">
                                        <label>是</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="绑定用户">
                                        <label>86-188 8888 8888</label>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="经纬度" >
                                        <label>120.29129393819，30.29129393819</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="地理位置">
                                        <label>杭州</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="渠道">
                                        <label>APP注册</label>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Card>

            <Card title='设备运行状态'>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>
                        <Form layout="inline">
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="开关" >
                                        <label>是</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="模式">
                                        <label>阅读模式</label>
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="亮度">
                                        <label>35</label>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="色温" >
                                        <label>3570</label>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default connect(({ deviceDetail, loading }) =>
    ({ deviceDetail, loading: loading.models.deviceDetail, }))(Form.create()(DeviceDetail))
