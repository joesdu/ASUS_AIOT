const APIV1 = "/v1.0/back/";

const test = 0;
const formal = 1;
const current = test;
const IP = current === test ? "http://106.15.176.36" : "https://139.224.168.3";

let userToken = localStorage.getItem("userToken");
let userName = localStorage.getItem("userName");

const fu = () => {
  try {
  } catch (e) { }
};

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
    statsDeviceSummary: "statsDevice/summary"
  }
};
