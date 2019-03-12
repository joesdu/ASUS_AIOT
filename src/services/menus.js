//得到菜单数据
export async function query() {
  return {
    msg: "提交成功!",
    code: 0,
    data: [
      {
        route: "/dashboard",
        icon: "dashboard",
        name: "首页",
        id: 1,
        bpid: 0,
        mpid: 0
      },
      {
        icon: "table",
        name: "运营中心",
        id: 2,
        route: null,
        bpid: 0,
        mpid: 0
      },
      {
        route: "/devices",
        name: "设备管理",
        id: 21,
        mpid: 2,
        bpid: 2
      },
      {
        route: "/userFeedback",
        name: "用户反馈",
        id: 22,
        bpid: 2,
        mpid: 2
      },
      {
        route: "/appUsers",
        name: "APP用户管理",
        id: 23,
        bpid: 2,
        mpid: 2
      },
      {
        icon: "table",
        name: "数据中心",
        bpid: 0,
        mpid: 0,
        id: 3
      },
      {
        route: "/activeData",
        name: "激活数据",
        id: 31,
        bpid: 3,
        mpid: 3
      },
      {
        route: "/activelyData",
        name: "活跃数据",
        id: 32,
        bpid: 3,
        mpid: 3
      }
    ],
    isSuccess: true
  };
}
