import React from "react";
import { LocaleProvider } from "antd";
import PropTypes from "prop-types";
import { HashRouter as Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import App from "routes/app";
import zhCN from "antd/lib/locale-provider/zh_CN";

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import("./routes/00LoginAndHome/error")
  });
  const routes = [
    {
      path: "/login", //登录
      models: () => [import("./models/00LoginAndHome/login")],
      component: () => import("./routes/00LoginAndHome/login")
    },
    {
      path: "/home", //首页
      models: () => [import("./models/00LoginAndHome/home")],
      component: () => import("./routes/00LoginAndHome/home")
    },
    {
      path: "/devices", //设备管理
      models: () => [import("./models/01OperationsCenter/deviceManage")],
      component: () => import("./routes/01OperationsCenter/deviceManage")
    },
    {
      path: "/devicesDetail", //设备详情
      models: () => [import("./models/01OperationsCenter/deviceManage/deviceDetail")],
      component: () => import("./routes/01OperationsCenter/deviceManage/deviceDetail")
    },
    {
      path: "/devicesLogs", //设备日志
      models: () => [import("./models/01OperationsCenter/deviceManage/deviceLogs")],
      component: () => import("./routes/01OperationsCenter/deviceManage/deviceLogs")
    },
    {
      path: "/userFeedback", //用户反馈
      models: () => [import("./models/01OperationsCenter/feedback")],
      component: () => import("./routes/01OperationsCenter/feedback")
    },
    {
      path: "/appUsers", //APP用户管理
      models: () => [import("./models/01OperationsCenter/appUserManage")],
      component: () => import("./routes/01OperationsCenter/appUserManage")
    },
    {
      path: "/appUsersDetail", //用户详情
      models: () => [import("./models/01OperationsCenter/appUserManage/userDetail")],
      component: () => import("./routes/01OperationsCenter/appUserManage/userDetail")
    },
    {
      path: "/activeData", //激活数据
      models: () => [import("./models/02DataCenter/activeData")],
      component: () => import("./routes/02DataCenter/activeData")
    },
    {
      path: "/activelyData", //活跃数据
      models: () => [import("./models/02DataCenter/activelyData")],
      component: () => import("./routes/02DataCenter/activelyData")
    },
    {
      path: "/roleManagement", // 角色管理
      models: () => [import("./models/03RightsManagement/roleManage")],
      component: () => import("./routes/03RightsManagement/roleManage")
    },
    {
      path: "/roleAddEdit", // 新增或编辑角色
      models: () => [import("./models/03RightsManagement/roleManage/roleAddEdit")],
      component: () => import("./routes/03RightsManagement/roleManage/roleAddEdit")
    },
    {
      path: "/testAccount", //测试账号管理
      models: () => [import("./models/99Setting/testAccount")],
      component: () => import("./routes/99Setting/testAccount")
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routes.map(({ path, ...dynamics }, key) => (
              <Route key={key} exact path={path} component={dynamic({ app, ...dynamics })} />
            ))}
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
