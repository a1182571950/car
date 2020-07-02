<template>
	<div class="login-wrapper">
		<!-- <el-button type="primary" @click="log" :loading="loading">{{loading?'登陆中':'立即登陆'}}</el-button> -->
		<el-card class="box-card log-main" shadow="always">
			<div class="log-title py-3">
				<img src="../../assets/img/login/log-title.png" draggable="false">
			</div>
			<el-form @keyup.enter.native="log" label-position="left" label-width="80px" :model="form" :rules="rules" >
			  <el-form-item label="账号" prop="admin_name">
			    <el-input v-model="form.admin_name"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			    <el-input type="password" v-model="form.password"></el-input>
			  </el-form-item>
				<el-form-item label-width="0">
				  <el-button class="w-100" type="primary" :loading="loading" @click="log">{{loading?'登陆中':'立即登陆'}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				loading: false,
				form: {
					admin_name: '',
					password: '',
				},
				rules: {
					admin_name: [
						{required: true, message: '请输入管理员账号', trigger: 'blur'},
						{ min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' },
					],
					password: [
						{required: true, message: '请输入管理员密码', trigger: 'blur'},
						{ min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' },
					]
				}
			}
		},
		methods: {
			log() {
				this.form.admin_name = this.form.admin_name.trim()
				if (!/^\S{5,16}$/.test(this.form.admin_name)) return this.$message.error('管理员账号在5-16位,不含空格')
				this.form.password = this.form.password.trim()
				if (!/^\S{6,32}$/.test(this.form.password)) return this.$message.error('密码在6-32位,不含空格')
				this.loading = true
				this.axios.post('/admin/login',this.form).then(res=>{
					this.loading = false
					if(res.data.errorCode) return this.$message.error(res.data.msg)
					this.$store.commit('login',res.data.data)
					this.$message('登陆成功')
					this.$router.push({name:'index'})
				}).catch(err=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style scoped>
	.login-wrapper{
		position: fixed;
		background: url(../../assets/img/login/login-bg.jpg) no-repeat;
		background-size: 100% 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.log-main{
		width: 400px;
	}
	.log-title{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
