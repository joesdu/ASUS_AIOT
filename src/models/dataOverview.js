import {
  statsDeviceActivateApi,
  statsDeviceSummaryApi,
  statsDeviceActiveApi,
  statsDeviceAreaApi,
  deviceProductListApi
} from "../services/api";
import { message } from "antd";

export default {
  namespace: "dataOverview",
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
        if (location.pathname === "/dataOverview") {
          let overview = {
            userToken: localStorage.getItem("userToken"),
            productId: 0
          };
          dispatch({ type: "queryOverviewData", payload: overview });
          let activate = {
            userToken: localStorage.getItem("userToken"),
            period: 7,
            productId: 0
          };
          dispatch({
            type: "queryActivateData",
            payload: activate
          });
          let active = {
            userToken: localStorage.getItem("userToken"),
            period: 7,
            productId: 0
          };
          dispatch({ type: "queryActiveData", payload: active });
          let area = {
            userToken: localStorage.getItem("userToken"),
            period: 1,
            productId: 0
          };
          dispatch({ type: "queryAreaData", payload: area });
          dispatch({ type: "queryProductListData" });
        }
      });
    }
  },
  effects: {
    *queryOverviewData({ payload }, { call, put }) {
      const data = yield call(statsDeviceSummaryApi, payload);
      if (data.code == 0) {
        yield put({
          type: "queryOverviewDataSuccess",
          payload: data.data
        });
      } else {
        message.error("获取数据概况失败,错误信息:" + data.msg);
      }
    },
    *queryActivateData({ payload }, { call, put }) {
      const data = yield call(statsDeviceActivateApi, payload);
      let activateData = null;
      if (data.code == 0) {
        let tempArray = data.data;
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < tempArray.length; i++) {
          dateArray[i] = tempArray[i].actDate;
          numArray[i] = tempArray[i].num;
        }
        activateData = { dateArray: dateArray, numArray: numArray };
        yield put({
          type: "queryActivateDataSuccess",
          payload: activateData
        });
      } else {
        message.error("获取激活数据趋势失败,错误信息:" + data.msg);
      }
    },
    *queryActiveData({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (data.code == 0) {
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < data.data.length; i++) {
          dateArray[i] = data.data[i].actDate;
          numArray[i] = data.data[i].num;
        }
        activeData = { dateArray: dateArray, numArray: numArray };
        yield put({
          type: "queryActiveDataSuccess",
          payload: activeData
        });
      } else {
        message.error("获取活跃数据趋势失败,错误信息:" + data.msg);
      }
    },
    *queryAreaData({ payload }, { call, put }) {
      const data = yield call(statsDeviceAreaApi, payload);
      let areaData = null;
      if (data.code == 0) {
        let areaArray = [];
        let numArray = [];
        for (var i = 0; i < data.data.length; i++) {
          areaArray[i] = data.data[i].area;
          numArray[i] = data.data[i].num;
        }
        areaData = { areaArray: areaArray, numArray: numArray };
        yield put({
          type: "queryAreaDataSuccess",
          payload: areaData
        });
      } else {
        message.error("获取区域统计失败,错误信息:" + data.msg);
      }
    },
    *queryProductListData({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data.code == 0) {
        yield put({
          type: "queryProductListDataSuccess",
          payload: data.data
        });
      } else {
        message.error("获取产品列表数据失败,错误信息:" + data.msg);
      }
    }
  },
  reducers: {
    queryOverviewDataSuccess(state, action) {
      return { ...state, overviewData: action.payload };
    },
    queryActivateDataSuccess(state, action) {
      return { ...state, activateData: action.payload };
    },
    queryActiveDataSuccess(state, action) {
      return { ...state, activeData: action.payload };
    },
    queryAreaDataSuccess(state, action) {
      return { ...state, areaData: action.payload };
    },
    queryProductListDataSuccess(state, action) {
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
