<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>帐号设置</span>
			</div>
			<el-form :inline="true" :model="form" :rules="rules">
			  <el-form-item label="管理员帐号" prop="admin_name">
			    <el-input style="width: 300px;" v-model="form.admin_name" placeholder="管理员帐号"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" style="width: 110px;" @click="editAdminName">修改</el-button>
			  </el-form-item>
			</el-form>
		</el-card>
		<el-row :gutter="20" class="mt-3">
			<el-col :span="12">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>密码修改</span>
					</div>
					<el-form :model="form" :rules="rules">
					  <el-form-item label="旧密码" prop="old_password">
					    <el-input type="password" v-model="form.old_password" placeholder="旧密码"></el-input>
					  </el-form-item>
						<el-form-item label="新密码" prop="new_password">
						  <el-input type="password" v-model="form.new_password" placeholder="新密码"></el-input>
						</el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="editPassword">修改密码</el-button>
					  </el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card" style="height: 384px;">
					<div slot="header" class="clearfix">
						<span>头像修改</span>
					</div>
					<div class="d-flex justify-content-center align-items-center">
						<img :src="$C.webUrl+admin.avatarurl" class="rounded-circle mr-5" style="width: 130px;height: 130px;" draggable="false">
						<el-upload name="avatar" :headers="uploadHeaders" :before-upload="beforeAvatarUpload" drag :action="uploadUrl" :on-success="uploadSuccess">
						  <i class="el-icon-upload"></i>
						  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2mb</div>
						</el-upload>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				form: {
					admin_name:'',
					old_password: '',
					new_password: '',
				},
				rules: {
					admin_name: [
						{required: true, message: '请输入管理员账号', trigger: 'blur'},
						{ min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' },
					],
					old_password: [
						{required: true, message: '请输入管理员密码', trigger: 'blur'},
						{ min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' },
					],
					new_password: [
						{required: true, message: '请输入管理员密码', trigger: 'blur'},
						{ min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' },
					],
				}
			}
		},
		computed:{
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/avatar'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			}
		},
		methods: {
			editPassword() {
				if (!/^\S{6,32}$/.test(this.form.old_password) || !/^\S{6,32}$/.test(this.form.new_password)) return this.$message.error('管理员密码在6-32位,不含空格')
				if (this.form.old_password === this.form.new_password) return this.$message('两次密码输入一致,请重新输入')
				this.axios.post('/admin/editpassword',{old_password:this.form.old_password,new_password:this.form.new_password},{token:true,loading:true}).then(res=>{
					if (res.data.errorCode) return this.$message(res.data.msg)
					this.$message('成功修改密码,请重新登陆')
					this.axios.get('/admin/logout',{token:true,loading:true}).then(res=>{
						if (res.data.errCode) return this.$message.error(res.data.msg) 
					})
					this.$store.commit('logout')
					this.$router.push({name:'login'})
				})
			},
			editAdminName() {
				this.form.admin_name = this.form.admin_name.trim()
				if (!/^\S{5,16}$/.test(this.form.admin_name)) return this.$message.error('管理员帐号在5-16位,不含空格')
				this.axios.post('/admin/editadminname',{admin_name:this.form.admin_name},{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return 
					this.$store.commit('login',res.data.data)
				})
			},
			beforeAvatarUpload(file) {
				const typeFlag = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!typeFlag) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return typeFlag && isLt2M;
			},
			uploadSuccess(res) {
				this.$store.commit('login',res.data)
			}
		},
		created() {
			this.form.admin_name = this.admin.admin_name
		}
	}
</script>

<style>
</style>
