import { deviceDetailApi } from "../../services/api";
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
        if (location.pathname === "/devices/Detail") {
          let _ars = { deviceId: location.state.deviceId };
          dispatch({ type: "queryDetail", payload: _ars });
        }
      });
    }
  },

  effects: {
    *queryDetail({ payload }, { call, put }) {
      const data = yield call(deviceDetailApi, payload);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
        yield put({ type: "queryFault" });
      } else {
        if (data.data == null || data.data == {} || data.data == undefined) {
          message.info("无数据");
          yield put({ type: "queryFault" });
        }
        else
          yield put({ type: "querySuccess", payload: data.data });
      }
    }
  },
  reducers: {
    //返回数据列表
    querySuccess(state, action) {
      return { ...state, detailData: action.payload };
    },
    queryFault(state) {
      return { ...state, detailData: {} };
    }
  }
};
