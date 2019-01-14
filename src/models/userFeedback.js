import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../services/api";
import { message } from "antd";

export default {
  namespace: "userFeedback",
  state: {
    feedbackData: [],
    deviceProductListData: [],
    pagination: {
      total: 0,
      pageSize: 0,
      current: 0,
      pageCount: 0
    }, //分页数据
    searchList: {}, //查询条件
    pageindex: 0, //分页开始 第几页
    pagesize: 10 //返回条数
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //页面初始化执行
        if (location.pathname === "/userFeedback") {
          let _ars = {
            userToken: localStorage.getItem("userToken"),
            endTime: null,
            firstRow: null,
            isProcessed: null,
            pageNum: 0,
            pageRows: 10,
            productId: null,
            startTime: null
          };
          dispatch({ type: "feedbackList", payload: _ars });
          dispatch({ type: "productList" });
        }
      });
    }
  },

  effects: {
    *feedbackList({ payload }, { call, put }) {
      const data = yield call(feedbackListApi, payload);
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
        let feedbacks = result.feedbacks;
        let feedbackData = [];
        for (var i = 0; i < feedbacks.length; i++) {
          feedbackData[i] = {
            description: feedbacks[i].description,
            mobileAndNickname: {
              mobile: feedbacks[i].mobile,
              nickname: feedbacks[i].nickname
            },
            productName: feedbacks[i].productName,
            createTime: feedbacks[i].createTime,
            feedbackId: feedbacks[i].feedbackId,
            isProcessed: feedbacks[i].isProcessed
          };
        }
        yield put({ type: "feedbackListSuccess", payload: feedbackData, page: _pag });
      } else {
        message.error("获取数据失败,错误信息:" + data.msg);
      }
    },
    *productList({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data.code == 0) {
        yield put({ type: "productListSuccess", payload: data.data });
      } else {
        message.error("获取产品列表数据失败,错误信息:" + data.msg);
      }
    },
    *updateFeedback({ payload }, { call, put }) {
      const data = yield call(feedbackUpdateApi, payload);
      if (data.code == 0) {
        message.info("更新成功:" + data.msg);
      } else {
        message.error("更新失败:" + data.msg);
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        feedbackData: [],
        deviceProductListData: [],
        pagination: {},
        searchList: {},
        pageindex: 0,
        pagesize: 10
      };
    },
    //返回数据列表
    feedbackListSuccess(state, action) {
      return { ...state, feedbackData: action.payload, pagination: action.page };
    },
    productListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    //分页参数
    setPage(state, action) {
      return { ...state, pageindex: action.payload, pagesize: action.pageSize };
    },
    //查询条件
    searchList(state, action) {
      return { ...state, searchList: action.payload };
    }
  }
};
