import React from "react";
import { connect } from "dva";
import { Form, Input, Affix, Row, Col, Checkbox, Button, Card, Switch, message } from 'antd';
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
    let {
        valueOperation, valueData, valuePermissions, valueSystem,
        checkAll, submitDisabled,
        deviceCheck, indeterminateDevice, valueDevice,
        feedbackCheck, indeterminateFeedback, valueFeedback,
        userManageCheck, indeterminateUserManage, valueUserManage,
        activateDataCheck, indeterminateActivateData, valueActivateData,
        activeDataCheck, indeterminateActiveData, valueActiveData,
        personManageCheck, indeterminatePersonManage, valuePersonManage,
        roleManageCheck, indeterminateRoleManage, valueRoleManage,
        accountManagementCheck, indeterminateAccountManagement, valueAccountManagement
    } = roleAdd;

    const operationElements = ["6", "7", "8",];//運營中心權限ID
    const deviceElements = ["14"];//設備管理權限ID
    const feedbackElements = ["17", "18"];//用戶反饋權限ID
    const userElements = ["19", "20"];//用戶管理權限ID

    const dataElements = ["9", "10"];//數據中心權限ID
    const activateElements = ["21"];//激活數據權限ID
    const activeElements = ["22"];//活躍數據權限ID

    const permissionsElement = ["11", "12"];//權限控制權限ID
    const personElements = ["23", "24"];//人員管理權限ID
    const roleElements = ["25", "26"];//角色管理權限ID

    const systemElements = ["13"];//系統設置權限ID
    const accountElements = ["27", "28"];//測試莊戶管理權限ID

    const checkedOperationElements = ["2"];
    const checkedDataElements = ["3"];
    const checkedPermissionsElements = ["4"];
    const checkedSystemElements = ["5"];

    const checkAllOnChange = (e) => {
        dispatch({
            type: "roleAdd/setAll", payload: {
                indeterminate: false,
                checked: e.target.checked,
            }
        });
        operationAllOnChange(e);
        dataAllOnChange(e);
        permissionsAllOnChange(e);
        systemAllOnChange(e);
    }
    //运营中心全选控制
    const operationAllOnChange = (e) => {
        deviceManageChk(e);
        feedbackChk(e);
        userManageChk(e);
        e.target.checked ? operationOnChange(operationElements) : operationOnChange([]);
    }
    //运营中心多选框中的元素被点击
    const operationOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setOperation", payload: {
                checkList: checkList,
            }
        });
    }
    //設備管理選項被點擊
    const deviceManageChk = (e) => {
        e.target.checked ? deviceOnChange(deviceElements) : deviceOnChange([]);
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
        if (!!!checkList.length || checkList.length === 0)
            operationOnChange(Array.from(new Set(valueOperation.filter(function (elem) {
                return (elem != operationElements[0]);
            }))));
        if (!!checkList.length && checkList.length <= deviceElements.length) {
            operationOnChange(Array.from(new Set(valueOperation.concat(operationElements[0]))));
        }
    }
    //用戶反饋選項被點擊
    const feedbackChk = (e) => {
        e.target.checked ? feedbackOnChange(feedbackElements) : feedbackOnChange([]);
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
        if (!!!checkList.length || checkList.length === 0)
            operationOnChange(Array.from(new Set(valueOperation.filter(function (elem) {
                return (elem != operationElements[1]);
            }))));
        if (!!checkList.length && checkList.length <= feedbackElements.length) {
            operationOnChange(Array.from(new Set(valueOperation.concat(operationElements[1]))));
        }
    }
    //用戶反饋選項被點擊
    const userManageChk = (e) => {
        e.target.checked ? userManageOnChange(userElements) : userManageOnChange([]);
    }
    //用戶反饋多选框中的元素被点击
    const userManageOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setUserManager",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < userElements.length,
                checked: checkList.length === userElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            operationOnChange(Array.from(new Set(valueOperation.filter(function (elem) {
                return (elem != operationElements[2]);
            }))));
        if (!!checkList.length && checkList.length <= userElements.length) {
            operationOnChange(Array.from(new Set(valueOperation.concat(operationElements[2]))));
        }
    }

    //數據中心全選控制
    const dataAllOnChange = (e) => {
        activateDataChk(e);
        activeDataChk(e);
        e.target.checked ? dataOnChange(dataElements) : dataOnChange([]);
    }
    //数据中心多选框中的元素被点击
    const dataOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setData", payload: {
                checkList: checkList,
            }
        });
    }
    //激活數據全選控制
    const activateDataChk = (e) => {
        e.target.checked ? activateDataOnChange(activateElements) : activateDataOnChange([]);
    }
    //激活數據多选框中的元素被点击
    const activateDataOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setActivate",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < activateElements.length,
                checked: checkList.length === activateElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            dataOnChange(Array.from(new Set(valueData.filter(function (elem) {
                return (elem != dataElements[0]);
            }))));
        if (!!checkList.length && checkList.length <= activateElements.length) {
            dataOnChange(Array.from(new Set(valueData.concat(dataElements[0]))));
        }
    }
    //活躍數據選項被點擊
    const activeDataChk = (e) => {
        e.target.checked ? activeDataOnChange(activeElements) : activeDataOnChange([]);
    }
    //活躍數據多选框中的元素被点击
    const activeDataOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setActive",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < activeElements.length,
                checked: checkList.length === activeElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            dataOnChange(Array.from(new Set(valueData.filter(function (elem) {
                return (elem != dataElements[1]);
            }))));
        if (!!checkList.length && checkList.length <= activeElements.length) {
            dataOnChange(Array.from(new Set(valueData.concat(dataElements[1]))));
        }
    }

    //權限控制全選控制
    const permissionsAllOnChange = (e) => {
        personManageChk(e);
        roleManageChk(e);
        e.target.checked ? permissionsOnChange(permissionsElement) : permissionsOnChange([]);
    }
    //權限控制多选框中的元素被点击
    const permissionsOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setPermission", payload: {
                checkList: checkList,
            }
        });
    }
    //人員管理選項被點擊
    const personManageChk = (e) => {
        e.target.checked ? personManageOnChange(personElements) : personManageOnChange([]);
    }
    //人員管理多选框中的元素被点击
    const personManageOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setPerson",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < personElements.length,
                checked: checkList.length === personElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            permissionsOnChange(Array.from(new Set(valuePermissions.filter(function (elem) {
                return (elem != permissionsElement[0]);
            }))));
        if (!!checkList.length && checkList.length <= personElements.length) {
            permissionsOnChange(Array.from(new Set(valuePermissions.concat(permissionsElement[0]))));
        }
    }
    //角色管理選項被點擊
    const roleManageChk = (e) => {
        e.target.checked ? roleManageOnChange(roleElements) : roleManageOnChange([]);
    }
    //角色管理多选框中的元素被点击
    const roleManageOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setRole",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < roleElements.length,
                checked: checkList.length === roleElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            permissionsOnChange(Array.from(new Set(valuePermissions.filter(function (elem) {
                return (elem != permissionsElement[1]);
            }))));
        if (!!checkList.length && checkList.length <= roleElements.length) {
            permissionsOnChange(Array.from(new Set(valuePermissions.concat(permissionsElement[1]))));
        }
    }
    //系統設置全選控制
    const systemAllOnChange = (e) => {
        accountManagementChk(e);
        e.target.checked ? systemOnChange(systemElements) : systemOnChange([]);
    }
    //系統設置多选框中的元素被点击
    const systemOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setSystem", payload: {
                checkList: checkList,
            }
        });
    }
    //賬戶管理選項被點擊
    const accountManagementChk = (e) => {
        e.target.checked ? accountManagementOnChange(accountElements) : accountManagementOnChange([]);
    }
    //賬戶管理多选框中的元素被点击
    const accountManagementOnChange = (checkList) => {
        dispatch({
            type: "roleAdd/setAccount",
            payload: {
                checkList: checkList,
                indeterminate: !!checkList.length && checkList.length < accountElements.length,
                checked: checkList.length === accountElements.length,
            }
        });
        if (!!!checkList.length || checkList.length === 0)
            systemOnChange(Array.from(new Set(valueSystem.filter(function (elem) {
                return (elem != systemElements[0]);
            }))));
        if (!!checkList.length && checkList.length <= accountElements.length) {
            systemOnChange(Array.from(new Set(valueSystem.concat(systemElements[0]))));
        }
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
        dispatch({
            type: "roleAdd/setSubmitDisabled",
            payload: {
                disabled: true
            }
        });
        message.loading("新增角色数据,请稍后!!").then(() => {
            if (valueOperation.length > 0) {
                tempArray = tempArray.concat(checkedOperationElements, valueOperation, valueDevice, valueFeedback, valueUserManage);
            }
            if (valueData.length > 0) {
                tempArray = tempArray.concat(checkedDataElements, valueData, valueActivateData, valueActiveData);
            }
            if (valuePermissions.length > 0) {
                tempArray = tempArray.concat(checkedPermissionsElements, valuePermissions, valuePersonManage, valueRoleManage);
            }
            if (valueSystem.length > 0) {
                tempArray = tempArray.concat(checkedSystemElements, valueSystem, valueAccountManagement);
            }
            tempArray.sort((a, b) => { return a - b; });
            let ary = Array.from(new Set(tempArray));
            dispatch({
                type: "roleAdd/add",
                payload: {
                    description: values.userNickName,
                    name: values.userNickName,
                    pageIds: ary.toString(),
                    status: values.status,
                    userToken: config.userToken
                }
            });
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
                            <Checkbox onChange={checkAllOnChange} indeterminate={false} checked={checkAll}>全选</Checkbox>
                        </Form.Item>
                    </Form>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="2"
                        onChange={operationAllOnChange}
                        indeterminate={indeterminateDevice || indeterminateFeedback || indeterminateUserManage}
                        checked={deviceCheck && feedbackCheck && userManageCheck}
                    >运营中心</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={operationOnChange} value={valueOperation}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="6"
                                    onChange={deviceManageChk}
                                    checked={deviceCheck}
                                    indeterminate={indeterminateDevice}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >设备管理</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={deviceOnChange} value={valueDevice}>
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
                                    indeterminate={indeterminateFeedback}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >用户反馈</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={feedbackOnChange} value={valueFeedback}>
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
                                    indeterminate={indeterminateUserManage}
                                    checked={userManageCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >用户管理</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox.Group onChange={userManageOnChange} value={valueUserManage}>
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
                        indeterminate={indeterminateActivateData || indeterminateActiveData}
                        checked={activateDataCheck && activeDataCheck}
                    >数据中心</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={dataOnChange} value={valueData}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="9"
                                    onChange={activateDataChk}
                                    indeterminate={indeterminateActivateData}
                                    checked={activateDataCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >激活数据</Checkbox>
                            </Col>
                            <Checkbox.Group onChange={activateDataOnChange} value={valueActivateData}>
                                <Col span={8}><Checkbox value="21">查看</Checkbox></Col>
                            </Checkbox.Group>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="10"
                                    onChange={activeDataChk}
                                    indeterminate={indeterminateActiveData}
                                    checked={activeDataCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >活跃数据</Checkbox>
                            </Col>
                            <Checkbox.Group onChange={activeDataOnChange} value={valueActiveData}>
                                <Col span={8}><Checkbox value="22">查看</Checkbox></Col>
                            </Checkbox.Group>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="4"
                        onChange={permissionsAllOnChange}
                        indeterminate={indeterminatePersonManage || indeterminateRoleManage}
                        checked={personManageCheck && roleManageCheck}
                    >权限管理</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={permissionsOnChange} value={valuePermissions}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="11"
                                    onChange={personManageChk}
                                    indeterminate={indeterminatePersonManage}
                                    checked={personManageCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >人员管理</Checkbox>
                            </Col>
                            <Checkbox.Group onChange={personManageOnChange} value={valuePersonManage}>
                                <Col span={8}><Checkbox value="23">查看</Checkbox></Col>
                                <Col span={8}><Checkbox value="24">管理</Checkbox></Col>
                            </Checkbox.Group>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="12"
                                    onChange={roleManageChk}
                                    indeterminate={indeterminateRoleManage}
                                    checked={roleManageCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >角色管理</Checkbox>
                            </Col>
                            <Checkbox.Group onChange={roleManageOnChange} value={valueRoleManage}>
                                <Col span={8}><Checkbox value="25">查看</Checkbox></Col>
                                <Col span={8}><Checkbox value="26">管理</Checkbox></Col>
                            </Checkbox.Group>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card title={
                <div>
                    <Checkbox style={{ fontSize: 16 }}
                        value="5"
                        onChange={systemAllOnChange}
                        indeterminate={indeterminateAccountManagement}
                        checked={accountManagementCheck}
                    >系统设置</Checkbox>
                    <span style={{ marginLeft: 16, color: '#B4B4B4' }}>模块的所有功能未开启时，角色操作界面中不显示此模块</span>
                </div>
            } style={{ marginTop: 20 }}>
                <div className={styles.tableCheckGroup}>
                    <Checkbox.Group onChange={systemOnChange} value={valueSystem}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Checkbox
                                    value="13"
                                    onChange={accountManagementChk}
                                    indeterminate={indeterminateAccountManagement}
                                    checked={accountManagementCheck}
                                    style={{ fontSize: 15, fontStyle: Blob }}
                                >账号管理</Checkbox>
                            </Col>
                            <Checkbox.Group onChange={accountManagementOnChange} value={valueAccountManagement}>
                                <Col span={8}><Checkbox value="27">查看</Checkbox></Col>
                                <Col span={8}><Checkbox value="28">管理</Checkbox></Col>
                            </Checkbox.Group>
                        </Row>
                    </Checkbox.Group>
                    <div style={{}}>
                        <span style={{ float: "right" }}>
                            <Button style={{ marginRight: 16 }} onClick={cancel}>取消</Button>
                            <Button type="primary" disabled={submitDisabled} onClick={submit}>保存</Button>
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
