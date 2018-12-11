import request from '../utils/request'
import config from '../utils/config'
const { api,urls } = config
const { user, userLogout, userLogin } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

//查找用户
export async function query (params) {
  return request(urls+'login/login.do')
}
