import { routerRedux } from "dva/router";
import { backUserLoginApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: "login",

  state: {
    codes: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/login") {
        }
      });
    }
  },

  effects: {
    *login({ payload }, { put, call }) {
      const data = yield call(backUserLoginApi, payload);
      if (data.code == 0) {
        message.success("登录成功!");
        //本地缓存
        localStorage.setItem("userToken", data.data.userToken);
        //跳转到首页
        yield put(
          routerRedux.push({
            pathname: "/dashboard"
          })
        );
        location.reload();
      } else {
        message.error("登录失败，" + data.msg);
      }
    }
  },

  reducers: {
    //返回数据列表
    querySuccess(state, action) {
      return {
        ...state,
        codes: action.payload
      };
    }
  }
};
