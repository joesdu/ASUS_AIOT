import { authorityEditApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
    namespace: "roleEdit",
    state: {
        authorityId: '',
        name: '',
        status: false,
        allPageData: [],
        valueData: [],
        valuePermissions: [],
        valueSystem: [],
        valueOperation: [],
        indeterminateOperation: false,
        indeterminateData: false,
        indeterminatePermissions: false,
        indeterminateSystem: false,
        checkAll: false,
        operationCheckAll: false,
        dataCheckAll: false,
        permissionsCheckAll: false,
        systemCheckAll: false,
        checkAll: false
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleEdit") {
                    let operationElements = ["6", "14", "7", "17", "18", "8", "19", "20"];//運營中心權限ID
                    let dataElements = ["9", "21", "10", "22"];//數據中心權限ID
                    let permissionsElements = ["11", "23", "24", "12", "25", "26"];//權限控制權限ID
                    let systemElements = ["13", "27", "28"];//系統設置權限ID

                    let checkedOperationElements = ["2"];
                    let checkedDataElements = ["3"];
                    let checkedPermissionsElements = ["4"];
                    let checkedSystemElements = ["5"];

                    let _ars = location.state.record;
                    dispatch({
                        type: "setDefault", payload: {
                            authorityId: _ars.authorityId,
                            name: _ars.name,
                            status: _ars.status
                        }
                    });
                    let pagesIds = _ars.pageIds.split(',');
                    if (pagesIds.indexOf(checkedOperationElements[0]) >= 0) {
                        dispatch({
                            type: "intersection", payload: {
                                setA: pagesIds,
                                setB: operationElements,
                                type: "setOperation"
                            }
                        });
                    }
                    if (pagesIds.indexOf(checkedDataElements[0]) >= 0) {
                        dispatch({
                            type: "intersection", payload: {
                                setA: pagesIds,
                                setB: dataElements,
                                type: "setData"
                            }
                        });
                    }
                    if (pagesIds.indexOf(checkedPermissionsElements[0]) >= 0) {
                        dispatch({
                            type: "intersection", payload: {
                                setA: pagesIds,
                                setB: permissionsElements,
                                type: "setPermission"
                            }
                        });
                    }
                    if (pagesIds.indexOf(checkedSystemElements[0]) >= 0) {
                        dispatch({
                            type: "intersection", payload: {
                                setA: pagesIds,
                                setB: systemElements,
                                type: "setSystem"
                            }
                        });
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
                valueOperation: action.payload.operation,
                valueData: action.payload.data,
                valuePermissions: action.payload.permissions,
                valueSystem: action.payload.system,
                indeterminateOperation: action.payload.indeterminate,
                indeterminateData: action.payload.indeterminate,
                indeterminatePermissions: action.payload.indeterminate,
                indeterminateSystem: action.payload.indeterminate,
                checkAll: action.payload.checked,
                operationCheckAll: action.payload.checked,
                dataCheckAll: action.payload.checked,
                permissionsCheckAll: action.payload.checked,
                systemCheckAll: action.payload.checked,
                checkAll: action.payload.checked
            }
        },
        setOperation(state, action) {
            return {
                ...state,
                valueOperation: action.payload.checkList,
                indeterminateOperation: action.payload.indeterminate,
                operationCheckAll: action.payload.checked,
            }
        },
        setData(state, action) {
            return {
                ...state,
                valueData: action.payload.checkList,
                indeterminateData: action.payload.indeterminate,
                dataCheckAll: action.payload.checked,
            }
        },
        setPermission(state, action) {
            return {
                ...state,
                valuePermissions: action.payload.checkList,
                indeterminatePermissions: action.payload.indeterminate,
                permissionsCheckAll: action.payload.checked,
            }
        },
        setSystem(state, action) {
            return {
                ...state,
                valueSystem: action.payload.checkList,
                indeterminateSystem: action.payload.indeterminate,
                systemCheckAll: action.payload.checked,
            }
        }
    }
};
