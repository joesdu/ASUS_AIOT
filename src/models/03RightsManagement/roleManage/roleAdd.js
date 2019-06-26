import { authorityAddApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
    namespace: "roleAdd",
    state: {
        operationCheckAll: false, indeterminateOperation: false, valueOperation: [],
        dataCheckAll: false, indeterminateData: false, valueData: [],
        permissionsCheckAll: false, indeterminatePermissions: false, valuePermissions: [],
        systemCheckAll: false, indeterminateSystem: false, valueSystem: [],
        checkAll: false,
        deviceCheck: false, indeterminateDevice: false, valueDevice: [],
        feedbackCheck: false, indeterminateFeedback: false, valueFeedback: [],
        userManageCheck: false, indeterminateUserManage: false, valueUserManage: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleAdd") {
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
    }
};
