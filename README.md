演示地址 <http://antd-admin.zuiidea.com>

### 目录结构
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件，编译时copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置

-   项目打包后如何部署？ [#269](https://github.com/zuiidea/antd-admin/issues/269)
-   如何做权限管理？ [#384](https://github.com/zuiidea/antd-admin/issues/384)
-   如何使用mock.js模拟接口，怎么使用线上接口？ [#348](https://github.com/zuiidea/antd-admin/issues/348)
-   如何使用Iconfont，如何使用本地的svg图标？ [#270](https://github.com/zuiidea/antd-admin/issues/270)
-   怎么按版本打包，上线时不影响正在访问的用户？ [#449](https://github.com/zuiidea/antd-admin/issues/449)
-   windows处理CRLF？[参考](http://blog.csdn.net/lysc_forever/article/details/42835203)

