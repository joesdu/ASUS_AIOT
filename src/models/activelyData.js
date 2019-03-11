import { statsDeviceActiveApi, statsDeviceActiveSummaryApi, deviceProductListApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: "activelyData",
  state: {
    activeSummaryData: {},
    activeData: {},
    deviceProductListData: [],
    shows: false,
    selected: 7
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/activelyData") {
          let _ars = { userToken: localStorage.getItem("userToken"), period: 7, productId: 0 };
          dispatch({ type: "ActiveSummary", payload: _ars });
          dispatch({ type: "DeviceActive", payload: _ars });
          dispatch({ type: "ProductList" });
        }
      });
    }
  },
  effects: {
    *ActiveSummary({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveSummaryApi, payload);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取数据概况失败,错误信息:" + data.msg : "获取数据概况失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else
          yield put({ type: "ActiveSummarySuccess", payload: data.data });
      }
    },
    *DeviceActive({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取活跃数据趋势失败,错误信息:" + data.msg : "获取活跃数据趋势失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else {
          let dateArray = data.data.map(function (obj) {
            return obj.actDate;
          });
          let numArray = data.data.map(function (obj) {
            return obj.num;
          });
          activeData = {
            dateArray: dateArray,
            numArray: numArray,
            listArray: data.data
          };
          yield put({ type: "DeviceActiveSuccess", payload: activeData });
        }
      }
    },
    *ProductList({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else
          yield put({ type: "ProductListSuccess", payload: data.data });
      }
    }
  },
  reducers: {
    //返回数据列表
    ActiveSummarySuccess(state, action) {
      return { ...state, activeSummaryData: action.payload };
    },
    DeviceActiveSuccess(state, action) {
      return { ...state, activeData: action.payload };
    },
    ProductListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    //改变状态
    selected(state, payload) {
      return { ...state, selected: payload.payload };
    }
  }
};
