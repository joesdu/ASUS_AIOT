import modelExtend from "dva-model-extend";
import { devicesListApi, deviceProductListApi } from "../services/api";
import queryString from "query-string";
import { message } from "antd";
import $ from "jquery";

export default {
  namespace: "devices",
  state: {
    deviceListData: [],
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
        if (location.pathname === "/devices") {
          let _ars = {
            userToken: localStorage.getItem("userToken"),
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
          dispatch({ type: "queryDevicesListData", payload: _ars });
          dispatch({
            type: "queryDeviceProductListData",
            payload: null
          });
        }
      });
    }
  },

  effects: {
    *queryDevicesListData({ payload }, { call, put }) {
      const dataDevicesList = yield call(devicesListApi, payload);
      let deviceListData = [];
      let _pag = {};
      if (dataDevicesList.code == 0) {
        let result = dataDevicesList.data;
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
        let devices = result.devices;
        for (var i = 0; i < devices.length; i++) {
          deviceListData[i] = {
            nameAndID: {
              deviceName: devices[i].deviceName,
              deviceId: devices[i].deviceId
            },
            states: { isAct: devices[i].isAct, status: devices[i].status },
            productsAndUUID: {
              productName: devices[i].productName,
              uuid: devices[i].uuid
            },
            mobileAndSource: {
              mobile: devices[i].mobile,
              source: devices[i].source
            },
            firstActTime: devices[i].actTime,
            lastActTime: devices[i].lastActTime,
            updateTime: devices[i].updateTime,
            operation: devices[i].isAct
          };
        }
        yield put({
          type: "queryDevicesListDataSuccess",
          payload: deviceListData,
          page: _pag
        });
      } else {
        message.error("获取设备列表数据失败,错误信息:" + dataDevicesList.msg);
      }
    },
    *queryDeviceProductListData({ payload }, { call, put }) {
      const prams = {
        userToken: localStorage.getItem("userToken")
      };
      const dataDeviceProductList = yield call(deviceProductListApi, prams);
      if (dataDeviceProductList.code == 0) {
        yield put({
          type: "queryDeviceProductListDataSuccess",
          payload: dataDeviceProductList.data
        });
      } else {
        message.error(
          "获取产品列表数据失败,错误信息:" + dataDeviceProductList.msg
        );
      }
    }
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        deviceListData: [],
        deviceProductListData: [],
        pagination: {}, //分页数据
        searchList: {}, //查询条件
        pageindex: 0, //分页开始 第几页
        pagesize: 10 //返回条数
      };
    },
    //返回数据列表
    queryDevicesListDataSuccess(state, action) {
      return {
        ...state,
        deviceListData: action.payload,
        pagination: action.page
      };
    },
    queryDeviceProductListDataSuccess(state, action) {
      return { ...state, deviceProductListData: action.payload };
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
