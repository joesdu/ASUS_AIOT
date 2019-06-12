import { devicesListApi, deviceProductListApi } from "../../../services/api";
import { message } from "antd";
import config from "../../../utils/config";

export default {
  namespace: "devices",
  state: {
    deviceListData: [],
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
        if (location.pathname === "/devices") {
          let _ars = {
            userToken: config.userToken,
            actTimeEnd: null,
            actTimeStart: null,
            deviceId: null,
            deviceName: null,
            firstRow: null,
            isAct: null,
            lastActTimeEnd: null,
            lastActTimeStart: null,
            mobile: null,
            pageNum: 0,
            pageRows: 10,
            productId: null,
            source: null,
            status: null,
            updateTimeEnd: null,
            updateTimeStart: null,
            uuid: null
          };
          dispatch({ type: "devicesList", payload: _ars });
          dispatch({ type: "productList" });
        }
      });
    }
  },

  effects: {
    *devicesList({ payload }, { call, put }) {
      const data = yield call(devicesListApi, payload);
      let _pag = {};
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取设备列表数据失败,错误信息:" + data.msg : "获取设备列表数据失败");
        yield put({ type: "devicesListSuccess", payload: null, page: _pag });
      } else {
        if (data.data == null || data.data == {} || data.data == undefined) {
          message.info("无数据");
          yield put({ type: "devicesListSuccess", payload: null, page: _pag });
        }
        else {
          let result = data.data;
          _pag.total = typeof result.totalRows == undefined ? 0 : result.totalRows;
          _pag.pageSize = typeof result.pageRows == undefined ? 0 : result.pageRows;
          _pag.current = typeof result.pageNum == undefined ? 0 : result.pageNum;
          if (typeof result.totalRows == undefined || typeof result.pageRows == undefined)
            _pag.pageCount = 0;
          else
            _pag.pageCount = parseInt((result.totalRows - 1) / result.pageRows) + 1;
          let deviceListData = result.devices.map(function (obj) {
            return {
              nameAndID: { deviceName: obj.deviceName, deviceId: obj.deviceId },
              states: { isAct: obj.isAct, status: obj.status },
              productsAndUUID: { productName: obj.productName, uuid: obj.uuid },
              mobileAndSource: { mobile: obj.mobile, source: obj.source },
              firstActTime: obj.actTime,
              lastActTime: obj.lastActTime,
              updateTime: obj.updateTime,
              operation: obj.isAct
            };
          });
          yield put({ type: "devicesListSuccess", payload: deviceListData, page: _pag });
        }
      }
    },
    *productList({ payload }, { call, put }) {
      const prams = { userToken: config.userToken };
      const data = yield call(deviceProductListApi, prams);
      if (data == null || data.length == 0 || data == {} || data.code != 0) {
        message.error(data != null ? "获取产品列表数据失败,错误信息:" + data.msg : "获取产品列表数据失败");
      } else {
        if (data.data == null || data.data == {} || data.data == undefined)
          message.info("无数据");
        else
          yield put({ type: "productListSuccess", payload: data.data });
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        deviceListData: [],
        deviceProductListData: [],
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
    devicesListSuccess(state, action) {
      return { ...state, deviceListData: action.payload, pagination: action.page };
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
