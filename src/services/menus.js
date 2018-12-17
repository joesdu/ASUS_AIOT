import { config } from 'utils'

const { api } = config

//得到菜单数据
export async function query() {
  //let _url = urls+'login/menu.do?' + stringify(params)
  //return request(_url)
  return {
    "msg": "提交成功!",
    "code": 0,
    "data": [{
      "route": "/dashboard",
      "bpid": 0,
      "icon": "dashboard",
      "name": "首页",
      "id": 1,
      "mpid": 0
    },
    {
      "route": null,
      "bpid": 0,
      "icon": "table",
      "name": "运营中心",
      "id": 2,
      "mpid": 0
    },
    {
      "route": '/devices',
      "bpid": 2,
      "icon": "",
      "name": "设备管理",
      "id": 21,
      "mpid": 2
    },
    {
      "route": '/userFeedback',
      "bpid": 2,
      "icon": "",
      "name": "用户反馈",
      "id": 22,
      "mpid": 2
    },
    {
      "route": '/appUsers',
      "bpid": 2,
      "icon": "",
      "name": "APP用户管理",
      "id": 23,
      "mpid": 2
    },
    {
      "route": null,
      "bpid": 0,
      "icon": "table",
      "name": "数据中心",
      "id": 3,
      "mpid": 0
    },
    {
      "route": '/dataOverview',
      "bpid": 3,
      "icon": "",
      "name": "数据概况",
      "id": 31,
      "mpid": 3
    },
    {
      "route": '/activeData',
      "bpid": 3,
      "icon": "",
      "name": "激活数据",
      "id": 32,
      "mpid": 3
    },
    {
      "route": '/activelyData',
      "bpid": 3,
      "icon": "",
      "name": "活跃数据",
      "id": 33,
      "mpid": 3
    },
    ],
    "userName": "huashuo_AUV",
    "isSuccess": true
  }
}
