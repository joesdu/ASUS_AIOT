import React from "react";
import { connect } from "dva";
import { Form, Input, Affix, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Card, Switch } from 'antd';
import styles from "./TableList.less";


const RoleAddEdit = ({
    roleAddEdit,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { detailData } = roleAddEdit;

    let container;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    };

    return (
        <div ref={(node) => { container = node; }}>
            <Card title="角色信息">
                <div className={styles.tableForm}>
                    <Form>
                        <Form.Item label="角色名称" extra='不超过16个字'>
                            {getFieldDecorator('username', {
                                rules: [{ type: 'username', message: '请输入角色名称', }, { required: true, message: '请输入角色名称', }],
                            })(
                                <Input placeholder="请输入" maxLength={16} />
                            )}
                        </Form.Item>
                        <Form.Item label="启用状态" style={{ marginLeft: 13 }}>
                            {getFieldDecorator('states')(
                                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} />
                            )}
                        </Form.Item>
                        <Form.Item label="权限设置" style={{ marginLeft: 13, marginBottom: 0 }}>
                            {getFieldDecorator('captcha')(
                                <Checkbox>全选</Checkbox>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}>运营中心</Checkbox>
                    <label style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</label>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">设备管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">用户反馈</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="C">标记</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">用户管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}>数据中心</Checkbox>
                    <label style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</label>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">激活数据</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">活跃数据</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}>权限管理</Checkbox>
                    <label style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</label>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">人员管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="C">管理</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="A">角色管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="B">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="C">管理</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Affix style={{ position: 'absolute', bottom: 0, right: 24}} target={() => container}>
                <span style={{ float: "right" }}>
                    <Button style={{ marginRight: 16 }}>取消</Button>
                    <Button type="primary" htmlType="submit">保存</Button>
                </span>
            </Affix>
        </div>
    );
};

export default connect(({ roleAddEdit, loading }) => ({
    roleAddEdit,
    loading: loading.models.roleAddEdit
}))(Form.create()(RoleAddEdit));
