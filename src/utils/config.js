const APIV1 = '/v1.0/back/'

let userIds=''
let username = ''

const fu = ()=>{
	let _data = localStorage.getItem('userData')
	console.log(_data)
	try{
		_data = JSON.parse(_data)
		userIds = _data.id
		username = _data.username
	}catch(e){}
}
/*
	电商：retail-backend-store
	卡片：card-store-backend-store
*/

module.exports = {
	userIds: userIds,
	userName: username,
	urls: 'http://service-shengshier.asus.com.cn/retail-backend-store/',
	serverService:'http://106.15.176.36',
	name: '',
	prefix: 'antdAdmin',
	footerText: 'Ant Design Admin  © 2018 zuiidea',
	logo: './images/logo.png',
	iconFontCSS: './iconfont.css',
	iconFontJS: './iconfont.js',
	CORS: [],
	openPages: ['/login'],
	apiPrefix: '/api/v1',
	apiUrl: urls + APIV1,
	api: {
		//反馈相关接口  Feedback Controller		
		feedbackList: 'feedback/list',//用户反馈列表
		feedbackUpdate: 'feedback/update',//用户反馈更新
		
		//后台用户相关接口		User Controller
		userDetail: 'user/detail',//后台用户详情
		userList: 'user/list',//后台用户列表
		
		//后台设备相关接口		Device Controller
		deviceList: 'device/list',//后台设备列表
		
		//设备日志相关接口		Device Log Controller
		deviceLogInsert: 'deviceLog/insert',//设备日志新增插入,在该项目中暂时无需使用
		deviceLogList: 'deviceLog/list',//设备日志列表
		
		//设备统计接口		Stats Device Controller
		statsDeviceActivate: 'statsDevice/activate',//设备激活数据趋势
		statsDeviceActivateSummary: 'statsDevice/activateSummary',//激活数据概况
		statsDeviceActive: 'statsDevice/active',//活跃数据趋势
		statsDeviceActiveSummary: 'statsDevice/activeSummary',//活跃数据概况
		statsDeviceArea: 'statsDevice/area',//区域统计
		statsDeviceSummary: 'statsDevice/summary',//数据概况

		
	}
}
