import { statsDeviceActivateApi, statsDeviceSummaryApi, statsDeviceActiveApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: 'home',
  state: {
    overviewData: {},
    activateData: {},
    activeData: {}
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/dashboard') {
          let _ars = { userToken: localStorage.getItem("userToken"), period: 15, productId: 0 };
          let overview = { userToken: localStorage.getItem("userToken"), productId: 0 };
          dispatch({ type: "overview", payload: overview });
          dispatch({ type: "Activate", payload: _ars });
          dispatch({ type: "DeviceActive", payload: _ars });
        }
      })
    },
  },
  effects: {
    *overview({ payload }, { call, put }) {
      const data = yield call(statsDeviceSummaryApi, payload);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取数据概况失败,错误信息:" + data.msg : "获取数据概况失败");
      } else {
        if (data.data == null || data.data == {})
          message.info("无数据");
        else
          yield put({ type: "overviewSuccess", payload: data.data });
      }
    },
    *Activate({ payload }, { call, put }) {
      const data = yield call(statsDeviceActivateApi, payload);
      let activateData = null;
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取激活数据趋势失败,错误信息:" + data.msg : "获取激活数据趋势失败");
      } else {
        if (data.data == null || data.data == {})
          message.info("无数据");
        else {
          let dateArray = data.data.map(function (obj) {
            return obj.actDate;
          });
          let numArray = data.data.map(function (obj) {
            return obj.num;
          });
          let totalArray = data.data.map(function (obj) {
            return obj.total;
          });
          activateData = {
            dateArray: dateArray,
            numArray: numArray,
            totalArray: totalArray,
            listArray: data.data
          };
          yield put({ type: "ActivateSuccess", payload: activateData });
        }
      }
    },
    *DeviceActive({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取活跃数据趋势失败,错误信息:" + data.msg : "获取活跃数据趋势失败");
      } else {
        if (data.data == null || data.data == {})
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
    }
  },
  reducers: {
    //返回数据列表
    overviewSuccess(state, action) {
      return { ...state, overviewData: action.payload };
    },
    ActivateSuccess(state, action) {
      return { ...state, activateData: action.payload };
    },
    DeviceActiveSuccess(state, action) {
      return { ...state, activeData: action.payload };
    },
  }
}
