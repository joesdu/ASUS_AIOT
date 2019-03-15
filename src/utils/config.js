const APIV1 = "/v1.0/back/";

const test = "http://106.15.176.36";
const formal = "https://139.224.168.3";
const current = "https://adol.asus.com.cn";
const IP = current;

let userToken = localStorage.getItem("userToken");
let userName = localStorage.getItem("userName");

module.exports = {
  userToken: userToken,
  userName: userName,
  serverService: IP,
  name: "",
  prefix: "antdAdmin",
  footerText: "A豆云平台 © 2019 ASUS",
  logo: "./images/logo.png",
  iconFontCSS: "./iconfont.css",
  iconFontJS: "./iconfont.js",
  CORS: [],
  openPages: ["/login"],
  apiPrefix: "/api/v1",
  apiUrl: IP + APIV1,
  api: {
    //登录相关
    backUserLogin: "backUser/login",
    backUserLogout: "backUser/logout",
    //反馈相关接口  Feedback Controller
    feedbackList: "feedback/list",
    feedbackUpdate: "feedback/update",
    //后台用户相关接口		User Controller
    userDetail: "user/detail",
    userList: "user/list",
    //后台设备相关接口		Device Controller
    deviceList: "device/list",
    deviceProductList: "device/productList",
    deviceDetail: "device/detail",
    //设备日志相关接口		Device Log Controller
    deviceLogInsert: "deviceLog/insert",
    deviceLogList: "deviceLog/list",
    //设备统计接口		Stats Device Controller
    statsDeviceActivate: "statsDevice/activate",
    statsDeviceActivateSummary: "statsDevice/activateSummary",
    statsDeviceActive: "statsDevice/active",
    statsDeviceActiveSummary: "statsDevice/activeSummary",
    statsDeviceArea: "statsDevice/area",
    statsDeviceSummary: "statsDevice/summary",
    //测试账号管理    Back Test User Controller
    backTestUserDelete: "backTestUser/delete",
    backTestUserDetail: "backTestUser/detail",
    backTestUserList: "backTestUser/list",
    backTestUserSave: "backTestUser/save",
    backTestUseUpdate: "backTestUser/update"
  }
};
//   Swagger:       http://106.15.176.36:9008/swagger-ui.html#/