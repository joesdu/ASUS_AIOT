const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

let userIds=''
let storeIds =''
let username = ''

const fu = ()=>{
	let _data = localStorage.getItem('userData')
	console.log(_data)
	try{
		_data = JSON.parse(_data)
		userIds = _data.id
		storeIds = _data.storeId
		username = _data.username
	}catch(e){}
}

fu()

/*
	电商：retail-backend-store
	卡片：card-store-backend-store
*/

module.exports = {
	storeIds: storeIds,
	userIds: userIds,
	userName: username,
	urls:'http://service-shengshier.asus.com.cn/retail-backend-store/',
	serverService:'http://service-shengshier.asus.com.cn/retail-backend-store/',  //售后订单的
	name: '',
	prefix: 'antdAdmin',
	footerText: 'Ant Design Admin  © 2017 zuiidea',
	logo: './images/logo.png',
	iconFontCSS: './iconfont.css',
	iconFontJS: './iconfont.js',
	CORS: [],
	openPages: ['/login'],
	apiPrefix: '/api/v1',
	APIV1,
	APIV2,
	api: {
		userLogin: `${APIV1}/user/login`,
		userLogout: `${APIV1}/user/logout`,
		userInfo: `${APIV1}/userInfo`,
		users: `${APIV1}/users`,
		posts: `${APIV1}/posts`,
		user: `${APIV1}/user/:id`,
		dashboard: `${APIV1}/dashboard`,
		menus: `${APIV1}/menus`,
		weather: `${APIV1}/weather`,
		v1test: `${APIV1}/test`,
		v2test: `${APIV2}/test`,
	},
}
