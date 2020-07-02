<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix"><span>添加科普知识</span></div>
			<el-form :model="form" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="封面">
					<el-upload
						class="avatar-uploader"
						:headers="uploadHeaders"
						:action="uploadUrl"
						name="cover"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="内容">
					<tinymce v-model="form.content"></tinymce>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addTopic">立即添加</el-button>
					<el-button plain @click="resetForm">清空</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import tinymce from '../../components/common/tinymce.vue'
	export default {
		components: {tinymce},
		data() {
			return {
				form: {
					name: '',
					cover: '',
					content: '',
				},
				imageUrl: '',
			}
		},
		computed: {
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/imgtopiccover'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			}
		},
		methods: {
			resetForm() {
				this.form = {
					name: '',
					cover: '',
					content: '',
				}
				this.imageUrl = ''
			},
			addTopic() {
				for (let key in this.form){
					if (typeof this.form[key] === 'string') {
						this.form[key] = this.form[key].trim()
					}
				}
				if (!/^\S{2,16}$/.test(this.form.name)) return this.$message.error('名称在2-16位,不含空格')
				if (!this.form.cover) return this.$message.error('您未上传封面')
				if (!this.form.content) return this.$message.error('您未填写内容')
				this.axios.post('/admin/addtopic',this.form,{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return;
					this.resetForm()
				})
			},
			handleAvatarSuccess(res) {
				if (res.errorCode) return this.$message.error(res.msg)
				this.imageUrl = this.$C.webUrl+res.data;
				this.form.cover = res.data
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

<style scoped>
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
		width: 300px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 300px;
		height: 178px;
		display: block;
	}
</style>
