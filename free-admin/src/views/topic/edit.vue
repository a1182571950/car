<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>科普知识编辑</span>
				<el-button style="float: right;padding: 3px 0;" type="text" @click="delTopic">删除</el-button>
				<el-button style="float: right;padding: 3px 0;margin-right: 20px;" type="text" @click="toTopicList">返回列表</el-button>
			</div>
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
					<el-button type="primary" @click="editTopic">立即修改</el-button>
					<el-button plain @click="resetForm">还原</el-button>
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
				init: {},
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
			delTopic() {
				this.$confirm('您确定要删除该科普知识吗?','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/deltopic',{id:this.init.id},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return;
						this.$router.push({name:'topic_list'})
					})
				}).catch(()=>{})
			},
			toTopicList() {
				this.$router.push({name:'topic_list'})
			},
			resetForm() {
				this.form = JSON.parse(JSON.stringify(this.init)) 
				this.imageUrl = this.$C.webUrl+this.init.cover
			},
			editTopic() {
				for (let key in this.form){
					if (typeof this.form[key] === 'string') {
						this.form[key] = this.form[key].trim()
					}
				}
				if (!/^\S{2,16}$/.test(this.form.name)) return this.$message.error('名称在2-16位,不含空格')
				if (!this.form.cover) return this.$message.error('您未上传封面')
				if (!this.form.content) return this.$message.error('您未填写内容')
				this.axios.post('/admin/edittopic',this.form,{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return;
					this.init = JSON.parse(JSON.stringify(this.form)) 
				})
			},
			handleAvatarSuccess(res) {
				if (res.errorCode) return this.$message.error(res.msg)
				this.imageUrl = this.$C.webUrl+res.data;
				this.form.cover = res.data
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG|PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			getTopicInfo() {
				let topic_id = sessionStorage.getItem('topic_id');
				if (!topic_id) {
					this.$message.error('您尚未选择科普知识,请先前往列表选择')
					return this.$router.push({name:'topic_list'})
				}
				this.axios.post('/admin/gettopicinfo',{id:topic_id},{token:true,loading:true}).then(res=>{
					this.init = res.data.data
					this.form = res.data.data
					this.imageUrl = this.$C.webUrl+ this.init.cover
				})
			}
		},
		created() {
			this.getTopicInfo()
		}
	}
</script>

<style scoped="scoped">
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9!important;
	    border-radius: 6px!important;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF!important;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 330px;
	    height: 190px;
	    line-height: 190px;
	    text-align: center;
	  }
	  .avatar {
	    width: 330px;
	    height: 190px;
	    display: block;
	  }
</style>
