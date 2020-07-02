import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../common/config/router.js'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

let router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
	let token = window.sessionStorage.getItem('token')
	if (token) {
		// 防止重复登陆
		if (to.path === '/login'){
			Vue.prototype.$message.error('请不要重复登陆')
			return next({name:from.name?from.name:'index'})
		}
		next();
	} else {
		if(to.path==='/login'){
			return next();
		}
		// 未登录
		Vue.prototype.$message.error('请先登录')
		next({path:'/login'})
	}
})

export default router
