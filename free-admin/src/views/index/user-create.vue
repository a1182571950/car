<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>创建用户</span>
			</div>
			<div class="d-flex">
				<el-form :status-icon="true" :rules="rules" label-width="80px" :model="form" style="width: 500px;">
				  <el-form-item label="手机号" prop="phone">
				    <el-input v-model="form.phone"></el-input>
				  </el-form-item>
				  <el-form-item label="用户名" prop="username">
				    <el-input v-model="form.username"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input type="password" v-model="form.password"></el-input>
				  </el-form-item>
					<el-form-item label="邮箱" prop="email">
					  <el-input v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload :limit="1" ref="upload" :action="uploadUrl" name="avatar" :headers="uploadHeaders" :data="form" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess" :on-change="changeImgFile" :on-remove="removeImgFile">
						  <el-button size="small" type="primary">点击上传</el-button>
						  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="状态">
					  <el-switch
					    v-model="form.status"
					    active-color="#13ce66"
					    inactive-color="#ccc"
					    active-text="正常"
					    inactive-text="禁用">
					  </el-switch>
					</el-form-item>
				</el-form>
				<el-form  label-width="80px" :model="form" style="width: 400px;">
				  <el-form-item label="性别">
				    <el-select v-model="form.sex" placeholder="请选择">
							<el-option label="保密" value="0"></el-option>
							<el-option label="男" value="1"></el-option>
							<el-option label="女" value="2"></el-option>
						</el-select>
				  </el-form-item>
				  <el-form-item label="生日">
				    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
				  </el-form-item>
				  <el-form-item label="地址">
				    <el-input v-model="form.address"></el-input>
				  </el-form-item>
				</el-form>
				
			</div>
			<div class="pl-4">
				<el-button type="primary" @click="createUser">立即创建</el-button>
				<el-button type="success" @click="resetForm">清空</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				form: {
					phone: '',
					username: '',
					password: '',
					email: '',
					userpic: '',
					status: true,
					sex: '0',
					birthday: '',
					address: '',
					imgFile: '',
				},
				imageUrl: '',
				rules: {
					phone: [
						{required: true, message: '请输入手机号', trigger: 'blur'},
						{pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'},
					],
					username: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{pattern: /^\S{2,10}$/, message: '用户名2-10位,不含空格', trigger: 'blur'},
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{pattern: /^\S{6,32}$/, message: '密码6-32位,不含空格', trigger: 'blur'},
					],
					email: [
						{pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, message: '请输入正确的邮箱', trigger: 'blur'},
					]
				}
			}
		},
		computed:{
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/createuser'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			}
		},
		methods: {
			resetForm () {
				this.form = {
					phone: '',
					username: '',
					password: '',
					email: '',
					userpic: '',
					status: true,
					sex: '0',
					birthday: '',
					address: '',
					imgFile: '',
				}
				this.$refs.upload.clearFiles()
			},
			createUser(){
				for (let key in this.form){
					if (typeof this.form[key] === 'string') {
						this.form[key] = this.form[key].trim()
					}
				}
				if (!/^1[3456789]\d{9}$/.test(this.form.phone)) return this.$message.error('手机号格式不正确')
				if (!/^\S{5,16}$/.test(this.form.username)) return this.$message.error('用户名在5-16位,不含空格')
				if (!/^\S{6,32}$/.test(this.form.password)) return this.$message.error('密码在6-32位,不含空格')
				if (this.form.email && !/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(this.form.email)) return this.$message.error('邮箱格式不正确')
				if (this.form.address && this.form.address.length>50) return this.$message.error('地址最多50个字')
				if (this.form.birthday) {
					this.form.birthday = this.form.birthday.getTime()/1000
				}
				if (this.form.imgFile) {
					this.$refs.upload.submit()
				} else {
					this.axios.post('/admin/createuser',this.form,{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg);
						if(res.data.errorCode) return;
						this.form = {
							phone: '',
							username: '',
							password: '',
							email: '',
							userpic: '',
							status: true,
							sex: '0',
							birthday: '',
							address: '',
							imgFile: '',
						}
						this.$refs.upload.clearFiles()
					})
				}
			},
			removeImgFile(file) {
				this.form.imgFile = ''
			},
			changeImgFile(file){
				this.form.imgFile = file
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
				this.$message(res.msg);
				if(res.errorCode) return;
				this.form = {
					phone: '',
					username: '',
					password: '',
					email: '',
					userpic: '',
					status: true,
					sex: '0',
					birthday: '',
					address: '',
					imgFile: '',
				}
				this.$refs.upload.clearFiles()
			}
		}
	}
</script>

<style scoped>
	
</style>
