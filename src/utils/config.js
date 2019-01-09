const APIV1 = "/v1.0/back/";

let userIds = "";
let username = "";

const fu = () => {
  let _data = localStorage.getItem("userData");
  console.log(_data);
  try {
    _data = JSON.parse(_data);
    userIds = _data.id;
    username = _data.username;
  } catch (e) {}
};

module.exports = {
  userIds: userIds,
  userName: username,
  urls: "http://service-shengshier.asus.com.cn/retail-backend-store/",
  serverService: "http://106.15.176.36",
  name: "",
  prefix: "antdAdmin",
  footerText: "A豆云平台 © 2018 ASUS",
  logo: "./images/logo.png",
  iconFontCSS: "./iconfont.css",
  iconFontJS: "./iconfont.js",
  CORS: [],
  openPages: ["/login"],
  apiPrefix: "/api/v1",
  apiUrl: "http://106.15.176.36" + APIV1,
  api: {
    //反馈相关接口  Feedback Controller
    feedbackList: "feedback/list",
    feedbackUpdate: "feedback/update",
    //后台用户相关接口		User Controller
    userDetail: "user/detail",
    userList: "user/list",
    //后台设备相关接口		Device Controller
    deviceList: "device/list",
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
