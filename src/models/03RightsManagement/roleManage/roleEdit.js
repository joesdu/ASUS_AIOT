import { authorityEditApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
    namespace: "roleEdit",
    state: {
        authorityId: '', name: '', status: false,
        valueOperation: [], valueData: [], valuePermissions: [], valueSystem: [],
        checkAll: false,
        deviceCheck: false, indeterminateDevice: false, valueDevice: [],
        feedbackCheck: false, indeterminateFeedback: false, valueFeedback: [],
        userManageCheck: false, indeterminateUserManage: false, valueUserManage: [],
        activateDataCheck: false, indeterminateActivateData: false, valueActivateData: [],
        activeDataCheck: false, indeterminateActiveData: false, valueActiveData: [],
        personManageCheck: false, indeterminatePersonManage: false, valuePersonManage: [],
        roleManageCheck: false, indeterminateRoleManage: false, valueRoleManage: [],
        accountManagementCheck: false, indeterminateAccountManagement: false, valueAccountManagement: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleEdit") {
                    let _ars = location.state.record;
                    dispatch({
                        type: "setDefault",
                        payload: {
                            authorityId: _ars.authorityId,
                            name: _ars.name,
                            status: _ars.status
                        }
                    });
                    let operationElements = ["6", "7", "8",];//運營中心權限ID
                    let deviceElements = ["14"];//設備管理權限ID
                    let feedbackElements = ["17", "18"];//用戶反饋權限ID
                    let userElements = ["19", "20"];//用戶管理權限ID

                    let dataElements = ["9", "10"];//數據中心權限ID
                    let activateElements = ["21"];//激活數據權限ID
                    let activeElements = ["22"];//活躍數據權限ID

                    let permissionsElement = ["11", "12"];//權限控制權限ID
                    let personElements = ["23", "24"];//人員管理權限ID
                    let roleElements = ["25", "26"];//角色管理權限ID

                    let systemElements = ["13"];//系統設置權限ID
                    let accountElements = ["27", "28"];//測試莊戶管理權限ID

                    let checkedOperationElements = ["2"];
                    let checkedDataElements = ["3"];
                    let checkedPermissionsElements = ["4"];
                    let checkedSystemElements = ["5"];

                    let pagesIds = _ars.pageIds.split(',');
                    if (pagesIds.indexOf(checkedOperationElements[0]) >= 0) {
                        dispatch({
                            type: "intersection",
                            payload: {
                                setA: pagesIds,
                                setB: operationElements,
                                type: "setOperation"
                            }
                        });
                        if (pagesIds.indexOf(operationElements[0]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: deviceElements,
                                    type: "setDevice"
                                }
                            });
                        }
                        if (pagesIds.indexOf(operationElements[1]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: feedbackElements,
                                    type: "setFeedback"
                                }
                            });
                        }
                        if (pagesIds.indexOf(operationElements[2]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: userElements,
                                    type: "setUserManager"
                                }
                            });
                        }
                    }
                    if (pagesIds.indexOf(checkedDataElements[0]) >= 0) {
                        dispatch({
                            type: "intersection",
                            payload: {
                                setA: pagesIds,
                                setB: dataElements,
                                type: "setData"
                            }
                        });
                        if (pagesIds.indexOf(dataElements[0]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: activateElements,
                                    type: "setActivate"
                                }
                            });
                        }
                        if (pagesIds.indexOf(dataElements[1]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: activeElements,
                                    type: "setActive"
                                }
                            });
                        }
                    }
                    if (pagesIds.indexOf(checkedPermissionsElements[0]) >= 0) {
                        dispatch({
                            type: "intersection",
                            payload: {
                                setA: pagesIds,
                                setB: permissionsElement,
                                type: "setPermission"
                            }
                        });
                        if (pagesIds.indexOf(permissionsElement[0]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: personElements,
                                    type: "setPerson"
                                }
                            });
                        }
                        if (pagesIds.indexOf(permissionsElement[1]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: roleElements,
                                    type: "setRole"
                                }
                            });
                        }
                    }
                    if (pagesIds.indexOf(checkedSystemElements[0]) >= 0) {
                        dispatch({
                            type: "intersection",
                            payload: {
                                setA: pagesIds,
                                setB: systemElements,
                                type: "setSystem"
                            }
                        });
                        if (pagesIds.indexOf(systemElements[0]) >= 0) {
                            dispatch({
                                type: "intersection",
                                payload: {
                                    setA: pagesIds,
                                    setB: accountElements,
                                    type: "setAccount"
                                }
                            });
                        }
                    }
                }
            });
        }
    },
    effects: {
        *edit({ payload }, { call, put }) {
            const data = yield call(authorityEditApi, payload);
            if (!!data && data.code === 0) {
                message.info("修改成功!");
                yield put(routerRedux.push({ pathname: "/roleManagement" }));
            } else {
                message.error(!!data ? "修改失败,错误信息:" + data.msg : "修改失败");
            }
        },
        *intersection({ payload }, { call, put }) {
            let _intersection = new Set();
            let setA = new Set(payload.setA);
            let setB = new Set(payload.setB);
            for (let elem of setB) {
                if (setA.has(elem)) {
                    _intersection.add(elem);
                }
            }
            let tempArray = [..._intersection];
            yield put({
                type: payload.type, payload: {
                    checkList: tempArray,
                    indeterminate: tempArray.length < payload.setB.length,
                    checked: tempArray.length === payload.setB.length
                }
            });
        },
        *cancel({ payload }, { call, put }) {
            yield put(routerRedux.push({ pathname: "/roleManagement" }));
        },
        *showErrorMessage({ payload }, { call, put }) {
            message.error(payload.text);
        },
    },
    reducers: {
        clean(state) {
            return {
                ...state,
                valueOperation: [], valueData: [], valuePermissions: [], valueSystem: [],
                checkAll: false,
                deviceCheck: false, indeterminateDevice: false, valueDevice: [],
                feedbackCheck: false, indeterminateFeedback: false, valueFeedback: [],
                userManageCheck: false, indeterminateUserManage: false, valueUserManage: [],
                activateDataCheck: false, indeterminateActivateData: false, valueActivateData: [],
                activeDataCheck: false, indeterminateActiveData: false, valueActiveData: [],
                personManageCheck: false, indeterminatePersonManage: false, valuePersonManage: [],
                roleManageCheck: false, indeterminateRoleManage: false, valueRoleManage: [],
                accountManagementCheck: false, indeterminateAccountManagement: false, valueAccountManagement: []
            }
        },
        setDefault(state, action) {
            return {
                ...state,
                authorityId: action.payload.authorityId,
                name: action.payload.name,
                status: action.payload.status
            }
        },
        setAll(state, action) {
            return {
                ...state,
                checkAll: action.payload.checked
            }
        },
        setOperation(state, action) {
            return {
                ...state,
                valueOperation: action.payload.checkList,
            }
        },
        setData(state, action) {
            return {
                ...state,
                valueData: action.payload.checkList,
            }
        },
        setPermission(state, action) {
            return {
                ...state,
                valuePermissions: action.payload.checkList,
            }
        },
        setSystem(state, action) {
            return {
                ...state,
                valueSystem: action.payload.checkList,
            }
        },
        setDevice(state, action) {
            return {
                ...state,
                valueDevice: action.payload.checkList,
                indeterminateDevice: action.payload.indeterminate,
                deviceCheck: action.payload.checked,
            }
        },
        setFeedback(state, action) {
            return {
                ...state,
                valueFeedback: action.payload.checkList,
                indeterminateFeedback: action.payload.indeterminate,
                feedbackCheck: action.payload.checked,
            }
        },
        setUserManager(state, action) {
            return {
                ...state,
                valueUserManage: action.payload.checkList,
                indeterminateUserManage: action.payload.indeterminate,
                userManageCheck: action.payload.checked,
            }
        },
        setActivate(state, action) {
            return {
                ...state,
                valueActivateData: action.payload.checkList,
                indeterminateActivateData: action.payload.indeterminate,
                activateDataCheck: action.payload.checked,
            }
        },
        setActive(state, action) {
            return {
                ...state,
                valueActiveData: action.payload.checkList,
                indeterminateActiveData: action.payload.indeterminate,
                activeDataCheck: action.payload.checked,
            }
        },
        setPerson(state, action) {
            return {
                ...state,
                valuePersonManage: action.payload.checkList,
                indeterminatePersonManage: action.payload.indeterminate,
                personManageCheck: action.payload.checked,
            }
        },
        setRole(state, action) {
            return {
                ...state,
                valueRoleManage: action.payload.checkList,
                indeterminateRoleManage: action.payload.indeterminate,
                roleManageCheck: action.payload.checked,
            }
        },
        setAccount(state, action) {
            return {
                ...state,
                valueAccountManagement: action.payload.checkList,
                indeterminateAccountManagement: action.payload.indeterminate,
                accountManagementCheck: action.payload.checked,
            }
        },
    }
};
