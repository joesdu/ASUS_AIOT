import { routerRedux } from "dva/router";
import { backUserLoginApi } from "../../../services/api";
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
      if (!!data && data.code === 0) {
        message.success("登录成功!");       
        //本地缓存
        localStorage.setItem("userToken", data.data.userToken);
        localStorage.setItem("userName", data.data.userName);
        localStorage.setItem("nickName", data.data.nickname);
        localStorage.setItem("headImg", data.data.headImg);
        localStorage.setItem("pages", data.data.pages.map(item => {
          return item.pageId;
        }));
        //跳转到首页
        yield put(routerRedux.push({ pathname: "/home" }));
        location.reload();
      } else {
        message.error(!!data ? "登录失败,错误信息:" + data.msg : "登录失败");
      }
    }
  },
  reducers: {}
};
