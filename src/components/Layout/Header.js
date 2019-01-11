import React, { PureComponent } from 'react';
import { Layout, Icon, Dropdown, Spin, Menu, Avatar, Popover } from 'antd';
import styles from './header.less';
import HeaderSearch from '../HeaderSearch';
import NoticeIcon from '../NoticeIcon';
import classnames from 'classnames'

import config from '../../utils/config'
const { userName } = config
const { Header } = Layout;

const header = ({
  user, logout, switchSider, siderFold
}) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={handleClickMenu}>
      {/* <Menu.Item><Icon type="user" />个人中心</Menu.Item>
      <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
    </Menu>
  )
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        className={styles.trigger}
        type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })}
        onClick={switchSider}
      />
      <div className={styles.right}>
        {/* <HeaderSearch
          
          className={`${styles.action} ${styles.search}`}
          placeholder="站内搜索"
          dataSource={['提示一', '提示二', '提示三']}
          onSearch={(value) => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={(value) => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <NoticeIcon
          className={styles.action}
          popupAlign={{ offset: [20, -16] }}
          count={6}
        >
        </NoticeIcon> */}
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src='./images/head.png' />
            <span className={styles.name}>{userName}</span>
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default header
