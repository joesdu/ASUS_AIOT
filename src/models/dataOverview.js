import modelExtend from "dva-model-extend";
import {
  statsDeviceActivateApi,
  statsDeviceSummaryApi,
  statsDeviceActiveApi,
  statsDeviceAreaApi,
  deviceProductListApi
} from "../services/api";
import queryString from "query-string";

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
          let overview = { productId: 0 };
          dispatch({ type: "queryOverviewData", payload: overview });
          let activate = { period: 7, productId: 0 };
          dispatch({ type: "queryActivateData", payload: activate });
          let active = { period: 7, productId: 0 };
          dispatch({ type: "queryActiveData", payload: active });
          let area = { period: 1, productId: 0 };
          dispatch({ type: "queryAreaData", payload: area });
          dispatch({
            type: "queryDeviceProductListData",
            payload: null
          });
        }
      });
    }
  },
  effects: {
    *queryOverviewData({ payload }, { call, put }) {
      const dataOverview = yield call(statsDeviceSummaryApi, payload);
      let overviewData = null;
      if (dataOverview.code == 0) {
        overviewData = dataOverview.data;
      } else {
        message.error("获取数据概况失败,错误信息:" + dataOverview.msg);
      }
      yield put({
        type: "queryOverviewDataSuccess",
        payload: overviewData
      });
    },
    *queryActivateData({ payload }, { call, put }) {
      const dataActivate = yield call(statsDeviceActivateApi, payload);
      let activateData = null;
      if (dataActivate.code == 0) {
        let tempArray = dataActivate.data;
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < tempArray.length; i++) {
          dateArray[i] = tempArray[i].actDate;
          numArray[i] = tempArray[i].num;
        }
        activateData = { dateArray: dateArray, numArray: numArray };
      } else {
        message.error("获取激活数据趋势失败,错误信息:" + dataActivate.msg);
      }
      yield put({
        type: "queryActivateDataSuccess",
        payload: activateData
      });
    },
    *queryActiveData({ payload }, { call, put }) {
      const dataActive = yield call(statsDeviceActiveApi, payload);
      let activeData = null;
      if (dataActive.code == 0) {
        let dateArray = [];
        let numArray = [];
        for (var i = 0; i < dataActive.data.length; i++) {
          dateArray[i] = dataActive.data[i].actDate;
          numArray[i] = dataActive.data[i].num;
        }
        activeData = { dateArray: dateArray, numArray: numArray };
      } else {
        message.error("获取活跃数据趋势失败,错误信息:" + dataActive.msg);
      }
      yield put({
        type: "queryActiveDataSuccess",
        payload: activeData
      });
    },
    *queryAreaData({ payload }, { call, put }) {
      const dataArea = yield call(statsDeviceAreaApi, payload);
      let areaData = null;
      if (dataArea.code == 0) {
        let areaArray = [];
        let numArray = [];
        for (var i = 0; i < dataArea.data.length; i++) {
          areaArray[i] = dataArea.data[i].area;
          numArray[i] = dataArea.data[i].num;
        }
        areaData = { areaArray: areaArray, numArray: numArray };
      } else {
        message.error("获取区域统计失败,错误信息:" + dataArea.msg);
      }
      yield put({
        type: "queryAreaDataSuccess",
        payload: areaData
      });
    },
    *queryDeviceProductListData({ payload }, { call, put }) {
      const prams = {};
      const dataDeviceProductList = yield call(deviceProductListApi, prams);
      let deviceProductListData = [];
      if (dataDeviceProductList.code == 0) {
        deviceProductListData = dataDeviceProductList.data;
      } else {
        message.error(
          "获取产品列表数据失败,错误信息:" + dataDeviceProductList.msg
        );
      }
      yield put({
        type: "queryDeviceProductListDataSuccess",
        payload: deviceProductListData
      });
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
    //返回数据列表
    queryDeviceProductListData(state, action) {
      return {
        ...state,
        data: action.payload
      };
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
