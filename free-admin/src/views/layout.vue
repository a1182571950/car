<template>
	<div>
		<el-container style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;">
		  <el-header class="d-flex align-items-center" style="background-color: #545c64;">
				<span class="h5 text-white mb-0 mr-auto" style="user-select: none;font-size: 28px;">{{$conf.logo}}</span>
				<el-menu
				  :default-active="navBar.active"
				  mode="horizontal"
				  @select="handleSelect"
				  background-color="#545c64"
				  text-color="#fff"
				  active-text-color="#ffd04b">
				  <el-menu-item :index="index|numToStr" v-for="(item,index) in navBar.list" :key="index">{{item.name}}</el-menu-item>
					<el-submenu index="100">
					  <template slot="title">
							<el-avatar size="medium" :src="$C.webUrl+admin.avatarurl"></el-avatar>
							{{admin.admin_name}}
						</template>
					  <el-menu-item index="100-1">修改</el-menu-item>
					  <el-menu-item index="100-2">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-header>
		  <el-container style="height: 100%;">
				<!-- 侧边布局 -->
		    <el-aside width="200px">
					<el-menu :default-active="slideMenuActive" @select="slideSelect" style="height: 100%;">
						<el-menu-item :index="index|numToStr" v-for="(item,index) in slideMenus" :key="index">
							<i :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 主布局 -->
		    <el-main class="bg-light" style="padding-bottom: 60px;position: relative;">
					<!-- 面包屑导航 -->
					<div v-if="bran.length" class="mb-3 border-bottom bg-white" style="padding: 20px;margin: -20px;">
						<el-breadcrumb separator-class="el-icon-arrow-right">
						  <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in bran" :key="index">{{item.title}}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<!-- 主内容 -->
					<router-view></router-view>
					<!-- 返回顶部 -->
					<el-backtop target=".el-main" :bottom="100"></el-backtop>
				</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import common from '@/common/mixins/common.js'
	export default {
		mixins: [common],
		data() {
			return {
				navBar: [],
				bran: []
			}
		},
		computed:{
			...mapState(['admin']),
			slideMenuActive: {
				get() {
					return this.navBar.list[this.navBar.active].subActive || '0'
				},
				set(val) {
					this.navBar.list[this.navBar.active].subActive = val
				}
			},
			slideMenus() {
				return this.navBar.list[this.navBar.active].submenu || []
			}
		},
		watch:{
			'$route'(to,from) {
				// 本地存储
				localStorage.setItem('navActive',JSON.stringify({
					top: this.navBar.active,
					left: this.slideMenuActive,
				}))
				this.getRouterBran()
			}
		},
		methods: {
			handleSelect(key) {
				if (key === '100-1') {
					return this.$router.push({name:'index_admin-edit'})
				}
				if (key === '100-2') {
					return this.logout()
				}
				this.navBar.active = key
				// 默认跳转到当前激活
				this.slideMenuActive = '0'
				if (this.slideMenus.length) {
					this.$router.push({
						name:this.slideMenus[this.slideMenuActive].pathname
					})
				}
			},
			slideSelect(key, keyPath) {
				this.slideMenuActive = key
				// 跳转到指定页面
				this.$router.push({name:this.slideMenus[key].pathname})
			}, 
			// 获取面包屑导航
			getRouterBran() {
				let b = this.$route.matched.filter(v=>v.name)
				let arr = []
				b.forEach((v,k)=>{
					// 过滤layout和index
					if(v.name==='index' || v.name==='layout') return
					arr.push({
						name: v.name,
						path: v.path,
						title: v.meta.title
					})
				})
				if (arr.length) {
					arr.unshift({name:'index',path:'/index',title:'后台首页'})
				}
				this.bran = arr
			},
			__initNavBar() {
				let r = localStorage.getItem('navActive')
				if (r) {
					r = JSON.parse(r)
					this.navBar.active = r.top
					this.slideMenuActive = r.left
				}
			},
			// 退出登陆
			logout() {
				this.$confirm('您确定要退出吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.get('/admin/logout',{token:true,loading:true}).then(res=>{
						if (res.data.errCode) return this.$message.error(res.data.msg) 
						this.$message('退出成功')
						this.$router.push({name:'login'})
					})
					this.$store.commit('logout')
				}).catch(()=>{})
			}
		},
		created() {
			this.navBar = this.$conf.navBar
			this.getRouterBran()
			// 初始化选中菜单
			this.__initNavBar()
		}
	}
</script>

<style>
	
</style>
