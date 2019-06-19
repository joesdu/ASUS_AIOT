import { statsDeviceActivateApi, statsDeviceActivateSummaryApi, deviceProductListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

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
          let activate = { userToken: config.userToken, period: 7, productId: 0 };
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
      if (!!data && data.code === 0) {
        yield put({ type: "ActivateSummarySuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取激活数据概况失败,错误信息:" + data.msg : "获取激活数据概况失败");
      }
    },
    *Activate({ payload }, { call, put }) {
      const data = yield call(statsDeviceActivateApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "ActivateSuccess", payload: {
            dateArray: data.data.map(function (obj) {
              return obj.actDate;
            }),
            numArray: data.data.map(function (obj) {
              return obj.num;
            }),
            totalArray: data.data.map(function (obj) {
              return obj.total;
            }),
            listArray: data.data
          }
        });
      } else {
        message.error(!!data ? "获取激活数据趋势失败,错误信息:" + data.msg : "获取激活数据趋势失败");
      }
    },
    *ProductList({ payload }, { call, put }) {
      const data = yield call(deviceProductListApi, { userToken: config.userToken });
      if (!!data && data.code === 0) {
        yield put({ type: "ProductListSuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
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
