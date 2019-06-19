import { userDetailApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
    namespace: "userDetail",
    state: {
        data: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/appUsersDetail") {
                    let _ars = {
                        userId: location.state.userId,
                        userToken: config.userToken
                    };
                    dispatch({ type: "queryRule", payload: _ars });
                }
            });
        }
    },

    effects: {
        *queryRule({ payload }, { call, put }) {
            const data = yield call(userDetailApi, payload);
            if (!!data && data.code === 0) {
                yield put({ type: "querySuccess", payload: data.data });
            } else {
                message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
                yield put({ type: "queryFault" });
            }
        }
    },
    reducers: {
        //返回数据列表
        querySuccess(state, action) {
            return { ...state, data: action.payload };
        },
        queryFault(state) {
            return { ...state, data: {} };
        }
    }
};
