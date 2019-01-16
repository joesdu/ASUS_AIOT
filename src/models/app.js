import { routerRedux } from "dva/router";
import config from "config";
import * as menusService from "services/menus";
import queryString from "query-string";
import { message } from "antd";
import { backUserLogoutApi } from "../services/api"

const { prefix } = config;

export default {
  namespace: "app",
  state: {
    userToken: {},
    userName: '',
    permissions: {
      visit: []
    },
    menu: [
      {
        id: 1,
        icon: "laptop",
        name: "Dashboard",
        router: "/dashboard"
      }
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === "true",
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === "true",
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: "",
    locationQuery: {}
  },
  //状态
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: "updateState",
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search)
          }
        });
      });
    },

    setup({ dispatch }) {
      dispatch({ type: "query" });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: "changeNavbar" });
        }, 300);
      };
    }
  },
  //每次都要验证，是否处于登录状态
  effects: {
    *query({ payload }, { call, put, select }) {
      let userToken = localStorage.getItem("userToken");
      let userName = localStorage.getItem("userName");
      const { locationPathname } = yield select(_ => _.app);

      if (userToken !== null) {
        //调用menu数据
        const list = yield call(menusService.query);
        if (list.isSuccess) {
          const menu = list.data;
          yield put({
            type: "updateState",
            payload: {
              userToken: userToken,
              userName: userName,
              menu
            }
          });
          if (location.pathname === "/login") {
            yield put(
              routerRedux.push({
                pathname: "/dashboard"
              })
            );
          }
        } else {
          //登录过期了
          message.error(list.msg);
          localStorage.removeItem("userToken");
          localStorage.removeItem("userName");
          yield put(
            routerRedux.push({
              pathname: "/login"
            })
          );
        }
      } else {
        yield put(
          routerRedux.push({
            pathname: "/login",
            search: queryString.stringify({
              from: locationPathname
            })
          })
        );
      }
    },
    //退出登录
    *logout({ payload }, { call, put }) {
      const data = yield call(backUserLogoutApi, payload);
      if (data.code == 0) {
        message.success("退出成功");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        yield put(
          routerRedux.push({
            pathname: "/login"
          })
        );
      } else if (data.code == -105) {
        message.info(data.msg);
        yield put(
          routerRedux.push({
            pathname: "/login"
          })
        );
      } else {
        message.error("退出失败");
      }
    },
    *changeNavbar(action, { put, select }) {
      const { app } = yield select(_ => _);
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: "handleNavbar", payload: isNavbar });
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold
      };
    },
    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    },

    switchMenuPopover(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      };
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload
      };
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys
      };
    }
  }
};
