import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { queryArray } from 'utils'
import styles from './Layout.less'

const pathToRegexp = require('path-to-regexp');
const Bread = ({ menu, location }) => {
  // 匹配当前路由
  let pathArray = []
  let current
  let _name2 = location.pathname.indexOf('/', location.pathname.indexOf('/') + 1)
  let temp = ''

  for (let index in menu) {
    //賽選正则匹配
    if (menu[index].route && pathToRegexp(menu[index].route).exec(location.pathname)) {
      current = menu[index]
      break
    }
  }

  if (_name2 > 0) {
    temp = location.pathname.substring(0, _name2)
    for (let index in menu) {
      if (menu[index].route && pathToRegexp(menu[index].route).exec(temp)) {
        current = menu[index]
        break
      }
    }
  }

  const getPathArray = (item) => {
    pathArray.unshift(item)
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'))
    }
  }

  let paramMap = {}
  
  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    })
    /*pathArray.push({
      id: 404,
      name: 'Not Found',
    })*/
  } else {
    getPathArray(current)

    let keys = []
    let values = pathToRegexp(current.route, keys).exec(location.pathname.replace('#', ''))
    if (keys.length) {
      keys.forEach((currentValue, index) => {
        if (typeof currentValue.name !== 'string') {
          return
        }
        paramMap[currentValue.name] = values[index + 1]
      })
    }
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
        ? <Icon type={item.icon} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={pathToRegexp.compile(item.route || '')(paramMap) || '#'}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
      <div style={{ marginLeft: "14.5px", fontSize: "20px", fontStyle: { fontcolor: "#FFFFFF" }, fontFamily: "Microsoft YaHei UI" }}>{pathArray[pathArray.length-1].name}</div>
    </div>
  )
}

export default Bread
