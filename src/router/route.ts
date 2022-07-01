import { RouteRecordRaw } from 'vue-router';

/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      auth：          当前路由权限标识（多个请用逗号隔开），最后转成数组格式，用于与当前用户权限进行对比，控制路由显示、隐藏
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义静态路由
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('/@/views/demo/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/demo/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
		},
	},
	/**
	 * 提示：写在这里的为全屏界面，不建议写在这里
	 * 请写在 `dynamicRoutes` 路由数组中
	 */
	{
		path: '/visualizingDemo1',
		name: 'visualizingDemo1',
		component: () => import('/@/views/demo/visualizing/demo1.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo1',
		},
	},
	{
		path: '/visualizingDemo2',
		name: 'visualizingDemo2',
		component: () => import('/@/views/demo/visualizing/demo2.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo2',
		},
	},
];

/**
 * 静态页面路由，就是“案例演示”即下面英文demo菜单下所有子菜单等，这里前端写死，后端不控制
 * 如果不要这个，可以在加载静态路由staticPageRoutes的地方，注释掉（src\router\index.ts）
 * @returns 返回路由菜单数据
 */
export const staticPageRoutes: Array<RouteRecordRaw> = [
	{
		path: '/demo',
		name: 'demo',
		component: () => import('/@/layout/routerView/parent.vue'),
		redirect: '/fun/tagsView',
		meta: {
			title: 'message.router.demo',
			isLink: '',
			isHide: false,
			isKeepAlive: true,
			isAffix: true,
			isIframe: false,
			icon: 'iconfont icon-diannao',
		},
		children: [
			{
				path: '/fun', //目录
				name: 'funIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/fun/tagsView',
				meta: {
					title: 'message.router.funIndex',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'iconfont icon-crew_feature',
				},
				children: [
					{
						// 菜单路径，用于跳转
						path: '/fun/tagsView',
						// 菜单 name，用于界面 keep-alive 路由缓存。
  						// 此 name 需要与 component 组件中的 name 值相同（唯一）
						name: 'funTagsView',
						// 组件路径
						component: () => import('/@/views/demo/fun/tagsView/index.vue'),
						// 附加自定义数据
						meta: {
							 // 菜单标题（国际化写法）
							title: 'message.router.funTagsView',
							// 菜单外链链接
    						// 开启外链条件，`1、isLink: true 2、链接地址不为空（meta.isLink） 3、isIframe: false`
							isLink: '',
							// 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
							isHide: false,
							// 菜单是否缓存
							isKeepAlive: true,
							// 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
							isAffix: false,
							// 是否内嵌
    						// 开启条件，`1、isIframe: true 2、链接地址不为空（meta.isLink）`
							isIframe: false,
							//当前路由权限标识（多个请用逗号隔开），最后转成数组格式，用于与当前用户权限进行对比，控制路由显示、隐藏
							auth: ['base'],
							//icon：   菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
							icon: 'el-icon-thumb',
						},
					},
					{
						path: '/fun/countup',
						name: 'funCountup',
						component: () => import('/@/views/demo/fun/countup/index.vue'),
						meta: {
							title: 'message.router.funCountup',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-odometer',
						},
					},
					{
						path: '/fun/echartsTree',
						name: 'funEchartsTree',
						component: () => import('/@/views/demo/fun/tree/index.vue'),
						meta: {
							title: 'message.router.funEchartsTree',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-connection',
						},
					},
					{
						path: '/fun/selector',
						name: 'funSelector',
						component: () => import('/@/views/demo/fun/selector/index.vue'),
						meta: {
							title: 'message.router.funSelector',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-xuanzeqi',
						},
					},
					{
						path: '/fun/noticeBar',
						name: 'funNoticeBar',
						component: () => import('/@/views/demo/fun/noticeBar/index.vue'),
						meta: {
							title: 'message.router.funNoticeBar',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-bell',
						},
					},
					{
						path: '/fun/wangEditor',
						name: 'funWangEditor',
						component: () => import('/@/views/demo/fun/wangEditor/index.vue'),
						meta: {
							title: 'message.router.funWangEditor',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-fuwenbenkuang',
						},
					},
					{
						path: '/fun/cropper',
						name: 'funCropper',
						component: () => import('/@/views/demo/fun/cropper/index.vue'),
						meta: {
							title: 'message.router.funCropper',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-caijian',
						},
					},
					{
						path: '/fun/qrcode',
						name: 'funQrcode',
						component: () => import('/@/views/demo/fun/qrcode/index.vue'),
						meta: {
							title: 'message.router.funQrcode',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-ico',
						},
					},
					{
						path: '/fun/echartsMap',
						name: 'funEchartsMap',
						component: () => import('/@/views/demo/fun/echartsMap/index.vue'),
						meta: {
							title: 'message.router.funEchartsMap',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-ditu',
						},
					},
					{
						path: '/fun/printJs',
						name: 'funPrintJs',
						component: () => import('/@/views/demo/fun/printJs/index.vue'),
						meta: {
							title: 'message.router.funPrintJs',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-printer',
						},
					},
					{
						path: '/fun/clipboard',
						name: 'funClipboard',
						component: () => import('/@/views/demo/fun/clipboard/index.vue'),
						meta: {
							title: 'message.router.funClipboard',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-document-copy',
						},
					},
					{
						path: '/fun/screenShort',
						name: 'funScreenShort',
						component: () => import('/@/views/demo/fun/screenShort/index.vue'),
						meta: {
							title: 'message.router.funScreenShort',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-crop',
						},
					},
					{
						path: '/fun/gridLayout',
						name: 'funGridLayout',
						component: () => import('/@/views/demo/fun/gridLayout/index.vue'),
						meta: {
							title: 'message.router.funGridLayout',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-tuodong',
						},
					},
					{
						path: '/fun/splitpanes',
						name: 'funSplitpanes',
						component: () => import('/@/views/demo/fun/splitpanes/index.vue'),
						meta: {
							title: 'message.router.funSplitpanes',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon--chaifenlie',
						},
					},
					{
						path: '/fun/dragVerify',
						name: 'funDragVerify',
						component: () => import('/@/views/demo/fun/dragVerify/index.vue'),
						meta: {
							title: 'message.router.funDragVerify',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-s-promotion',
						},
					},
				],
			},
			{
				path: '/pages',
				name: 'pagesIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/pages/filtering',
				meta: {
					title: 'message.router.pagesIndex',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'iconfont icon-fuzhiyemian',
				},
				children: [
					{
						path: '/pages/filtering',
						name: 'pagesFiltering',
						component: () => import('/@/views/demo/pages/filtering/index.vue'),
						meta: {
							title: 'message.router.pagesFiltering',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-sell',
						},
						/**
						 * 注意此处详情写法：
						 * 1、嵌套进父级里时，面包屑显示为：首页/页面/过滤筛选组件/过滤筛选组件详情
						 * 2、不嵌套进父级时，面包屑显示为：首页/页面/过滤筛选组件/过滤筛选组件详情
						 * 3、想要父级不高亮，面包屑显示为：首页/页面/过滤筛选组件详情，设置路径为：/pages/filteringDetails
						 */
						children: [
							{
								path: '/pages/filtering/details',
								name: 'pagesFilteringDetails',
								component: () => import('/@/views/demo/pages/filtering/details.vue'),
								meta: {
									title: 'message.router.pagesFilteringDetails',
									isLink: '',
									isHide: true,
									isKeepAlive: false,
									isAffix: false,
									isIframe: false,
									auth: ['base'],
									icon: 'el-icon-s-order',
								},
							},
						],
					},
					{
						path: '/pages/filtering/details1',
						name: 'pagesFilteringDetails1',
						component: () => import('/@/views/demo/pages/filtering/details1.vue'),
						meta: {
							title: 'message.router.pagesFilteringDetails1',
							isLink: '',
							isHide: true,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-s-order',
						},
					},
					{
						path: '/pages/iocnfont',
						name: 'pagesIocnfont',
						component: () => import('/@/views/demo/pages/iocnfont/index.vue'),
						meta: {
							title: 'message.router.pagesIocnfont',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-present',
						},
					},
					{
						path: '/pages/element',
						name: 'pagesElement',
						component: () => import('/@/views/demo/pages/element/index.vue'),
						meta: {
							title: 'message.router.pagesElement',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-platform-eleme',
						},
					},
					{
						path: '/pages/awesome',
						name: 'pagesAwesome',
						component: () => import('/@/views/demo/pages/awesome/index.vue'),
						meta: {
							title: 'message.router.pagesAwesome',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-set-up',
						},
					},
					{
						path: '/pages/cityLinkage',
						name: 'pagesCityLinkage',
						component: () => import('/@/views/demo/pages/cityLinkage/index.vue'),
						meta: {
							title: 'message.router.pagesCityLinkage',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-jiliandongxuanzeqi',
						},
					},
					{
						path: '/pages/formAdapt',
						name: 'pagesFormAdapt',
						component: () => import('/@/views/demo/pages/formAdapt/index.vue'),
						meta: {
							title: 'message.router.pagesFormAdapt',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-biaodan',
						},
					},
					{
						path: '/pages/formI18n',
						name: 'pagesFormI18n',
						component: () => import('/@/views/demo/pages/formI18n/index.vue'),
						meta: {
							title: 'message.router.pagesFormI18n',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-diqiu',
						},
					},
					{
						path: '/pages/formRules',
						name: 'pagesFormRules',
						component: () => import('/@/views/demo/pages/formRules/index.vue'),
						meta: {
							title: 'message.router.pagesFormRules',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-shuxing',
						},
					},
					{
						path: '/pages/listAdapt',
						name: 'pagesListAdapt',
						component: () => import('/@/views/demo/pages/listAdapt/index.vue'),
						meta: {
							title: 'message.router.pagesListAdapt',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-chazhaobiaodanliebiao',
						},
					},
					{
						path: '/pages/waterfall',
						name: 'pagesWaterfall',
						component: () => import('/@/views/demo/pages/waterfall/index.vue'),
						meta: {
							title: 'message.router.pagesWaterfall',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-zidingyibuju',
						},
					},
					{
						path: '/pages/steps',
						name: 'pagesSteps',
						component: () => import('/@/views/demo/pages/steps/index.vue'),
						meta: {
							title: 'message.router.pagesSteps',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-step',
						},
					},
					{
						path: '/pages/preview',
						name: 'pagesPreview',
						component: () => import('/@/views/demo/pages/preview/index.vue'),
						meta: {
							title: 'message.router.pagesPreview',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-15tupianyulan',
						},
					},
					{
						path: '/pages/waves',
						name: 'pagesWaves',
						component: () => import('/@/views/demo/pages/waves/index.vue'),
						meta: {
							title: 'message.router.pagesWaves',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-bolangneng',
						},
					},
					{
						path: '/pages/tree',
						name: 'pagesTree',
						component: () => import('/@/views/demo/pages/tree/index.vue'),
						meta: {
							title: 'message.router.pagesTree',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/pages/drag',
						name: 'pagesDrag',
						component: () => import('/@/views/demo/pages/drag/index.vue'),
						meta: {
							title: 'message.router.pagesDrag',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-thumb',
						},
					},
					{
						path: '/pages/lazyImg',
						name: 'pagesLazyImg',
						component: () => import('/@/views/demo/pages/lazyImg/index.vue'),
						meta: {
							title: 'message.router.pagesLazyImg',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-picture-outline',
						},
					},
					{
						path: '/pages/dynamicForm',
						name: 'pagesDynamicForm',
						component: () => import('/@/views/demo/pages/dynamicForm/index.vue'),
						meta: {
							title: 'message.router.pagesDynamicForm',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-diannao',
						},
					},
					{
						path: '/pages/workflow',
						name: 'pagesWorkflow',
						component: () => import('/@/views/demo/pages/workflow/index.vue'),
						meta: {
							title: 'message.router.pagesWorkflow',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'el-icon-connection',
						},
					},
				],
			},
			{
				path: '/visualizing',
				name: 'visualizingIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/visualizing/visualizingLinkDemo1',
				meta: {
					title: 'message.router.visualizingIndex',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'el-icon-data-line',
				},
				children: [
					{
						path: '/visualizing/visualizingLinkDemo1',
						name: 'visualizingLinkDemo1',
						component: () => import('/@/layout/routerView/link.vue'),
						meta: {
							title: 'message.router.visualizingLinkDemo1',
							isLink: `http://localhost:7789/#/visualizingDemo1`,
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-caozuo-wailian',
						},
					},
					{
						path: '/visualizing/visualizingLinkDemo2',
						name: 'visualizingLinkDemo2',
						component: () => import('/@/layout/routerView/link.vue'),
						meta: {
							title: 'message.router.visualizingLinkDemo2',
							isLink: `http://localhost:7789/#/visualizingDemo2`,
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							auth: ['base'],
							icon: 'iconfont icon-caozuo-wailian',
						},
					},
				],
			},
			{
				path: '/chart',
				name: 'chartIndex',
				component: () => import('/@/views/demo/chart/index.vue'),
				meta: {
					title: 'message.router.chartIndex',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'iconfont icon-ico_shuju',
				},
			},

			{
				path: '/tools',
				name: 'tools',
				component: () => import('/@/views/demo/tools/index.vue'),
				meta: {
					title: 'message.router.tools',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'iconfont icon-gongju',
				},
			},
			{
				path: '/link',
				name: 'layoutLinkView',
				component: () => import('/@/layout/routerView/link.vue'),
				meta: {
					title: 'message.router.layoutLinkView',
					isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					auth: ['base'],
					icon: 'iconfont icon-caozuo-wailian',
				},
			},
			{
				path: '/iframes',
				name: 'layoutIfameView',
				component: () => import('/@/layout/routerView/iframes.vue'),
				meta: {
					title: 'message.router.layoutIfameView',
					//isLink: 'https://gitee.com/PandaAdmin/PandaX',
					isLink: 'https://www.gdjtypt.com/a/b.htm?n=121.47851524333117&t=31.23930212345954',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: true,
					auth: ['base'],
					icon: 'iconfont icon-neiqianshujuchucun',
				},
			},
		]
	},
]