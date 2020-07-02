import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		token: '',
		admin: {},
	},
	mutations: {
		login(state,val) {
			window.sessionStorage.setItem('token',val.token)
			window.sessionStorage.setItem('admin',JSON.stringify(val))
			state.admin = val
			state.token = val.token
		},
		initAdmin(state){
			let admin = window.sessionStorage.getItem('admin')
			if (admin) {
				state.admin = JSON.parse(admin)
				state.token = admin.token
			}
		},
		logout(state) {
			window.sessionStorage.clear()
			state.user = {}
			state.token = ''
		}
	}
})
