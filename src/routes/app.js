/* global window */
/* global document */
import React from "react";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import pathToRegexp from "path-to-regexp";
import { connect } from "dva";
import { Loader, MyLayout } from "components";
import { BackTop, Layout } from "antd";
import { config } from "utils";
import { Helmet } from "react-helmet";
import { withRouter } from "dva/router";
import Error from "./error";
import "../themes/index.less";
import "./app.less";

const { Content, Footer, Sider } = Layout;
const { Header, Bread, styles } = MyLayout;
const { prefix, openPages } = config;

let lastHref;

const App = ({ children, dispatch, app, loading, location }) => {
  let { userName, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu } = app;
  let { pathname } = location;
  pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const { iconFontJS, iconFontCSS } = config;
  const current = menu.filter(item =>
    pathToRegexp(item.route || "").exec(pathname)
  );
  //查看当前 href 是否在menu中
  //const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  //判断是否在router.js中
  const hasPermission = true;
  const { href } = window.location;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }
  const headerProps = {
    menu,
    userName,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: "app/switchMenuPopover" });
    },
    logout() {
      let _arr = { userToken: localStorage.getItem("userToken") }
      dispatch({ type: 'app/logout', payload: _arr })
    },
    switchSider() {
      dispatch({ type: "app/switchSider" });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: "app/handleNavOpenKeys", payload: { navOpenKeys: openKeys } });
    }
  };

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: "app/switchTheme" });
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: "app/handleNavOpenKeys", payload: { navOpenKeys: openKeys } });
    }
  };

  const breadProps = { menu, location };

  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        <Loader fullScreen spinning={loading.effects["app/query"]} />
        {children}
      </div>
    );
  }

  return (
    <div>
      <Loader fullScreen spinning={loading.effects["app/query"]} />
      <Helmet>
        <title>A豆云平台后台系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>

      <Layout>
        {!isNavbar && (
          <Sider trigger={null} collapsible collapsed={siderFold} width="256">
            {siderProps.menu.length === 0 ? null : (
              <MyLayout.Sider {...siderProps} />
            )}
          </Sider>
        )}
        <Layout style={{ height: "100vh", overflow: "scroll" }} id="mainContainer">
          <BackTop target={() => document.getElementById("mainContainer")} />
          <Header {...headerProps} />
          <Content className={styles.content}>
            <Bread {...breadProps} />
            {hasPermission ? children : <Error />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object
};

export default withRouter(
  connect(({ app, loading }) => ({ app, loading }))(App)
);
