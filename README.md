# xxxx

<div align="center"><img src="https://s3.bmp.ovh/imgs/2021/12/3c6ddcf3877171c9.png"/></div>
<div align="center"><h3 align="center">快速开发平台</h3></div>
<div align="center"><h3 align="center">基于Gin前后端分离架构，代码精简，开箱即用，前端紧随前沿 Vue3.0 + TypeScript + vite2 + Element-plus技术</h3></div>


## 🌈平台简介

* 采用前后端分离的模式，后端采用GO语言，通过对GIn自封装框架ginx，代码更简洁，逻辑更清晰
* 前端采用VUE3.0+ TypeScript + vite2 + Element-plus：适配手机、平板、pc 内置多种ui功能减少开发量
* 高效率的开发，使用代码生成器可以一键生成前后端代码，可在线预览代码，减少代码开发量。。
* 完善的权限认证系统：完善的权限认证系统，包含，菜单按钮权限，api权限，部门权限。
* 多数据库：项目同时支持MySQL，PostgreSql等数据库根据自身需求更改。



更多功能请访问系统体验



## ⚡ 内置功能

1.  _用户管理：用户是系统操作者，该功能主要完成系统用户配置。_
2.  _部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。_
3.  _岗位管理：配置系统用户所属担任职务。_
4.  _菜单管理：配置系统菜单，操作权限，按钮权限标识等。_
5.  _角色管理：角色菜单,API权限分配、设置角色按机构进行数据范围权限划分。_
6.  _字典管理：对系统中经常使用的一些较为固定的数据进行维护。_
7.  _参数管理：对系统动态配置常用参数。_
8.  通知公告：系统通知公告信息发布维护。
9.  操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
10. _登录日志：系统登录日志记录查询包含登录异常。_
11. 在线用户：当前系统中活跃用户状态监控。
12. _定时任务：在线（添加、修改、删除)任务调度包含执行结果日志。_
13. _代码生成：前后端代码的生成（go、vue、sql）支持CRUD下载 。_
14. 系统接口：根据业务代码自动生成相关的api接口文档。
15. _服务监控：监视当前系统CPU、内存、磁盘、堆栈等相关信息。_

---
前端工程结构
---

```
├── src
│   ├── api                  # Api ajax 等
│   ├── assets               # 本地静态资源
│   ├── i18n                 # 国际化
│   ├── components           # 业务通用组件
│   ├── layout               # layout
│   ├── theme                # css主题样式
│   ├── router               # Vue-Router
│   ├── store                # Vuex
│   ├── utils                # 工具库
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   └── main.ts              # Vue 入口 TS
├── README.md
└── package.json
```

## 后端工程结构

| 项目 | 说明 |
| --- | --- |
| `base` | 自封装ginx和工具类 |
| `docs` | api接口文档 |
| `initialize` | 初始化 |
| `resource` | 文件导出目录 |
| `static` | 前端代码构建 |
| `system` | 系统模块 |

更多功能请访问系统。

## 🍉 开发计划

* :clipboard: 代码生成器
* :clipboard: 资源文件管理中心
* :clipboard: 任务调度系统
* :clipboard: 监控系统
* :clipboard: 移动开发平台-基于uniapp
* :clipboard: 工作流
* :clipboard: 大屏系统
* :clipboard: 报表系统

## 官网

  www.xxx.com
  
## 鸣谢


---
版权说明
---

* 

