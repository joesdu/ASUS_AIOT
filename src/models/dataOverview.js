import modelExtend from "dva-model-extend";
import {
  statsDeviceActivateApi,
  statsDeviceSummaryApi,
  statsDeviceActiveApi,
  statsDeviceAreaApi
} from "../services/api";
import queryString from "query-string";

export default {
  namespace: "dataOverview",
  state: {
    data: {
      overviewData: {},
      activateData: {},
      activeData: {},
      areaData: {}
    }, //列表数据,
    shows: false,
    selected: 0
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/dataOverview") {
          let overview = {
            productId: 0
          };
          let activate = { period: 7, productId: 0 };
          let active = { period: 7, productId: 0 };
          let area = { period: 7, productId: 0 };
          let _ars = {
            overview: overview,
            activate: activate,
            active: active,
            area: area
          };
          dispatch({ type: "queryRule", payload: _ars });
        }
      });
    }
  },
  effects: {
    *queryRule({ payload }, { call, put }) {
      const dataOverview = yield call(statsDeviceSummaryApi, payload.overview);
      const dataActivate = yield call(statsDeviceActivateApi, payload.activate);
      const dataActive = yield call(statsDeviceActiveApi, payload.active);
      const dataArea = yield call(statsDeviceAreaApi, payload.area);
      let result = {};
      let overviewData = null;
      let activateData = null;
      let activeData = null;
      let areaData = null;
      if (dataOverview.code == 0) {
        overviewData = dataOverview.data;
      } else {
        message.error("获取数据概况失败,错误信息:" + dataOverview.msg);
      }
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
      result = {
        overviewData: overviewData,
        activateData: activateData,
        activeData: activeData,
        areaData: areaData
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
