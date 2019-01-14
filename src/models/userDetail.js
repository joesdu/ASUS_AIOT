import { userDetailApi } from "../services/api";
import { message } from "antd";

export default {
    namespace: "userDetail",
    state: {
        data: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                //页面初始化执行
                if (location.pathname === "/userDetail") {
                    let _ars = {
                        userId: 0,
                        userToken: localStorage.getItem("userToken")
                    };
                    dispatch({
                        type: "queryRule",
                        payload: _ars
                    });
                }
            });
        }
    },

    effects: {
        *queryRule({ payload }, { call, put }) {
            const data = yield call(userDetailApi, payload);
            if (data.code == 0) {
                yield put({ type: "querySuccess", payload: data.data });
            } else {
                message.error("获取数据失败,错误信息:" + data.msg);
            }
        }
    },
    reducers: {
        //返回数据列表
        querySuccess(state, action) {
            return {
                ...state,
                data: action.payload
            };
        }
    }
};
