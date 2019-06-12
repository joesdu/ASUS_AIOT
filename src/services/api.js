import config from "../utils/config";
import request from "../utils/request";
const { api, apiUrl } = config;

//后台用户相关
/*********** 新增用戶接口***********/
export async function backUserAddApi(params) {
  let _url = apiUrl + api.backUserAdd;
  return request(_url, { method: "POST", body: params });
}

/*********** 刪除用戶接口***********/
export async function backUserDeleteApi(params) {
  let _url = apiUrl + api.backUserDelete;
  return request(_url, { method: "POST", body: params });
}

/*********** 編輯用戶接口***********/
export async function backUserEditApi(params) {
  let _url = apiUrl + api.backUserEdit;
  return request(_url, { method: "POST", body: params });
}

/*********** 獲取用戶權限頁面***********/
export async function backUserGetAuthorityPageApi(params) {
  let _url = apiUrl + api.backUserGetAuthorityPage;
  return request(_url, { method: "POST", body: params });
}

/***********登录**********/
export async function backUserLoginApi(params) {
  let _url = apiUrl + api.backUserLogin;
  return request(_url, { method: "POST", body: params });
}

/*********** 退出登录***********/
export async function backUserLogoutApi(params) {
  let _url = apiUrl + api.backUserLogout;
  return request(_url, { method: "POST", body: params });
}

/*********** 用戶搜索接口***********/
export async function backUserSearchApi(params) {
  let _url = apiUrl + api.backUserSearch;
  return request(_url, { method: "POST", body: params });
}

//反馈相关接口
/***********用户反馈列表**********/
export async function feedbackListApi(params) {
  let _url = apiUrl + api.feedbackList;
  return request(_url, { method: "POST", body: params });
}

/***********用户反馈更新**********/
export async function feedbackUpdateApi(params) {
  let _url = apiUrl + api.feedbackUpdate;
  return request(_url, { method: "POST", body: params });
}

//后台用户相关接口
/***********后台用户详情**********/
export async function userDetailApi(params) {
  let _url = apiUrl + api.userDetail;
  return request(_url, { method: "POST", body: params });
}

/***********后台用户列表**********/
export async function userListApi(params) {
  let _url = apiUrl + api.userList;
  return request(_url, { method: "POST", body: params });
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

/***********设备详情**********/
export async function deviceDetailApi(params) {
  let _url = apiUrl + api.deviceDetail;
  return request(_url, { method: "POST", body: params });
}

//设备日志相关接口
/***********设备日志插入**********/
export async function deviceLogInsertApi(params) {
  let _url = apiUrl + api.deviceLogInsert;
  return request(_url, { method: "POST", body: params });
}

/***********设备日志列表**********/
export async function deviceLogListApi(params) {
  let _url = apiUrl + api.deviceLogList;
  return request(_url, { method: "POST", body: params });
}

//设备统计接口
/***********设备激活数据趋势**********/
export async function statsDeviceActivateApi(params) {
  let _url = apiUrl + api.statsDeviceActivate;
  return request(_url, { method: "POST", body: params });
}

/***********激活数据概况**********/
export async function statsDeviceActivateSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceActivateSummary;
  return request(_url, { method: "POST", body: params });
}

/***********活跃数据趋势**********/
export async function statsDeviceActiveApi(params) {
  let _url = apiUrl + api.statsDeviceActive;
  return request(_url, { method: "POST", body: params });
}

/***********活跃数据概况**********/
export async function statsDeviceActiveSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceActiveSummary;
  return request(_url, { method: "POST", body: params });
}

/***********区域统计**********/
export async function statsDeviceAreaApi(params) {
  let _url = apiUrl + api.statsDeviceArea;
  return request(_url, { method: "POST", body: params });
}

/***********数据概况**********/
export async function statsDeviceSummaryApi(params) {
  let _url = apiUrl + api.statsDeviceSummary;
  return request(_url, { method: "POST", body: params });
}

//測試賬號管理
/***********刪除測試賬號**********/
export async function backTestUserDeleteApi(params) {
  let _url = apiUrl + api.backTestUserDelete;
  return request(_url, { method: "POST", body: params });
}

/***********測試賬號詳情**********/
export async function backTestUserDetailApi(params) {
  let _url = apiUrl + api.backTestUserDetail;
  return request(_url, { method: "POST", body: params });
}

/***********測試賬號列表**********/
export async function backTestUserListApi(params) {
  let _url = apiUrl + api.backTestUserList;
  return request(_url, { method: "POST", body: params });
}

/***********添加測試賬號**********/
export async function backTestUserSaveApi(params) {
  let _url = apiUrl + api.backTestUserSave;
  return request(_url, { method: "POST", body: params });
}

/***********更新測試賬號**********/
export async function backTestUseUpdateApi(params) {
  let _url = apiUrl + api.backTestUseUpdate;
  return request(_url, { method: "POST", body: params });
}

//角色管理
/***********新增角色接口**********/
export async function authorityAddApi(params) {
  let _url = apiUrl + api.authorityAdd;
  return request(_url, { method: "POST", body: params });
}

/***********全部權限**********/
export async function authorityAllPagesApi(params) {
  let _url = apiUrl + api.authorityAllPages;
  return request(_url, { method: "POST", body: params });
}

/***********刪除角色接口**********/
export async function authorityDeleteApi(params) {
  let _url = apiUrl + api.authorityDelete;
  return request(_url, { method: "POST", body: params });
}

/***********編輯角色接口**********/
export async function authorityEditApi(params) {
  let _url = apiUrl + api.authorityEdit;
  return request(_url, { method: "POST", body: params });
}

/***********角色列表接口**********/
export async function authorityListApi(params) {
  let _url = apiUrl + api.authorityList;
  return request(_url, { method: "POST", body: params });
}

/***********角色搜索接口**********/
export async function authoritySearchApi(params) {
  let _url = apiUrl + api.authoritySearch;
  return request(_url, { method: "POST", body: params });
}