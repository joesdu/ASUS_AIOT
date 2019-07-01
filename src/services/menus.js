import utils from "../utils";

//得到菜单数据
export async function query() {
  return {
    msg: "提交成功!",
    code: 0,
    data: [
      {
        route: "/home",
        icon: "dashboard",
        name: "首页",
        id: 1,
        bpid: 0,
        mpid: 0,
        display: utils.inPages("1")
      },
      {
        icon: "table",
        name: "运营中心",
        id: 2,
        route: null,
        bpid: 0,
        mpid: 0,
        display: utils.inPages("2")
      },
      {
        route: "/devices",
        name: "设备管理",
        id: 21,
        mpid: 2,
        bpid: 2,
        display: utils.inPages("6")
      },
      {
        route: "/devicesLogs",
        name: "日志",
        id: 211,
        mpid: 21,
        bpid: 21,
        display: false
      },
      {
        route: "/devicesDetail",
        name: "设备详情",
        id: 212,
        mpid: 21,
        bpid: 21,
        display: false
      },
      {
        route: "/userFeedback",
        name: "用户反馈",
        id: 22,
        bpid: 2,
        mpid: 2,
        display: utils.inPages("7")
      },
      {
        route: "/appUsers",
        name: "APP用户管理",
        id: 23,
        bpid: 2,
        mpid: 2,
        display: utils.inPages("8")
      },
      {
        route: "/appUsersDetail",
        name: "用户详情",
        id: 231,
        mpid: 23,
        bpid: 23,
        display: false
      },
      {
        icon: "table",
        name: "数据中心",
        bpid: 0,
        mpid: 0,
        id: 3,
        display: utils.inPages("3")
      },
      {
        route: "/activeData",
        name: "激活数据",
        id: 31,
        bpid: 3,
        mpid: 3,
        display: utils.inPages("9")
      },
      {
        route: "/activelyData",
        name: "活跃数据",
        id: 32,
        bpid: 3,
        mpid: 3,
        display: utils.inPages("10")
      },
      {
        icon: "table",
        name: "权限管理",
        id: 4,
        bpid: 0,
        mpid: 0,
        display: utils.inPages("4")
      },
      {
        route: "/personManage",
        name: "人员管理",
        id: 41,
        mpid: 4,
        bpid: 4,
        display: utils.inPages("11")
      },
      {
        route: "/roleManagement",
        name: "角色管理",
        id: 42,
        mpid: 4,
        bpid: 4,
        display: utils.inPages("12")
      },
      {
        route: "/roleAdd",
        name: "新增角色",
        id: 421,
        mpid: 42,
        bpid: 42,
        display: false
      },
      {
        route: "/roleEdit",
        name: "编辑角色",
        id: 422,
        mpid: 42,
        bpid: 42,
        display: false
      },
      {
        icon: "setting",
        name: "设置",
        id: 99,
        bpid: 0,
        mpid: 0,
        display: utils.inPages("5")
      },
      {
        route: "/testAccount",
        name: "测试账号管理",
        id: 991,
        mpid: 99,
        bpid: 99,
        display: utils.inPages("13")
      }
    ],
    isSuccess: true
  };
}
