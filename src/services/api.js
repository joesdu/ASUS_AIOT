import config from '../utils/config'
import request from '../utils/request';
import request2 from '../utils/request2';
import { stringify } from 'qs';
import $ from 'jquery'
const { api,urls, serverUrl,serverService } = config
const { user } = api


//商品库,查询条件
export async function queryKuSearch (params) {
  let _url = urls+'goodsManage/goodsinfo.do?' + stringify(params)
  return request(_url)
}

//登录-提交
export async function login (params) {
	//let _url = urls+'login/login.do?' + stringify(params)
    //return request(_url)
    let _url = serverService+'login/login.do'
    return request(_url,{
	    method: 'POST',
	    body: params
    })
}

//退出登录
export async function logout (params) {
   let _url = urls+'login/adminLoginOut.do?' + stringify(params)
   return request(_url)
}

/***********系统设置***********/
//商户后台-员工管理-ilst
export async function userSystem (params) {
	let _url = serverService+'storeManager/getManagerList.do?' + stringify(params)
	return request(_url)
}





