import { statsDeviceActiveApi, statsDeviceActiveSummaryApi, deviceProductListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

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
          let _ars = { userToken: config.userToken, period: 7, productId: 0 };
          dispatch({ type: "ActiveSummary", payload: _ars });
          dispatch({ type: "DeviceActive", payload: _ars });
          dispatch({ type: "ProductList" });
        }
      });
    }
  },
  effects: {
    *ActiveSummary({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveSummaryApi, payload);
      if (!!data && data.code === 0) {
        yield put({ type: "ActiveSummarySuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取数据概况失败,错误信息:" + data.msg : "获取数据概况失败");
      }
    },
    *DeviceActive({ payload }, { call, put }) {
      const data = yield call(statsDeviceActiveApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "DeviceActiveSuccess", payload: {
            dateArray: data.data.map(function (obj) {
              return obj.actDate;
            }),
            numArray: data.data.map(function (obj) {
              return obj.num;
            }),
            listArray: data.data
          }
        });
      } else {
        message.error(!!data ? "获取活跃数据趋势失败,错误信息:" + data.msg : "获取活跃数据趋势失败");
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
    ActiveSummarySuccess(state, action) {
      return { ...state, activeSummaryData: action.payload };
    },
    DeviceActiveSuccess(state, action) {
      return { ...state, activeData: action.payload };
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
