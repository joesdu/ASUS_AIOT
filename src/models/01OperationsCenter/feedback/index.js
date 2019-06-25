import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
  namespace: "userFeedback",
  state: {
    feedbackData: [],
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
        if (location.pathname === "/userFeedback") {
          let _ars = {
            userToken: config.userToken,
            endTime: null,
            firstRow: null,
            isProcessed: null,
            pageNum: 0,
            pageRows: 10,
            productId: null,
            startTime: null
          };
          dispatch({
            type: "feedbackList",
            payload: _ars
          });
          dispatch({ type: "productList" });
        }
      });
    }
  },

  effects: {
    *feedbackList({ payload }, { call, put }) {
      const data = yield call(feedbackListApi, payload);
      let _pag = {};
      if (!!data && data.code === 0) {
        _pag.total = typeof data.data.totalRows == undefined ? 0 : data.data.totalRows;
        _pag.pageSize = typeof data.data.pageRows == undefined ? 0 : data.data.pageRows;
        _pag.current = typeof data.data.pageNum == undefined ? 0 : data.data.pageNum;
        if (typeof data.data.totalRows == undefined || typeof data.data.pageRows == undefined)
          _pag.pageCount = 0;
        else
          _pag.pageCount = parseInt((data.data.totalRows - 1) / data.data.pageRows) + 1;
        yield put({
          type: "feedbackListSuccess",
          payload: data.data.feedbacks.map(function (obj) {
            let remarks = "";
            if ((obj.remark == null | obj.remark == "" | obj.remark == undefined)) {
              remarks = obj.remark;
            } else {
              remarks = "【处理批注】" + obj.remark;
            }
            return {
              descriptionAndRemark: { description: "【" + obj.productName + " 】" + obj.description, remark: remarks },
              contact: obj.contact,
              mobileAndNickname: { mobile: obj.mobile, nickname: obj.nickName },
              productName: obj.productName,
              createTime: obj.createTime,
              feedbackId: obj.feedbackId,
              isProcessed: obj.isProcessed
            };
          }),
          page: _pag
        });
      } else {
        message.error(!!data ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
        yield put({ type: "feedbackListSuccess", payload: null, page: _pag });
      }
    },
    *productList({ payload }, { call, put }) {
      const data = yield call(deviceProductListApi, { userToken: config.userToken });
      if (!!data && data.code === 0) {
        yield put({
          type: "productListSuccess",
          payload: data.data
        });
      } else {
        message.error(!!data ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      }
    },
    *updateFeedback({ payload }, { call, put }) {
      const data = yield call(feedbackUpdateApi, payload.update);
      if (!!data && data.code === 0) {
        message.info("更新成功:" + data.msg);
        yield put({
          type: "feedbackList",
          payload: payload.query
        });
      } else {
        message.error(!!data ? "更新失败,错误信息:" + data.msg : "更新失败");
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        feedbackData: [],
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
    //返回数据列表
    feedbackListSuccess(state, action) {
      return {
        ...state,
        feedbackData: action.payload,
        pagination: action.page
      };
    },
    productListSuccess(state, action) {
      return {
        ...state,
        deviceProductListData: action.payload
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
