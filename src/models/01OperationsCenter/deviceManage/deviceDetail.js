import { deviceDetailApi } from "../../../services/api";
import { message } from "antd";

export default {
  namespace: "deviceDetail",
  state: {
    detailData: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //页面初始化执行
        if (location.pathname === "/devicesDetail") {
          let _ars = { deviceId: location.state.deviceId };
          dispatch({
            type: "queryDetail",
            payload: _ars
          });
        }
      });
    }
  },

  effects: {
    *queryDetail({ payload }, { call, put }) {
      const data = yield call(deviceDetailApi, payload);
      if (!!data && data.code === 0) {
        yield put({
          type: "querySuccess",
          payload: data.data
        });
      } else {
        message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
        yield put({ type: "queryFault" });
      }
    }
  },
  reducers: {
    //返回数据列表
    querySuccess(state, action) {
      return {
        ...state,
        detailData: action.payload
      };
    },
    queryFault(state) {
      return {
        ...state,
        detailData: {}
      };
    }
  }
};
