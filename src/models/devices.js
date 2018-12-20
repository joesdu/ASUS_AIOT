import modelExtend from 'dva-model-extend';
import { devicesListApi } from '../services/api';
import queryString from 'query-string';
import { message } from 'antd';
import $ from 'jquery';


export default {
  namespace: 'devices',
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
    pagesize: 10, //返回条数
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        //页面初始化执行
        if (location.pathname === '/devices') {
          let _ars = {
            "actTimeEnd": "2018-12-01T06:04:08.717Z",
            "actTimeStart": "2018-12-19T06:04:08.717Z",
            "deviceId": 0,
            "deviceName": "string",
            "firstRow": 0,
            "isAct": 0,
            "lastActTimeEnd": "2018-12-01T06:04:08.717Z",
            "lastActTimeStart": "2018-12-19T06:04:08.717Z",
            "mobile": "string",
            "pageNum": 0,
            "pageRows": 0,
            "productId": 0,
            "source": 0,
            "status": 0,
            "updateTimeEnd": "2018-12-01T06:04:08.718Z",
            "updateTimeStart": "2018-12-19T06:04:08.718Z",
            "uuid": "string"
          }
          dispatch({
            type: 'queryRule',
            payload: _ars
          })
        }
      })
    },
  },

  effects: {
    * queryRule({
      payload,
    }, { call, put }) {
      const data = yield call(devicesListApi, payload)
      if (data.code == 0) {
        let result = data.data;
        let _pag = {}
        _pag.total = typeof result.totalRows == 'undefined' ? 0 : result.totalRows;
        _pag.pageSize = typeof result.pageRows == 'undefined' ? 0 : result.pageRows;
        _pag.current = typeof result.pageNum == 'undefined' ? 0 : result.pageNum;
        if (typeof result.totalRows == 'undefined' || typeof result.pageRows == 'undefined')
          _pag.pageCount = 0;
        else
          _pag.pageCount = ((result.totalRows - 1) / result.pageRows) + 1;
        let devices = result.devices;
        let deviceData = []
        for (var i = 0; i < devices.length; i++) {
          deviceData[i].nameAndID = {
            deviceName: devices[i].deviceName,
            deviceId: devices[i].deviceId
          };
          deviceData[i].states = {
            isAct: devices[i].isAct,
            status: devices[i].status
          };
          deviceData[i].productsAndUUID = {
            productName: devices[i].productName,
            uuid: devices[i].uuid
          };
          deviceData[i].mobileAndSource = {
            mobile: devices[i].mobile,
            source: devices[i].source
          };
          deviceData[i].firstActTime = devices[i].actTime;
          deviceData[i].lastActTime = devices[i].lastActTime;
          deviceData[i].updateTime = devices[i].updateTime;
          if (devices[i].isAct == '已激活')//激活的话,存在两个操作.未激活为一个操作
            deviceData[i].operation = 2;
          else
            deviceData[i].operation = 1;
        }
        yield put({
          type: 'querySuccess',
          payload: deviceData,
          page: _pag
        })
      } else {
        message.error('获取数据失败,错误信息:' + data.msg);
      }
    },
  },
  reducers: {
    clearData(state) {
      return {
        ...state,
        data: [],
        pagination: {}, //分页数据
        searchList: {}, //查询条件
        pageindex: 1, //分页开始 第几页
        pagesize: 10, //返回条数
      }
    },
    //返回数据列表
    querySuccess(state, action) {
      return {
        ...state,
        data: action.payload,
        pagination: action.page
      }
    },
    //分页参数
    setPage(state, action) {
      return {
        ...state,
        pageindex: action.payload,
        pagesize: action.pageSize,
      }
    },
    //查询条件
    searchList(state, action) {
      return {
        ...state,
        searchList: action.payload,
      }
    },
  }
}
