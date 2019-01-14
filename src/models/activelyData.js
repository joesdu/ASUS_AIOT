import {
  statsDeviceActiveApi,
  statsDeviceActiveSummaryApi,
  deviceProductListApi
} from "../services/api";
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
          let _ars = {
            userToken: localStorage.getItem("userToken"),
            period: 7,
            productId: 0
          };
          dispatch({ type: "queryActiveSummary", payload: _ars });
          dispatch({ type: "queryDeviceActive", payload: _ars });
          dispatch({ type: "queryProductList" });
        }
      });
    }
  },
  effects: {
    *queryActiveSummary({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveSummaryApi, payload);
      if (data.code == 0) {
        yield put({
          type: "queryActiveSummarySuccess",
          payload: data.data
        });
      } else {
        message.error("获取数据概况失败,错误信息:" + data.msg);
      }
    },
    *queryDeviceActive({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (data.code == 0) {
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < data.data.length; i++) {
          dateArray[i] = data.data[i].actDate;
          numArray[i] = data.data[i].num;
        }
        activeData = {
          dateArray: dateArray,
          numArray: numArray,
          listArray: data.data
        };
        yield put({
          type: "queryDeviceActiveSuccess",
          payload: activeData
        });
      } else {
        message.error("获取活跃数据趋势失败,错误信息:" + data.msg);
      }
    },
    *queryProductList({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data.code == 0) {
        yield put({
          type: "queryProductListSuccess",
          payload: data.data
        });
      } else {
        message.error("获取产品列表数据失败,错误信息:" + data.msg);
      }
    }
  },
  reducers: {
    //返回数据列表
    queryActiveSummarySuccess(state, action) {
      return {
        ...state,
        activeSummaryData: action.payload
      };
    },
    queryDeviceActiveSuccess(state, action) {
      return {
        ...state,
        activeData: action.payload
      };
    },
    queryProductListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    //改变状态
    selected(state, payload) {
      return {
        ...state,
        selected: payload.payload
      };
    },
    //搜索条件
    searchValue(state, payload) {
      return {
        ...state,
        formValues: payload.payload
      };
    }
  }
};
