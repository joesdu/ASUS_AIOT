import { authorityAddApi } from "../../../services/api";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
    namespace: "roleAdd",
    state: {
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
