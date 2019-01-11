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
          let _ars = { userToken: localStorage.getItem("userToken"), period: 7, productId: 0 };
          dispatch({ type: "queryActiveSummary", payload: _ars });
          dispatch({ type: "queryDeviceActive", payload: _ars });
          dispatch({ type: "queryProductList" });
        }
      });
    }
  },
  effects: {
    *queryActiveSummary({ payload }, { call, put }) {
      const dataActiveSummary = yield call(
        statsDeviceActiveSummaryApi,
        payload
      );
      if (dataActiveSummary.code == 0) {
        yield put({
          type: "queryActiveSummarySuccess",
          payload: dataActiveSummary.data
        });
      } else {
        message.error("获取数据概况失败,错误信息:" + dataActiveSummary.msg);
      }
    },
    *queryDeviceActive({ payload }, { call, put }) {
      const dataActive = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (dataActive.code == 0) {
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < dataActive.data.length; i++) {
          dateArray[i] = dataActive.data[i].actDate;
          numArray[i] = dataActive.data[i].num;
        }
        activeData = {
          dateArray: dateArray,
          numArray: numArray,
          listArray: dataActive.data
        };
        yield put({
          type: "queryDeviceActiveSuccess",
          payload: activeData
        });
      } else {
        message.error("获取活跃数据趋势失败,错误信息:" + dataActive.msg);
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
