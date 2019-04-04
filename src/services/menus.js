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
        display: true
      },
      {
        icon: "table",
        name: "运营中心",
        id: 2,
        route: null,
        bpid: 0,
        mpid: 0,
        display: true
      },
      {
        route: "/devices",
        name: "设备管理",
        id: 21,
        mpid: 2,
        bpid: 2,
        display: true
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
        display: true
      },
      {
        route: "/appUsers",
        name: "APP用户管理",
        id: 23,
        bpid: 2,
        mpid: 2,
        display: true
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
        display: true
      },
      {
        route: "/activeData",
        name: "激活数据",
        id: 31,
        bpid: 3,
        mpid: 3,
        display: true
      },
      {
        route: "/activelyData",
        name: "活跃数据",
        id: 32,
        bpid: 3,
        mpid: 3,
        display: true
      },
      {
        icon: "table",
        name: "权限管理",
        id: 4,
        bpid: 0,
        mpid: 0,
        display: true
      },
      {
        route: "/personnelManagement",
        name: "人员管理",
        id: 41,
        mpid: 4,
        bpid: 4,
        display: true
      },
      {
        route: "/roleManagement",
        name: "角色管理",
        id: 42,
        mpid: 4,
        bpid: 4,
        display: true
      },
      {
        icon: "setting",
        name: "设置",
        id: 99,
        bpid: 0,
        mpid: 0,
        display: true
      },
      {
        route: "/testAccount",
        name: "测试账号管理",
        id: 991,
        mpid: 99,
        bpid: 99,
        display: true
      }
    ],
    isSuccess: true
  };
}
