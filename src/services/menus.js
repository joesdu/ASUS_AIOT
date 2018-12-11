import { request, config } from 'utils'

const { api,urls } = config
const { menus } = api
import { stringify } from 'qs';

//得到菜单数据
export async function query (params) {
	//let _url = urls+'login/menu.do?' + stringify(params)
	//return request(_url)
	return {"msg":"提交成功!","code":0,
		"data": [{
        "route": "/dashboard", 
        "bpid": 0, 
        "icon": "home", 
        "name": "首页", 
        "id": 1, 
        "mpid": 0
    },  
    {
        "route": null, 
        "bpid": 0, 
        "icon": "setting", 
        "name": "运营中心", 
        "id": 2, 
        "mpid": 0
    }, 
	{
        "route": '/userSystem', 
        "bpid": 2, 
        "icon": "setting", 
        "name": "设备管理", 
        "id": 21, 
        "mpid": 2
    }],
	"userName":"huashuo_AUV","isSuccess":true}
}



