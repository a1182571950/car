<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix"><span>添加管理员</span></div>
			<el-form :status-icon="true" :rules="rules" label-width="100px" :model="form" style="width: 500px;">
			  <el-form-item label="管理员帐号" prop="admin_name">
			    <el-input v-model="form.admin_name"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			    <el-input type="password" v-model="form.password"></el-input>
			  </el-form-item>
				<el-form-item label="头像">
					<el-upload
					  class="avatar-uploader"
						:headers="uploadHeaders"
					  :action="uploadUrl"
						name="avatar"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
				<el-form-item>
					<el-button @click="createAdmin" type="primary">立即创建</el-button>
					<el-button plain @click="resetForm">清空</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				form: {
					admin_name: '',
					password: '',
					avatarurl: '',
					status: true,
				},
				imageUrl: '',
				rules: {
					admin_name: [
						{required: true, message: '请输入管理员账号', trigger: 'blur'},
						{pattern: /^\S{5,16}$/, message: '账号5-16位,不含空格', trigger: 'blur'},
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{pattern: /^\S{6,32}$/, message: '密码6-32位,不含空格', trigger: 'blur'},
					],
				}
			}
		},
		computed: {
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/imgaddadmin'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			}
		},
		methods:{
			createAdmin() {
				for (let key in this.form){
					if (typeof this.form[key] === 'string') {
						this.form[key] = this.form[key].trim()
					}
				}
				if (!/^\S{5,16}$/.test(this.form.admin_name)) return this.$message.error('帐号在5-16位,不含空格')
				if (!/^\S{6,32}$/.test(this.form.password)) return this.$message.error('密码在6-32位,不含空格')
				this.axios.post('/admin/createadmin',this.form,{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return;
					this.resetForm()
				})
			},
			resetForm() {
				this.form = {
					admin_name: '',
					password: '',
					avatarurl: '',
					status: true,
				}
				this.imageUrl = ''
			},
			handleAvatarSuccess(res) {
				if (res.errorCode) return this.$message.error(res.msg)
				this.imageUrl = this.$C.webUrl+res.data;
				this.form.avatarurl = res.data
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style scoped="scoped">
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>
