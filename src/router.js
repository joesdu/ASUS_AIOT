import React from 'react'
import { LocaleProvider } from 'antd';
import PropTypes from 'prop-types'
import { HashRouter as Router, Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import zhCN from 'antd/lib/locale-provider/zh_CN';

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',//首页
      models: () => [import('./models/home')],
      component: () => import('./routes/dashboard'),
    },
    {
      path: '/login',//登录
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },
    {
      path: '/devices',//设备管理
      models: () => [import('./models/devices')],
      component: () => import('./routes/deviceManage/devices'),
    },
    {
      path: '/userFeedback',//用户反馈
      models: () => [import('./models/userFeedback')],
      component: () => import('./routes/feedback/userFeedback'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
