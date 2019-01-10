import modelExtend from "dva-model-extend";
import { feedbackListApi, deviceProductListApi } from "../services/api";
import queryString from "query-string";
import { message } from "antd";
import $ from "jquery";

export default {
  namespace: "userFeedback",
  state: {
    data: {
      feedbackData: [],
      deviceProductListData: []
    },
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
            endTime: null,
            firstRow: null,
            isProcessed: null,
            pageNum: 0,
            pageRows: 10,
            productId: null,
            startTime: null
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
      const data = yield call(feedbackListApi, payload);
      const prams = {};
      const dataDeviceProductList = yield call(deviceProductListApi, prams);
      let result = {};
      let deviceProductListData = [];
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
        else
          _pag.pageCount =
            parseInt((result.totalRows - 1) / result.pageRows) + 1;
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
        if (dataDeviceProductList.code == 0) {
          deviceProductListData = dataDeviceProductList.data;
        } else {
          message.error(
            "获取产品列表数据失败,错误信息:" + dataDeviceProductList.msg
          );
        }
        result = {
          feedbackData: feedbackData,
          deviceProductListData: deviceProductListData
        };
        yield put({
          type: "querySuccess",
          payload: result,
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
        data: {
          feedbackData: [],
          deviceProductListData: []
        },
        pagination: {},
        searchList: {},
        pageindex: 0,
        pagesize: 10
      }; //分页数据 //查询条件 //分页开始 第几页 //返回条数
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
