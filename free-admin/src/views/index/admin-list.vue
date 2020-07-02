<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>卡片名称</span></div>
			<el-form label-width="120px" :model="form" :inline="true">
				<el-form-item label="管理员账号" >
					<el-input v-model="form.admin_name"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-select v-model="form.create_time" @change="getAdminList">
					    <el-option label="倒序" value="0"></el-option>
							<el-option label="正序" value="1"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getAdminList">查询</el-button>
					<el-button @click="resetSearch" plain>还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-table class="mt-3" :data="list">
			<el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
			<el-table-column align="center" label="管理员账号" prop="admin_name"></el-table-column>
			<el-table-column align="center" label="头像">
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.avatarurl" style="width: 80px;height: 80px;" class="rounded-circle">
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button @click="changeStatus(scope.row.id,scope.row.status,scope.$index)" :type="scope.row.status?'danger':'primary'" size="mini">{{scope.row.status?'禁用':'解锁'}}</el-button>
					<el-button @click="resetPassword(scope.row.id)" type="success" size="mini">重置密码</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<div style="height: 80px;"></div>
		<div class="position-fixed border-top d-flex align-items-center bg-white" style="bottom: 0;left: 200px;right: 0;height: 60px;z-index: 100;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="form.current" :page-size="form.pageSize" layout="prev, pager, next, jumper" :total="total"></el-pagination>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				form: {
					admin_name: '',
					current: 1,
					pageSize: 6,
					create_time: '0'
				},
				total: 0,
				list: [],
			}
		},
		computed:{
			...mapState(['admin']),
		},
		methods: {
			resetSearch() {
				this.form = {
					admin_name: '',
					current: 1,
					pageSize: 6,
					create_time: '0'
				}
				this.getAdminList()
			},
			resetPassword(id) {
				if (id ===1) return this.$message.error('您无法对最高权限管理员进行修改')
				this.$confirm('您确定要重置该管理员的密码吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/resetadminpassword',{id},{token:true,loading:true}).then(res=>{
						if (id == this.admin['id']) {
							this.$message('您重置了登陆管理员密码,请重新登陆')
							this.axios.get('/admin/logout',{token:true,loading:true}).then(res=>{
								if (res.data.errCode) return this.$message.error(res.data.msg) 
								this.$router.push({name:'login'})
							})
							this.$store.commit('logout')
						} else {
							this.$message(res.data.msg)
						}
					})
				}).catch(()=>{})
			},
			changeStatus(id,status,index) {
				if (id ===1) return this.$message.error('您无法对最高权限管理员进行修改')
				let msg = ''
				if (status === 1) {
					msg = '禁用'
				} else {
					msg = '解锁'
				}
				this.$confirm('您确定要'+msg+'该管理员吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/adminstatus',{id,status},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.list[index].status = status==1?0:1
					})
				}).catch(()=>{})
			},
			getAdminList() {
				this.axios.post('/admin/getadminlist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.form.current = res.data.data.current
					this.total = res.data.data.total
				})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getAdminList()
			}
		},
		created() {
			this.getAdminList()
		}
	}
</script>

<style>
</style>
