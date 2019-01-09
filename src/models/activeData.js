import modelExtend from "dva-model-extend";
import {
  statsDeviceActivateApi,
  statsDeviceActivateSummaryApi
} from "../services/api";
import queryString from "query-string";

export default {
  namespace: "activeData",
  state: {
    data: {
      activateSummaryData: {},
      activateData: {}
    },
    shows: false,
    selected: 0
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/activeData") {
          let _ars = { period: 7, productId: 0 };
          dispatch({
            type: "queryRule",
            payload: _ars
          });
        }
      });
    }
  },
  effects: {
    *queryRule({ payload }, { call, put }) {
      const dataActivateSummary = yield call(
        statsDeviceActivateSummaryApi,
        payload
      );
      const dataActivate = yield call(statsDeviceActivateApi, payload);
      let result = {};
      let activateSummaryData = null;
      let activateData = null;
      if (dataActivateSummary.code == 0) {
        activateSummaryData = dataActivateSummary.data;
      } else {
        message.error(
          "获取激活数据概况失败,错误信息:" + dataActivateSummary.msg
        );
      }
      if (dataActivate.code == 0) {
        let listArray = dataActivate.data;
        let dateArray = [];
        let numArray = [];
        let totalArray = [];
        for (var i = 0; i < listArray.length; i++) {
          dateArray[i] = listArray[i].actDate;
          numArray[i] = listArray[i].num;
          totalArray[i] = listArray[i].total;
        }
        activateData = {
          dateArray: dateArray,
          numArray: numArray,
          totalArray: totalArray,
          listArray: listArray
        };
      } else {
        message.error("获取激活数据趋势失败,错误信息:" + dataActivate.msg);
      }

      result = {
        activateSummaryData: activateSummaryData,
        activateData: activateData
      };
      yield put({
        type: "querySuccess",
        payload: result
      });
    }
  },
  reducers: {
    //返回数据列表
    querySuccess(state, action) {
      return {
        ...state,
        data: action.payload
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
