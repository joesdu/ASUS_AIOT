import config from "../utils/config";
import request from "../utils/request";
import { stringify } from "qs";
import $ from "jquery";
const { api, urls, apiUrl } = config;

//登录相关
/***********登录**********/
export async function login(params) {
  //let _url = urls+'login/login.do?' + stringify(params)
  //return request(_url)
  let _url = urls + "login/login.do";
  return request(_url, {
    method: "POST",
    body: params
  });
}

/*********** 退出登录***********/
export async function logout(params) {
  let _url = urls + "login/adminLoginOut.do?" + stringify(params);
  return request(_url);
}

//反馈相关接口
/***********用户反馈列表**********/
export async function feedbackListApi(params) {
  let _url = apiUrl + api.feedbackList;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********用户反馈更新**********/
export async function feedbackUpdateApi(params) {
  let _url = apiUrl + api.feedbackUpdate;
  return request(_url, {
    method: "POST",
    body: params
  });
}

//后台用户相关接口
/***********后台用户详情**********/
export async function userDetailApi(params) {
  let _url = apiUrl + api.userDetail;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********后台用户列表**********/
export async function userListApi(params) {
  let _url = apiUrl + api.userList;
  return request(_url, {
    method: "POST",
    body: params
  });
}

//后台设备相关接口
/***********后台设备列表**********/
export async function devicesListApi(params) {
  let _url = apiUrl + api.deviceList;
  return request(_url, { method: "POST", body: params });
}

/***********产品列表**********/
export async function deviceProductListApi(params) {
  let _url = apiUrl + api.deviceProductList;
  return request(_url, { method: "POST", body: params });
}

//设备日志相关接口
/***********设备日志插入**********/
export async function deviceLogInsertApi(params) {
  let _url = apiUrl + api.deviceLogInsert;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********设备日志列表**********/
export async function deviceLogListApi(params) {
  let _url = apiUrl + api.deviceLogList;
  return request(_url, {
    method: "POST",
    body: params
  });
}

//设备统计接口
/***********设备激活数据趋势**********/
export async function statsDeviceActivateApi(params) {
  let _url = apiUrl + api.statsDeviceActivate;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********激活数据概况**********/
export async function statsDeviceActivateSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceActivateSummary;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********活跃数据趋势**********/
export async function statsDeviceActiveApi(params) {
  let _url = apiUrl + api.statsDeviceActive;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********活跃数据概况**********/
export async function statsDeviceActiveSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceActiveSummary;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********区域统计**********/
export async function statsDeviceAreaApi(params) {
  let _url = apiUrl + api.statsDeviceArea;
  return request(_url, {
    method: "POST",
    body: params
  });
}

/***********数据概况**********/
export async function statsDeviceSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceSummary;
  return request(_url, {
    method: "POST",
    body: params
  });
}
