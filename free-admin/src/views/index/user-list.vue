<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>用户查询</span>
			</div>
			<div>
				<el-form size="mini" :inline="true" :model="form" class="demo-form-inline">
				  <el-form-item label="手机号码">
				    <el-input size="medium" v-model="form.phone" placeholder="手机号码"></el-input>
				  </el-form-item>
					<el-form-item label="用户名">
					  <el-input size="medium" v-model="form.username" placeholder="用户名"></el-input>
					</el-form-item>
				  <el-form-item label="用户状态">
				    <el-select size="medium" v-model="form.status" @change="getUserList">
							<el-option label="全部" value="2"></el-option>
				      <el-option label="禁用" value="0"></el-option>
				      <el-option label="正常" value="1"></el-option>
				    </el-select>
				  </el-form-item>
					<el-form-item label="创建时间">
					  <el-select size="medium" v-model="form.create_time" @change="getUserList">
							<el-option label="倒序" value="0"></el-option>
					    <el-option label="正序" value="1"></el-option>
					  </el-select>
					</el-form-item>
				  <el-form-item>
				    <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
				  </el-form-item>
					<el-form-item>
					  <el-button size="medium" plain @click="clearSearch">清空查询</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<!-- 用户列表 -->
		<el-table :data="userList"  style="width: 100%;margin-top: 30px;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="性别">
							<span>{{sexShow(props.row.sex)}}</span>
						</el-form-item>
						<el-form-item label="生日">
							<span>{{formatTime(props.row.birthday).substr(0,10)}}</span>
						</el-form-item>
						<el-form-item label="地址">
							<span>{{props.row.address}}</span>
						</el-form-item>
						<el-form-item label="微信昵称">
							<span>{{props.row.nickname}}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
			<el-table-column prop="phone" label="手机号" width="150"></el-table-column>
			<el-table-column label="头像" width="100" align="center">
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.userpic" class="rounded-circle" style="width: 75px;height: 75px;" draggable="false">
				</template>
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column label="创建时间">
				<template slot-scope="scope">
					{{formatTime(scope.row.create_time)}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					 <el-button @click="handleStatus(scope.row.id,scope.row.status,scope.$index)" :type="scope.row.status?'danger':'primary'" size="mini">{{scope.row.status?'禁用':'解锁'}}</el-button>
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
	export default {
		data() {
			return {
				form: {
					current: 1,
					phone: '',
					username: '',
					status: '2',
					create_time: '0',
					pageSize: 6
				},
				total: 0,
				userList: [],
			}
		},
		methods: {
			resetPassword(id){
				this.$confirm('您确定要重置该用户的密码吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/resetpassword',{id},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
					})
				}).catch(()=>{})
			},
			handleStatus(id,status,index) {
				let msg = ''
				if (status === 1) {
					msg = '禁用'
				} else {
					msg = '解锁'
				}
				this.$confirm('您确定要'+msg+'该用户吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/userstatus',{id,status},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.userList[index].status = status==1?0:1
					})
				}).catch(()=>{})
			},
			clearSearch() {
				this.form = {
					current: 1,
					phone: '',
					username: '',
					status: '2',
					create_time: '0',
					pageSize: 6
				}
				this.getUserList()
			},
			sexShow(val) {
				if (val==0) return '保密'
				if (val==1) return '男'
				if (val==2) return '女'
			},
			getUserList() {
				this.form.phone = this.form.phone.trim()
				this.form.phone = this.form.phone.replace(/\s+/g,' ')
				this.form.username = this.form.username.trim()
				this.form.username = this.form.username.replace(/\s+/g,' ')
				this.axios.post('/admin/getuserlist',this.form,{token:true,loading:true}).then(res=>{
					this.form.current = res.data.data.current
					this.total = res.data.data.total
					this.userList = res.data.data.list
				})
			},
			formatTime(time) {
				return this.$T.formatTime(time);
			},
			onSubmit() {
				this.getUserList()
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getUserList()
			}
		},
		created() {
			this.getUserList()
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
