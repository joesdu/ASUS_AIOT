import { deviceLogListApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: "deviceLogs",
  state: {
    data: [], //列表数据
    pagination: {
      total: 0,
      pageSize: 0,
      current: 0,
      pageCount: 0
    }, //分页数据
    pageindex: 1, //分页开始 第几页
    pagesize: 10, //返回条数
    deviceId: 0
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //页面初始化执行
        if (location.pathname === "/deviceLogs") {
          let _ars = {
            userToken: localStorage.getItem("userToken"),
            //deviceId: location.deviceId,
            deviceId: location.state.deviceId,
            firstRow: null,
            pageNum: 0,
            pageRows: 10
          };
          localStorage.setItem("deviceId", location.state.deviceId),
            dispatch({ type: "queryRule", payload: _ars });
        }
      });
    }
  },

  effects: {
    *queryRule({ payload }, { call, put }) {
      const data = yield call(deviceLogListApi, payload);
      if (data.code == 0) {
        let result = data.data;
        let _pag = {};
        _pag.total = typeof result.totalRows == "undefined" ? 0 : result.totalRows;
        _pag.pageSize = typeof result.pageRows == "undefined" ? 0 : result.pageRows;
        _pag.current = typeof result.pageNum == "undefined" ? 0 : result.pageNum;
        if (typeof result.totalRows == "undefined" || typeof result.pageRows == "undefined")
          _pag.pageCount = 0;
        else
          _pag.pageCount = parseInt((result.totalRows - 1) / result.pageRows) + 1;
        yield put({ type: "querySuccess", payload: result.deviceLogs, page: _pag, deviceId: payload.deviceId });
      } else {
        message.error("获取数据失败,错误信息:" + data.msg);
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        data: [],
        pagination: {}, //分页数据
        searchList: {}, //查询条件
        pageindex: 1, //分页开始 第几页
        pagesize: 10 //返回条数
      };
    },
    //返回数据列表
    querySuccess(state, action) {
      return { ...state, data: action.payload, pagination: action.page, deviceId: action.deviceId };
    },
    //分页参数
    setPage(state, action) {
      return { ...state, pageindex: action.payload, pagesize: action.pageSize };
    }
  }
};
