import { userListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
  namespace: "appUsers",
  state: {
    data: [], //列表数据
    pagination: {
      total: 0,
      pageSize: 10,
      current: 0,
      pageCount: 0
    }, //分页数据
    searchList: {} //查询条件
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //页面初始化执行
        if (location.pathname === "/appUsers") {
          let _ars = {
            userToken: config.userToken,
            appSource: null,
            firstRow: null,
            mobile: null,
            nickName: null,
            pageNum: 0,
            pageRows: 10
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
      const data = yield call(userListApi, payload);
      if (!!data && data.code === 0) {
        let result = data.data;
        let _pag = {};
        _pag.total =
          typeof result.totalRows == undefined ? 0 : result.totalRows;
        _pag.pageSize = typeof result.pageRows == undefined ? 0 : result.pageRows;
        _pag.current = typeof result.pageNum == undefined ? 0 : result.pageNum;
        if (typeof result.totalRows == undefined || typeof result.pageRows == undefined)
          _pag.pageCount = 0;
        else
          _pag.pageCount = parseInt((result.totalRows - 1) / result.pageRows) + 1;
        let userData = result.users;
        yield put({
          type: "querySuccess",
          payload: userData,
          page: _pag
        });
      } else {
        message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        data: [],
        pagination: {
          total: 0,
          pageSize: 10,
          current: 0,
          pageCount: 0
        }, //分页数据
        searchList: {} //查询条件
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
    //查询条件
    searchList(state, action) {
      return {
        ...state,
        searchList: action.payload
      };
    }
  }
};
