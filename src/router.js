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
    component: () => import("./routes/error")
  });
  const routes = [
    {
      path: "/login", //登录
      models: () => [import("./models/login")],
      component: () => import("./routes/login")
    },
    {
      path: "/dashboard", //首页
      models: () => [import("./models/dataOverview")],
      component: () => import("./routes/dataOverview")
    },
    {
      path: "/devices", //设备管理
      models: () => [import("./models/deviceManage")],
      component: () => import("./routes/deviceManage")
    },
    {
      path: "/devicesDetail", //设备详情
      models: () => [import("./models/deviceManage/deviceDetail")],
      component: () => import("./routes/deviceManage/deviceDetail")
    },
    {
      path: "/devicesLogs", //设备日志
      models: () => [import("./models/deviceManage/deviceLogs")],
      component: () => import("./routes/deviceManage/deviceLogs")
    },
    {
      path: "/userFeedback", //用户反馈
      models: () => [import("./models/feedback")],
      component: () => import("./routes/feedback")
    },
    {
      path: "/appUsers", //APP用户管理
      models: () => [import("./models/appUserManage")],
      component: () => import("./routes/appUserManage")
    },
    {
      path: "/appUsersDetail", //用户详情
      models: () => [import("./models/appUserManage/userDetail")],
      component: () => import("./routes/appUserManage/userDetail")
    },
    {
      path: "/activeData", //激活数据
      models: () => [import("./models/activeData")],
      component: () => import("./routes/activeData")
    },
    {
      path: "/activelyData", //活跃数据
      models: () => [import("./models/activelyData")],
      component: () => import("./routes/activelyData")
    },
    {
      path: "/testAccount", //测试账号管理
      models: () => [import("./models/testAccount")],
      component: () => import("./routes/testAccount")
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
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
