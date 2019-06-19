import { statsDeviceActivateApi, statsDeviceSummaryApi, statsDeviceActiveApi, statsDeviceAreaApi, deviceProductListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
  namespace: "home",
  state: {
    overviewData: {},
    activateData: {},
    activeData: {},
    areaData: {},
    deviceProductListData: [], //列表数据,
    shows: false,
    activateSelected: 7,
    activeSelected: 7,
    areaSelected: 1
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/home") {
          let overview = { userToken: config.userToken, productId: 0 };
          let activate = { userToken: config.userToken, period: 7, productId: 0 };
          let active = { userToken: config.userToken, period: 7, productId: 0 };
          let area = { userToken: config.userToken, period: 1, productId: 0 };
          dispatch({ type: "overview", payload: overview });
          dispatch({ type: "activate", payload: activate });
          dispatch({ type: "active", payload: active });
          dispatch({ type: "area", payload: area });
          dispatch({ type: "productList" });
        }
      });
    }
  },
  effects: {
    *overview({ payload }, { call, put }) {
      const data = yield call(statsDeviceSummaryApi, payload);
      if (!!data && data.code === 0) {
        yield put({ type: "overviewSuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取数据概况失败,错误信息:" + data.msg : "获取数据概况失败");
      }
    },
    *activate({ payload }, { call, put }) {
      const data = yield call(statsDeviceActivateApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "activateSuccess", payload: {
            dateArray: data.data.map(function (obj) {
              return obj.actDate;
            }),
            numArray: data.data.map(function (obj) {
              return obj.num;
            })
          }
        });
      } else {
        message.error(!!data ? "获取激活数据趋势失败,错误信息:" + data.msg : "获取激活数据趋势失败");
      }
    },
    *active({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "activeSuccess", payload: {
            dateArray: data.data.map(function (obj) {
              return obj.actDate;
            }),
            numArray: data.data.map(function (obj) {
              return obj.num;
            })
          }
        });
      } else {
        message.error(!!data ? "获取活跃数据趋势失败,错误信息:" + data.msg : "获取活跃数据趋势失败");
      }
    },
    *area({ payload }, { call, put }) {
      const data = yield call(statsDeviceAreaApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "areaSuccess", payload: {
            areaArray: data.data.map(function (obj) {
              return obj.area;
            }),
            numArray: data.data.map(function (obj) {
              return obj.num;
            })
          }
        });
      } else {
        message.error(!!data ? "获取区域统计失败,错误信息:" + data.msg : "获取区域统计失败");
      }
    },
    *productList({ payload }, { call, put }) {
      const data = yield call(deviceProductListApi, { userToken: config.userToken });
      if (!!data && data.code === 0) {
        yield put({ type: "productListSuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      }
    }
  },
  reducers: {
    overviewSuccess(state, action) {
      return { ...state, overviewData: action.payload };
    },
    activateSuccess(state, action) {
      return { ...state, activateData: action.payload };
    },
    activeSuccess(state, action) {
      return { ...state, activeData: action.payload };
    },
    areaSuccess(state, action) {
      return { ...state, areaData: action.payload };
    },
    productListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    //激活数据趋势改变状态
    activateSelected(state, payload) {
      return { ...state, activateSelected: payload.payload };
    },
    activeSelected(state, payload) {
      return { ...state, activeSelected: payload.payload };
    },
    areaSelected(state, payload) {
      return { ...state, areaSelected: payload.payload };
    }
  }
};
