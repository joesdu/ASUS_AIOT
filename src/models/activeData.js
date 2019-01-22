import { statsDeviceActivateApi, statsDeviceActivateSummaryApi, deviceProductListApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: "activeData",
  state: {
    activateSummaryData: {},
    activateData: {},
    deviceProductListData: [], //列表数据,
    shows: false,
    selected: 7
  },
  //初始化得到值
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/activeData") {
          let activate = { userToken: localStorage.getItem("userToken"), period: 7, productId: 0 };
          dispatch({ type: "ActivateSummary", payload: activate });
          dispatch({ type: "Activate", payload: activate });
          dispatch({ type: "ProductList" });
        }
      });
    }
  },
  effects: {
    *ActivateSummary({ payload }, { call, put }) {
      const data = yield call(statsDeviceActivateSummaryApi, payload);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取激活数据概况失败,错误信息:" + data.msg : "获取激活数据概况失败");
      } else {
        if (data.data == null || data.data == {})
          message.info("无数据");
        else
          yield put({ type: "ActivateSummarySuccess", payload: data.data });
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
          let listArray = data.data;
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
          yield put({ type: "ActivateSuccess", payload: activateData });
        }
      }
    },
    *ProductList({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      } else {
        if (data.data == null || data.data == {})
          message.info("无数据");
        else
          yield put({ type: "ProductListSuccess", payload: data.data });
      }
    }
  },
  reducers: {
    //返回数据列表
    ActivateSummarySuccess(state, action) {
      return { ...state, activateSummaryData: action.payload };
    },
    ActivateSuccess(state, action) {
      return { ...state, activateData: action.payload };
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
