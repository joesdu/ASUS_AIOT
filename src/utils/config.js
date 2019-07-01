const APIV1 = "/v1.0/back/";

const test = "http://106.15.176.36";
const official = "https://adol.asus.com.cn";

const edition = "test";
const serverService = edition === "test" ? test : official;

let userToken = localStorage.getItem("userToken");
let userName = localStorage.getItem("userName");
let userNickName = localStorage.getItem("nickName");
let headImg = localStorage.getItem("headImg");
let pages = localStorage.getItem("pages").split(',')

module.exports = {
  edition: edition,
  userToken: userToken,
  userName: userName,
  userNickName: userNickName,
  headImg: headImg,
  pages: pages,
  serverService: serverService,
  name: "",
  prefix: "antdAdmin",
  footerText: "A豆云平台 © 2019 ASUS",
  logo: "./images/logo.svg",
  iconFontCSS: "./iconfont.css",
  iconFontJS: "./iconfont.js",
  CORS: [],
  openPages: ["/login"],
  apiPrefix: "/api/v1",
  apiUrl: serverService + APIV1,
  api: {
    //后台用户
    backUserAdd: "backUser/add",
    backUserDelete: "backUser/delete",
    backUserEdit: "backUser/edit",
    backUserGetAuthorityPage: "backUser/getAuthorityPages",
    backUserLogin: "backUser/login",
    backUserLogout: "backUser/logout",
    backUserSearch: "backUser/search",
    //反馈相关接口  Feedback Controller
    feedbackList: "feedback/list",
    feedbackUpdate: "feedback/update",
    //后台用户相关接口		User Controller
    userDetail: "user/detail",
    userList: "user/list",
    //后台设备相关接口		Device Controller
    deviceDelete: "device/delete",
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
    backTestUseUpdate: "backTestUser/update",
    //角色管理
    authorityAdd: "authority/add",
    authorityAllPages: "authority/allPages",
    authorityCheckDelete: "authority/checkDelete",
    authorityDelete: "authority/delete",
    authorityEdit: "authority/edit",
    authorityList: "authority/list",
    authoritySearch: "authority/search"
  }
};
//   Swagger:       http://106.15.176.36:9008/swagger-ui.html#/*