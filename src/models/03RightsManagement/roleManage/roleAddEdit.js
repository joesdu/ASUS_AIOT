import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../../../services/api";
import { message } from "antd";

export default {
    namespace: "roleAddEdit",
    state: {
        defaultCheckData: [],
        checkAll: false,
        indeterminateCheckAll: false,
        operationCheckAll: false,
        indeterminateOperation: false,
        valueOperation: [],
        dataCheckAll: false,
        indeterminateData: false,
        valueData: [],
        permissionsCheckAll: false,
        indeterminatePermissions: false,
        valuePermissions: [],
        systemCheckAll: false,
        indeterminateSystem: false,
        valueSystem: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/roleAddEdit") {
                    //dispatch({ type: "getRoleList", payload: "1" });
                }
            });
        }
    },

    effects: {
        *getRoleList({ payload }, { call, put }) {
            //const data = yield call(feedbackListApi, payload);

            if (data == null || data.length == 0 || data == {} || data.code != 0) {
                message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "getRoleListSuccess", payload: null });
            } else {
                if (data.data == null || data.data == {} || data.data == undefined) {
                    message.info("无数据");
                    yield put({ type: "getRoleListSuccess", payload: null });
                }
                else {
                    yield put({ type: "getRoleListSuccess", payload: data.data.roleList });
                }
            }
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
                indeterminateCheckAll: action.payload.indeterminate,
                checkAll: action.payload.checked,
                operationCheckAll: action.payload.checked,
                dataCheckAll: action.payload.checked,
                permissionsCheckAll: action.payload.checked,
                systemCheckAll: action.payload.checked
            }
        },
        setOperation(state, action) {
            return {
                ...state,
                valueOperation: action.payload.checkList,
                indeterminateOperation: action.payload.indeterminate,
                operationCheckAll: action.payload.checked
            }
        },
        setData(state, action) {
            return {
                ...state,
                valueData: action.payload.checkList,
                indeterminateData: action.payload.indeterminate,
                dataCheckAll: action.payload.checked
            }
        },
        setPermission(state, action) {
            return {
                ...state,
                valuePermissions: action.payload.checkList,
                indeterminatePermissions: action.payload.indeterminate,
                permissionsCheckAll: action.payload.checked
            }
        },
        setSystem(state, action) {
            return {
                ...state,
                valueSystem: action.payload.checkList,
                indeterminateSystem: action.payload.indeterminate,
                systemCheckAll: action.payload.checked
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
