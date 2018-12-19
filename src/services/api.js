import config from '../utils/config'
import request from '../utils/request';
import request2 from '../utils/request2';
import { stringify } from 'qs';
import $ from 'jquery'
const { api, urls, serverService } = config

//登录-提交
export async function login(params) {
  //let _url = urls+'login/login.do?' + stringify(params)
  //return request(_url)
  let _url = urls + 'login/login.do'
  return request(_url, {
    method: 'POST',
    body: params
  })
}

//退出登录
export async function logout(params) {
  let _url = urls + 'login/adminLoginOut.do?' + stringify(params)
  return request(_url)
}

//运营中心
/***********运营中心-设备管理-list***********/
export async function devicesListApi(params) {
  let _url = serverService + api.deviceList;
  return request(_url, {
    method: 'POST',
    body: params
  })
};





