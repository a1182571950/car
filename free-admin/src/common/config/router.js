let routes = [
	{
		path:'/',
		component: 'layout',
		name: 'layout',
		redirect: {name:'index'},
		children:[
			{
				meta: {title:'后台首页'},
				component: 'index/index'
			},
			{
				meta: {title:'用户列表'},
				component: 'index/user-list'
			},
			{
				meta: {title:'添加用户'},
				component: 'index/user-create'
			},
			{
				meta: {title:'机构列表'},
				component: 'index/org-list'
			},
			{
				meta: {title:'机构审核'},
				component: 'index/check'
			},
			{
				meta: {title:'管理员列表'},
				component: 'index/admin-list'
			},
			{
				meta: {title:'添加管理员'},
				component: 'index/admin-create'
			},
			{
				meta: {title:'管理员设置'},
				component: 'index/admin-edit'
			},
			{
				meta: {title:'活动列表'},
				component: 'act/list'
			},
			{
				meta: {title:'活动列表'},
				component: 'act/edit'
			},
			{
				meta: {title:'活动图片'},
				component: 'act/img'
			},
			{
				meta: {title:'添加活动'},
				component: 'act/create'
			},
			{
				meta: {title:'活动评论'},
				component: 'act/comment'
			},
			{
				meta: {title:'知识列表'},
				component: 'topic/list'
			},
			{
				meta: {title:'添加知识'},
				component: 'topic/create'
			},
			{
				meta: {title:'编辑知识'},
				component: 'topic/edit'
			},
			{
				meta: {title:'编辑题目'},
				component: 'topic/question'
			},
			{
				meta: {title:'捐赠列表'},
				component: 'donate/list'
			},
			{
				meta: {title:'等级管理'},
				component: 'donate/grade'
			},
			{
				meta: {title:'测试页面'},
				component: 'index/test'
			},
			{
				meta: {title:'活动用户'},
				component: 'act/act-user',
				path: '/act/act-user/:id/:name',
			},
			{
				meta: {title:'活动捐赠'},
				component: 'donate/donate-act',
			}
		]
	},
	{
		meta: {title:'管理员登陆'},
		component: 'login/index'
	},
	{
		path:'*',
		redirect: {name:'index'},
	}
]

// 获取路由信息方法
let getRoutes = function() {
	// 生成路由详细信息
	createRoute(routes)
	return routes
}

// 自动生成路由
function createRoute(arr) {
	for(let i=0;i<arr.length;i++){
		if (!arr[i].component) break
		// 生成name
		let val = getValue(arr[i].component)
		arr[i].name = arr[i].name || val.replace(/\//g,'_')
		// 生成path
		arr[i].path = arr[i].path || `/${val}`
		// 自动生成component
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = ()=>componentFun
		if (arr[i].children && arr[i].children.length>0) {
			createRoute(arr[i].children)
		}
	}
}

// 去除index
function getValue(str) {
	// 获取最后一个 / 的索引
	let index = str.lastIndexOf('/')
	// 获取最后一个 / 后面的值
	let val = str.substring(index+1,str.length)
	// 判断是不是index结尾
	if (val === 'index') {
		return str.substring(index,-1)
	}
	return str
}

export default getRoutes()