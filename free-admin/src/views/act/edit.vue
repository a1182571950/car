<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑活动</span>
				<el-button style="float: right;padding: 3px 0;" type="text" @click="toActList">返回列表</el-button>
			</div>
			<el-form ref="form" :model="form" label-width="80px" size="mini">
				<el-form-item label="原始地址">
					<el-input v-model="old_address" disabled=""></el-input>
				</el-form-item>
				<el-form-item label="活动地址">
					<template v-if="init">
						<mymap :init="init" @changeAddress="changeAddress" @changeIngLat="changeIngLat"></mymap>
					</template>
				</el-form-item>
				<el-form-item label="活动名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-date-picker
						v-model="time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="活动人数">
					<el-input-number v-model="form.headcount" :min="1" :max="500"></el-input-number>
				</el-form-item>
				<el-form-item label="活动封面">
					<el-upload
					  class="avatar-uploader"
					  :action="uploadUrl"
						name="act_cover"
						:headers="uploadHeaders"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="活动简介">
					<el-input v-model="form.brief"></el-input>
				</el-form-item>
				<el-form-item label="活动详情">
					<tinymce v-model="form.info"></tinymce>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 200px;height: 40px;" @click="editAct">完成编辑</el-button>
					<el-button style="width: 200px;height: 40px;" @click="toActList">取消编辑</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import mymap from '../../components/common/mymap.vue'
	import tinymce from '../../components/common/tinymce.vue'
	export default {
		components: {tinymce,mymap},
		data() {
			return {
				init: '',
				form: {
					name: '',
					headcount: 100,
					brief: '',
					info:'',
					address: '',
					lngAndLat: {},
					lngAndLatJSON: '',
					cover: '',
					start_time: 0,
					end_time: 0,
				},
				time: null,
				imageUrl: '',
				old_address: '',
				old_lngAndLatJSON: '',
				id: 0,
			}
		},
		computed: {
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/imgactadd'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			}
		},
		methods: {
			toActList() {
				this.$router.push({name:'act_list'})
			},
			editAct() {
				this.form.name = this.form.name.trim()
				if (!/^\S{2,16}$/.test(this.form.name)) return this.$message('活动名称在2-16位不含空格')
				if (!this.time) return this.$message('您未选择活动时间')
				this.form.start_time = this.time[0].getTime()/1000
				this.form.end_time = this.time[1].getTime()/1000
				if (!this.form.headcount) return this.$message('您未选择活动人数')
				if (!this.form.cover) return this.$message('您未选择活动封面')
				this.form.brief = this.form.brief.trim()
				if (!/^\S{2,20}$/.test(this.form.brief)) return this.$message('活动简介在2-20位不含空格')
				if (!this.form.info) return this.$message('活动详情未填写')
				if (!this.form.address) return this.$message('您未选择活动地址')
				this.form.lngAndLatJSON = JSON.stringify(this.form.lngAndLat)
				if (this.form.lngAndLatJSON=="{}") {
					this.form.lngAndLatJSON = this.old_lngAndLatJSON
				} 
				this.axios.post('/admin/editact',Object.assign({id:this.id},this.form),{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return 
					this.$router.push({name:'act_list'})
				})
				
			}, 
			changeIngLat(e) {
				this.form.lngAndLat = e
			},
			changeAddress(e) {
				this.form.address = e
			},
			handleAvatarSuccess(res) {
				this.imageUrl = this.$C.webUrl+res.data
				this.form.cover = res.data
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 10;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG|PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 10MB!');
				}
				return isJPG && isLt2M;
			},
		},
		created() {
			let id = sessionStorage.getItem('act_id');
			this.id = id
			if (!id) {
				this.$message.error('您未选择活动')
				return this.$router.push({name:'act_list'})
			}
			this.axios.post('/admin/getactinfo',{id},{token:true,loading:true}).then(res=>{
				this.form.name = res.data.data.name
				this.form.start_time = res.data.data.start_time
				this.form.end_time = res.data.data.end_time
				let temp = [];
				temp.push(new Date(Number(this.form.start_time)*1000))
				temp.push(new Date(Number(this.form.end_time)*1000))
				this.time = temp
				this.form.headcount = res.data.data.headcount
				this.form.cover = res.data.data.cover
				this.imageUrl = this.$C.webUrl+res.data.data.cover
				this.form.brief = res.data.data.brief
				this.form.info = res.data.data.info
				this.form.address = res.data.data.address
				this.old_address = res.data.data.address
				this.form.lngAndLatJSON = res.data.data.lng_and_lat
				this.old_lngAndLatJSON = res.data.data.lng_and_lat
				this.init = JSON.parse(res.data.data.lng_and_lat)
			})
		}
	}
</script>

<style>
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
