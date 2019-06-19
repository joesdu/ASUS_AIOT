import { backTestUserDeleteApi, backTestUserListApi, backTestUserSaveApi, backTestUseUpdateApi, deviceProductListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
  namespace: "testAccount",
  state: {
    addBtnVisible: false,
    editBtnVisible: false,
    editModalData: {},
    testUserData: [],
    deviceProductListData: [],
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
        if (location.pathname === "/testAccount") {
          let listPram = {
            firstRow: null,
            mobile: null,
            pageNum: 0,
            pageRows: 10,
            productId: null,
            userToken: config.userToken
          };
          dispatch({ type: "getList", payload: listPram });
          dispatch({ type: "productList" });
        }
      });
    }
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const data = yield call(backTestUserListApi, payload);
      if (!!data && data.code === 0) {
        let result = data.data;
        let _pag = {};
        _pag.total = typeof result.totalRows == undefined ? 0 : result.totalRows;
        _pag.pageSize = typeof result.pageRows == undefined ? 0 : result.pageRows;
        _pag.current = typeof result.pageNum == undefined ? 0 : result.pageNum;
        if (typeof result.totalRows == undefined || typeof result.pageRows == undefined)
          _pag.pageCount = 0;
        else
          _pag.pageCount = parseInt((result.totalRows - 1) / result.pageRows) + 1;
        yield put({ type: "getListSuccess", payload: result.testUsers, page: _pag });
      } else {
        message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
      }
    },
    *delete({ payload }, { call, put }) {
      const data = yield call(backTestUserDeleteApi, payload.delete);
      if (!!data && data.code === 0) {
        message.info("删除成功");
        yield put({ type: "getList", payload: payload.query });
      } else {
        message.error(!!data ? "删除数据失败,错误信息:" + data.msg : "删除数据失败");
      }
    },
    *save({ payload }, { call, put }) {
      const data = yield call(backTestUserSaveApi, payload.save);
      if (!!data && data.code === 0) {
        message.info("保存成功");
        yield put({ type: "getList", payload: payload.query });
      } else {
        message.error(!!data ? "保存数据失败,错误信息:" + data.msg : "保存数据失败");
      }
    },
    *update({ payload }, { call, put }) {
      const data = yield call(backTestUseUpdateApi, payload.update);
      if (!!data && data.code === 0) {
        message.info("更新成功");
        yield put({ type: "getList", payload: payload.query });
      } else {
        message.error(!!data ? "更新数据失败,错误信息:" + data.msg : "更新数据失败");
      }
    },
    *productList({ payload }, { call, put }) {
      const data = yield call(deviceProductListApi, { userToken: config.userToken });
      if (!!data && data.code === 0) {
        yield put({ type: "productListSuccess", payload: data.data });
      } else {
        message.error(!!data ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        addBtnVisible: false,
        editBtnVisible: false,
        editModalData: {},
        testUserData: [],
        deviceProductListData: [],
        pagination: {
          total: 0,
          pageSize: 10,
          current: 0,
          pageCount: 0
        },
        searchList: {}
      };
    },
    getListSuccess(state, action) {
      return { ...state, testUserData: action.payload, pagination: action.page };
    },
    productListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    searchList(state, action) {
      return { ...state, searchList: action.payload };
    },
    setAddVisibleState(state, action) {
      return { ...state, addBtnVisible: action.visible };
    },
    setEditVisibleState(state, action) {
      return { ...state, editBtnVisible: action.visible };
    },
    setEditModalData(state, action) {
      return { ...state, editModalData: action.data };
    }
  }
};
