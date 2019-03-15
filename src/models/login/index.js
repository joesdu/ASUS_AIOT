import { routerRedux } from "dva/router";
import { backUserLoginApi } from "../../services/api";
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
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "登录失败,错误信息:" + data.msg : "登录失败");
      } else {
        message.success("登录成功!");
        //本地缓存
        localStorage.setItem("userToken", data.data.userToken);
        localStorage.setItem("userName", payload.userName);
        //跳转到首页
        yield put(routerRedux.push({ pathname: "/dashboard" }));
        location.reload();
      }
    }
  },

  reducers: {

  }
};
