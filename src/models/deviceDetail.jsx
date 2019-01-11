import modelExtend from "dva-model-extend";
import { deviceLogListApi } from "../services/api";
import queryString from "query-string";
import { message } from "antd";
import $ from "jquery";

export default {
  namespace: "deviceDetail",
  state: {
    data: [], //列表数据
    pagination: {
      total: 0,
      pageSize: 0,
      current: 0,
      pageCount: 0
    }, //分页数据
    searchList: {}, //查询条件
    pageindex: 1, //分页开始 第几页
    pagesize: 10 //返回条数
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //页面初始化执行
        if (location.pathname === "/deviceDetail") {
          let _ars = {
            userToken: localStorage.getItem("userToken"),
            deviceId: 0,
            firstRow: 0,
            pageNum: 0,
            pageRows: 0
          };
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
      const data = yield call(deviceLogListApi, payload);
      if (data.code == 0) {
        let result = data.data;
        let _pag = {};
        _pag.total =
          typeof result.totalRows == "undefined" ? 0 : result.totalRows;
        _pag.pageSize =
          typeof result.pageRows == "undefined" ? 0 : result.pageRows;
        _pag.current =
          typeof result.pageNum == "undefined" ? 0 : result.pageNum;
        if (
          typeof result.totalRows == "undefined" ||
          typeof result.pageRows == "undefined"
        )
          _pag.pageCount = 0;
        else _pag.pageCount = (result.totalRows - 1) / result.pageRows + 1;

        let deviceLogs = result.deviceLogs;
        let deviceLogsData = deviceLogs;

        yield put({
          type: "querySuccess",
          payload: deviceLogsData,
          page: _pag
        });
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
      return {
        ...state,
        data: action.payload,
        pagination: action.page
      };
    },
    //分页参数
    setPage(state, action) {
      return {
        ...state,
        pageindex: action.payload,
        pagesize: action.pageSize
      };
    },
    //查询条件
    searchList(state, action) {
      return {
        ...state,
        searchList: action.payload
      };
    }
  }
};
