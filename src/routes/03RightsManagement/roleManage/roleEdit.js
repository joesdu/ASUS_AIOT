import React from "react";
import { connect } from "dva";
import { Form, Input, Affix, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Card, Switch } from 'antd';
import styles from "./TableList.less";


const RoleEdit = ({
    roleEdit,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { allPageData } = roleEdit;

    const operationElementCount = 8;//運營中心權限個數
    const operationElements = ["6", "14", "7", "17", "18", "8", "19", "20"];//運營中心權限ID
    const dataElementCount = 4;//數據中心權限個數
    const dataElements = ["9", "21", "10", "22"];//數據中心權限ID
    const permissionsElementCount = 6;//權限控制權限個數
    const permissionsElements = ["11", "23", "24", "12", "25", "26"];//權限控制權限ID
    const systemElementCount = 3;//系統設置權限個數
    const systemElements = ["13", "27", "28"];//系統設置權限ID


    let checkedOperationElements = ["2"];
    let checkedDataElements = ["3"];
    let checkedPermissionsElements = ["4"];
    let checkedSystemElements = ["5"];



    const checkAllOnChange = (e) => {
        dispatch({
            type: "roleAddEdit/setAll", payload: {
                operation: e.target.checked ? operationElements : [],
                data: e.target.checked ? dataElements : [],
                permissions: e.target.checked ? permissionsElements : [],
                system: e.target.checked ? systemElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }

    //运营中心多选框中的元素被点击
    const operationOnChange = (checkList) => {
        dispatch({
            type: "roleAddEdit/setOperation", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < operationElementCount,
                checked: checkList.length === operationElementCount,
            }
        });
    }
    //运营中心全选控制
    const operationAllOnChange = (e) => {
        dispatch({
            type: "roleAddEdit/setOperation", payload: {
                checkList: e.target.checked ? operationElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //数据中心多选框中的元素被点击
    const dataOnChange = (checkList) => {
        dispatch({
            type: "roleAddEdit/setData", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < dataElementCount,
                checked: checkList.length === dataElementCount,
            }
        });
    }
    //數據中心全選控制
    const dataAllOnChange = (e) => {
        dispatch({
            type: "roleAddEdit/setData", payload: {
                checkList: e.target.checked ? dataElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //權限控制多选框中的元素被点击
    const permissionsOnChange = (checkList) => {
        dispatch({
            type: "roleAddEdit/setPermission", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < permissionsElementCount,
                checked: checkList.length === permissionsElementCount,
            }
        });
    }
    //權限控制全選控制
    const permissionsAllOnChange = (e) => {
        dispatch({
            type: "roleAddEdit/setPermission", payload: {
                checkList: e.target.checked ? permissionsElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //系統設置多选框中的元素被点击
    const systemOnChange = (checkList) => {
        dispatch({
            type: "roleAddEdit/setSystem", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < systemElementCount,
                checked: checkList.length === systemElementCount,
            }
        });
    }
    //系統設置全選控制
    const systemAllOnChange = (e) => {
        dispatch({
            type: "roleAddEdit/setSystem", payload: {
                checkList: e.target.checked ? systemElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }


    return (
        <div>
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
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} />
                        </Form.Item>
                        <Form.Item label="权限设置" style={{ marginLeft: 13, marginBottom: 0 }}>
                            <Checkbox onChange={checkAllOnChange} checked={checkAll}>全选</Checkbox>
                        </Form.Item>
                    </Form>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="2"
                        onChange={operationAllOnChange}
                        indeterminate={indeterminateOperation}
                        checked={operationCheckAll}
                        disabled={checkAll}>运营中心</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={operationOnChange} value={valueOperation} disabled={checkAll}>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="6" style={{ fontSize: 15, fontStyle: Blob }}>设备管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="14">查看</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="7" style={{ fontSize: 15, fontStyle: Blob }}>用户反馈</Checkbox></Col>
                            <Col span={8}><Checkbox value="17">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="18">标记</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="8" style={{ fontSize: 15, fontStyle: Blob }}>用户管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="19">查询</Checkbox></Col>
                            <Col span={8}><Checkbox value="20">查看详情</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="3"
                        onChange={dataAllOnChange}
                        indeterminate={indeterminateData}
                        checked={dataCheckAll}
                        disabled={checkAll}
                    >数据中心</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={dataOnChange} value={valueData} disabled={checkAll}>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="9" style={{ fontSize: 15, fontStyle: Blob }}>激活数据</Checkbox></Col>
                            <Col span={8}><Checkbox value="21">查看</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="10" style={{ fontSize: 15, fontStyle: Blob }}>活跃数据</Checkbox></Col>
                            <Col span={8}><Checkbox value="22">查看</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="4"
                        onChange={permissionsAllOnChange}
                        indeterminate={indeterminatePermissions}
                        checked={permissionsCheckAll}
                        disabled={checkAll}>权限管理</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={permissionsOnChange} value={valuePermissions} disabled={checkAll}>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="11" style={{ fontSize: 15, fontStyle: Blob }}>人员管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="23">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="24">管理</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="12" style={{ fontSize: 15, fontStyle: Blob }}>角色管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="25">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="26">管理</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="5"
                        onChange={systemAllOnChange}
                        indeterminate={indeterminateSystem}
                        checked={systemCheckAll}
                        disabled={checkAll}>系统设置</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={systemOnChange} value={valueSystem} disabled={checkAll}>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="13" style={{ fontSize: 15, fontStyle: Blob }}>账号管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="27">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="28">管理</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <div style={{}}>
                        <span style={{ float: "right" }}>
                            <Button style={{ marginRight: 16 }}>取消</Button>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </span>
                    </div>
                </div>
            </Card>

            {/* <Affix style={{ position: 'absolute', bottom: 0, right: 24 }}>
                <div style={{}}>
                <span style={{ float: "right" }}>
                    <Button style={{ marginRight: 16 }}>取消</Button>
                    <Button type="primary" htmlType="submit">保存</Button>
                    </span>
                </div>
            </Affix> */}
        </div>
    );
};

export default connect(({ roleEdit, loading }) => ({
    roleEdit,
    loading: loading.models.roleEdit
}))(Form.create()(RoleEdit));
