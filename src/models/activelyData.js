import modelExtend from "dva-model-extend";
import {
  statsDeviceActiveApi,
  statsDeviceActiveSummaryApi
} from "../services/api";
import queryString from "query-string";

export default {
  namespace: "activelyData",
  state: {
    activeSummaryData: {},
    activeData: {},
    shows: false,
    selected: 7
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/activelyData") {
          let _ars = { period: 7, productId: 0 };
          dispatch({
            type: "queryActiveSummaryData",
            payload: _ars
          });
          dispatch({
            type: "queryDeviceActiveData",
            payload: _ars
          });
        }
      });
    }
  },
  effects: {
    *queryActiveSummaryData({ payload }, { call, put }) {
      const dataActiveSummary = yield call(
        statsDeviceActiveSummaryApi,
        payload
      );
      if (dataActiveSummary.code == 0) {
        yield put({
          type: "queryActiveSummaryDataSuccess",
          payload: dataActiveSummary.data
        });
      } else {
        message.error("获取数据概况失败,错误信息:" + dataActiveSummary.msg);
      }
    },
    *queryDeviceActiveData({ payload }, { call, put }) {
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
          type: "queryDeviceActiveDataSuccess",
          payload: activeData
        });
      } else {
        message.error("获取活跃数据趋势失败,错误信息:" + dataActive.msg);
      }
    }
  },
  reducers: {
    //返回数据列表
    queryActiveSummaryDataSuccess(state, action) {
      return {
        ...state,
        activeSummaryData: action.payload
      };
    },
    queryDeviceActiveDataSuccess(state, action) {
      return {
        ...state,
        activeData: action.payload
      };
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
