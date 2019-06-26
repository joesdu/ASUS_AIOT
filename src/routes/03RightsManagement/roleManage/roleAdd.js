import React from "react";
import { connect } from "dva";
import { Form, Input, Affix, Row, Col, Checkbox, Button, Card, Switch } from 'antd';
import styles from "./TableList.less";
import config from "../../../utils/config";

const RoleAdd = ({
    roleAdd,
    dispatch,
    form: {
        getFieldDecorator,
        setFieldsValue,
        getFieldsValue
    }
}) => {
    let { valueOperation, valueData, valuePermissions, valueSystem,
        indeterminateOperation, indeterminateData, indeterminatePermissions, indeterminateSystem,
        checkAll, operationCheckAll, dataCheckAll, permissionsCheckAll, systemCheckAll,
        deviceCheck, indeterminateDevice, valueDevice, feedbackCheck, indeterminateFeedback, valueFeedback, userManageCheck,
        indeterminateUserManage, valueUserManage
    } = roleAdd;

    const operationElements = ["6", "7", "8",];//運營中心權限ID
    const deviceElements = ["14"];//設備管理權限ID
    const feedbackElements = ["17", "18"];//用戶反饋權限ID
    const userElements = ["19", "20"];//用戶管理權限ID

    const dataElementCount = 4;//數據中心權限個數
    const dataElements = ["9", "21", "10", "22"];//數據中心權限ID
    const permissionsElementCount = 6;//權限控制權限個數
    const permissionsElements = ["11", "23", "24", "12", "25", "26"];//權限控制權限ID
    const systemElementCount = 3;//系統設置權限個數
    const systemElements = ["13", "27", "28"];//系統設置權限ID

    const checkedOperationElements = ["2"];
    const checkedDataElements = ["3"];
    const checkedPermissionsElements = ["4"];
    const checkedSystemElements = ["5"];

    const checkAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setAll", payload: {
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
            type: "roleAdd/setOperation", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < operationElements.length,
                checked: checkList.length === operationElements.length,
            }
        });
    }
    //运营中心全选控制
    const operationAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setOperation", payload: {
                checkList: e.target.checked ? operationElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
        deviceManageChk(e);
        feedbackChk(e);
        userManageChk(e);
    }
    //設備管理多选框中的元素被点击
    const deviceOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setDevice", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < deviceElements.length,
                checked: checkList.length === deviceElements.length,
            }
        });
    }
    //設備管理選項被點擊
    const deviceManageChk = (e) => {
        dispatch({
            type: "roleAdd/setDevice", payload: {
                checkList: e.target.checked ? deviceElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //用戶反饋多选框中的元素被点击
    const feedbackOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setFeedback", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < feedbackElements.length,
                checked: checkList.length === feedbackElements.length,
            }
        });
    }
    //用戶反饋選項被點擊
    const feedbackChk = (e) => {
        dispatch({
            type: "roleAdd/setFeedback", payload: {
                checkList: e.target.checked ? feedbackElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //用戶反饋多选框中的元素被点击
    const userManageOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setUserManager", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < userElements.length,
                checked: checkList.length === userElements.length,
            }
        });
    }
    //用戶反饋選項被點擊
    const userManageChk = (e) => {
        dispatch({
            type: "roleAdd/setUserManager", payload: {
                checkList: e.target.checked ? userElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //数据中心多选框中的元素被点击
    const dataOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setData", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < dataElementCount,
                checked: checkList.length === dataElementCount,
            }
        });
    }
    //數據中心全選控制
    const dataAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setData", payload: {
                checkList: e.target.checked ? dataElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //權限控制多选框中的元素被点击
    const permissionsOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setPermission", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < permissionsElementCount,
                checked: checkList.length === permissionsElementCount,
            }
        });
    }
    //權限控制全選控制
    const permissionsAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setPermission", payload: {
                checkList: e.target.checked ? permissionsElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }
    //系統設置多选框中的元素被点击
    const systemOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setSystem", payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < systemElementCount,
                checked: checkList.length === systemElementCount,
            }
        });
    }
    //系統設置全選控制
    const systemAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setSystem", payload: {
                checkList: e.target.checked ? systemElements : [],
                indeterminate: false,
                checked: e.target.checked,
            }
        });
    }

    const submit = () => {
        let tempArray = ["1"];//首頁權限
        let values = getFieldsValue();
        if (!!!values.userNickName || values.userNickName == "") {
            dispatch({
                type: "roleAdd/showErrorMessage",
                payload: {
                    text: "角色名称不能为空"
                }
            });
            return;
        }
        if (valueOperation.length > 0) {
            tempArray = tempArray.concat(checkedOperationElements, valueOperation);
        }
        if (valueData.length > 0) {
            tempArray = tempArray.concat(checkedDataElements, valueData);
        }
        if (valuePermissions.length > 0) {
            tempArray = tempArray.concat(checkedPermissionsElements, valuePermissions);
        }
        if (valueSystem.length > 0) {
            tempArray = tempArray.concat(checkedSystemElements, valueSystem);
        }
        tempArray.sort((a, b) => { return a - b; });
        dispatch({
            type: "roleAdd/add",
            payload: {
                description: values.userNickName,
                name: values.userNickName,
                pageIds: tempArray.toString(),
                status: values.status,
                userToken: config.userToken
            }
        });
    }

    const cancel = () => {
        dispatch({ type: "roleAdd/cancel" });
    }

    return (
        <div>
            <Card title="角色信息">
                <div className={styles.tableForm}>
                    <Form>
                        <Form.Item label="角色名称" extra='不超过16个字'>
                            {getFieldDecorator('userNickName', {
                                rules: [{
                                    required: true,
                                    message: '请输入角色名称',
                                }],
                            })(
                                <Input placeholder="请输入" maxLength={16} />
                            )}
                        </Form.Item>
                        <Form.Item label="启用状态" style={{ marginLeft: 13 }}>
                            {getFieldDecorator("status", {
                                valuePropName: "checked",
                                initialValue: true
                            })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
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
                            <Col span={8}>
                                <Checkbox
                                    value="6"
                                    onChange={deviceManageChk}
                                    checked={deviceCheck}
                                    disabled={checkAll}
                                    indeterminate={indeterminateDevice}
                                    style={{ fontSize: 16, fontStyle: Blob }}>设备管理</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={deviceOnChange} value={valueDevice} disabled={checkAll}>
                                    <Col span={8}><Checkbox value="14">查看</Checkbox></Col>
                                </Checkbox.Group>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="7"
                                    onChange={feedbackChk}
                                    checked={feedbackCheck}
                                    disabled={checkAll}
                                    indeterminate={indeterminateFeedback}
                                    style={{ fontSize: 16, fontStyle: Blob }}>用户反馈</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={feedbackOnChange} value={valueFeedback} disabled={checkAll}>
                                    <Col span={8}> <Checkbox value="17">查看</Checkbox></Col>
                                    <Col span={8}><Checkbox value="18">标记</Checkbox></Col>
                                </Checkbox.Group>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="8"
                                    onChange={userManageChk}
                                    checked={userManageCheck}
                                    disabled={checkAll}
                                    indeterminate={indeterminateUserManage}
                                    style={{ fontSize: 16, fontStyle: Blob }}>用户管理</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={userManageOnChange} value={valueUserManage} disabled={checkAll}>
                                    <Col span={8}><Checkbox value="19">查询</Checkbox></Col>
                                    <Col span={8}><Checkbox value="20">查看详情</Checkbox></Col>
                                </Checkbox.Group>
                            </Col>
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
                            <Col span={8}><Checkbox value="9" style={{ fontSize: 16, fontStyle: Blob }}>激活数据</Checkbox></Col>
                            <Col span={8}><Checkbox value="21">查看</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="10" style={{ fontSize: 16, fontStyle: Blob }}>活跃数据</Checkbox></Col>
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
                            <Col span={8}><Checkbox value="11" style={{ fontSize: 16, fontStyle: Blob }}>人员管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="23">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="24">管理</Checkbox></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}><Checkbox value="12" style={{ fontSize: 16, fontStyle: Blob }}>角色管理</Checkbox></Col>
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
                            <Col span={8}><Checkbox value="13" style={{ fontSize: 16, fontStyle: Blob }}>账号管理</Checkbox></Col>
                            <Col span={8}><Checkbox value="27">查看</Checkbox></Col>
                            <Col span={8}><Checkbox value="28">管理</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                    <div style={{}}>
                        <span style={{ float: "right" }}>
                            <Button style={{ marginRight: 16 }} onClick={cancel}>取消</Button>
                            <Button type="primary" onClick={submit}>保存</Button>
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

export default connect(({ roleAdd, loading }) => ({
    roleAdd,
    loading: loading.models.roleAdd
}))(Form.create()(RoleAdd));
