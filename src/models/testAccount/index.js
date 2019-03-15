import { feedbackListApi, deviceProductListApi, feedbackUpdateApi } from "../../services/api";
import { message } from "antd";

export default {
  namespace: "textAccount",
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
          if (location.pathname === "/textAccount") {
          let _ars = {
            userToken: localStorage.getItem("userToken"),
            firstRow: null,
            isProcessed: null,
            pageNum: 0,
            pageRows: 10,
            productId: null
          };
              dispatch({ type: "accountList", payload: _ars });
          dispatch({ type: "productList" });
        }
      });
    }
  },

  effects: {
    *accountList({ payload }, { call, put }) {
      const data = yield call(feedbackListApi, payload);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取数据失败,错误信息:" + data.msg : "获取数据失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else {
          let result = data.data;
          let _pag = {};
          _pag.total = typeof result.totalRows == undefined ? 0 : result.totalRows;
          _pag.pageSize = typeof result.pageRows == undefined ? 0 : result.pageRows;
          _pag.current = typeof result.pageNum == undefined ? 0 : result.pageNum;
          if (typeof result.totalRows == undefined || typeof result.pageRows == undefined)
            _pag.pageCount = 0;
          else
            _pag.pageCount = parseInt((result.totalRows - 1) / result.pageRows) + 1;
          let feedbackData = result.feedbacks.map(function (obj) {
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
          });
            yield put({ type: "accountListListSuccess", payload: feedbackData, page: _pag });
        }
      }
    },
    *productList({ payload }, { call, put }) {
      const prams = { userToken: localStorage.getItem("userToken") };
      const data = yield call(deviceProductListApi, prams);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else
          yield put({ type: "productListSuccess", payload: data.data });
      }
    },
    *updateFeedback({ payload }, { call, put }) {
      const data = yield call(feedbackUpdateApi, payload.update);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "更新失败,错误信息:" + data.msg : "更新失败");
      } else {
        message.info("更新成功:" + data.msg);
        yield put({ type: "feedbackList", payload: payload.query });
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
      accountListListSuccess(state, action) {
      return { ...state, feedbackData: action.payload, pagination: action.page };
    },
    productListSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
    },
    //查询条件
    searchList(state, action) {
      return { ...state, searchList: action.payload };
    }
  }
};
