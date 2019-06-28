import { authorityAddApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
    namespace: "roleAdd",
    state: {
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
                if (location.pathname === "/roleAdd") {
                    dispatch({
                        type: "roleAdd/clean"
                    });
                }
            });
        }
    },
    effects: {
        *add({ payload }, { call, put }) {
            const data = yield call(authorityAddApi, payload);
            if (!!data && data.code === 0) {
                message.info("新增成功!");
                yield put(routerRedux.push({ pathname: "/roleManagement" }));
            } else {
                message.error(!!data ? "新增失败,错误信息:" + data.msg : "新增失败");
            }
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
