import { authorityAllPagesApi, authorityAddApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
    namespace: "roleAdd",
    state: {
        allPageData: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleAdd") {
                    dispatch({ type: "getPageIDs" });
                }
            });
        }
    },

    effects: {
        *getPageIDs({ payload }, { call, put }) {
            const data = yield call(authorityAllPagesApi, { userToken: config.userToken });
            if (!!data && data.code === 0) {
                yield put({ type: "getPageIDsSuccess", payload: data.data });
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getPageIDsSuccess", payload: null });
            }
        },
    },
    reducers: {
        getPageIDsSuccess(state, action) {
            return {
                ...state,
                allPageData: action.payload,
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
        },
        getRoleListSuccess(state, action) {
            return { ...state, roleListData: action.payload };
        },
        productListSuccess(state, action) {
            return { ...state, deviceProductListData: action.payload };
        }
    }
};
