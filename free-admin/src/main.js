import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import { Message } from 'element-ui'

let loading = null
let requestCount = 0
// 显示loading
function showLoading() {
	if (requestCount===0) {
		loading = Message({
			message: '加载中...',
			duration:0
		})
	}
	requestCount++
}
// 隐藏loading
function hideLoading() {
	if (requestCount>0) {
		requestCount--
	}
	if (loading && requestCount===0) {
		loading.close()
	}
}

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	let token = window.sessionStorage.getItem('token')
	if (config.token === true) {
		config.headers['token'] = token
	}
	if (config.loading === true) {
		showLoading()
	}
	return config;
}, function (error) {
	hideLoading()
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((response)=>{
	hideLoading()
	return response
},(err)=>{
	hideLoading()
	return Promise.reject(err)
})


// 引入全局配置文件
import $conf from './common/config/config.js'
Vue.prototype.$conf = $conf

import $T from './common/my_func/time.js'
Vue.prototype.$T = $T

import $C from './common/config/url_config.js'
Vue.prototype.$C = $C

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
