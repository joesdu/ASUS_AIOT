const APIV1 = "/v1.0/back/";

let userToken = "";

const fu = () => {
  let _data = localStorage.getItem("userToken");
  console.log(_data);
  try {
    _data = JSON.parse(_data);
    userToken = _data.userToken;
  } catch (e) {}
};

module.exports = {
  userToken: userToken,
  serverService: "http://106.15.176.36",
  name: "",
  prefix: "antdAdmin",
  footerText: "A豆云平台 © 2019 ASUS",
  logo: "./images/logo.png",
  iconFontCSS: "./iconfont.css",
  iconFontJS: "./iconfont.js",
  CORS: [],
  openPages: ["/login"],
  apiPrefix: "/api/v1",
  apiUrl: "http://106.15.176.36" + APIV1,
  api: {
    //登录相关
    backUserLogin: "backUser/login",
    //反馈相关接口  Feedback Controller
    feedbackList: "feedback/list",
    feedbackUpdate: "feedback/update",
    //后台用户相关接口		User Controller
    userDetail: "user/detail",
    userList: "user/list",
    //后台设备相关接口		Device Controller
    deviceList: "device/list",
    deviceProductList: "device/productList",
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
