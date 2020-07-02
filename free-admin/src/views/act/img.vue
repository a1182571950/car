<template>
	<div>
		<el-container style="position: absolute;top: 55px;right: 0;bottom: 0;left: 0;">
		  <el-header class="d-flex border-bottom align-items-center justify-content-between">
				<div class="d-flex ">
					<el-input placeholder="输入活动名称" style="width: 250px;" v-model="actForm.name" size="medium" class="mr-3"></el-input>
					<el-button type="primary" size="medium" @click="search">搜索</el-button>
					<el-button type="success" size="medium" @click="reset">还原搜索</el-button>
				</div>
				<el-button type="warning" size="medium" @click="uploadModal=true">上传图片</el-button>
			</el-header>
		  <el-container>
				 <el-aside style="position: absolute;top: 60px;left: 0;bottom: 60px;" class="bg-white border-right" width="200px">
					<!-- 侧边|活动列表 -->
					<ul class="list-group list-group-flush">
						<li style="cursor: pointer;" :class="{'sum-active':actIndex===index}" @click.stop="actChange(index)" v-for="(item,index) in actList" :key="index" class="list-group-item list-group-item-action d-flex align-items-center">
							<span style="font-size: 12px;">{{item.name}}</span>
							<el-dropdown class="ml-auto">
							  <span class="btn bg-light btn-sm border">
								 {{item.img_total?item.img_total:0}}<i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
							  <el-dropdown-menu slot="dropdown">
								 <el-dropdown-item @click.stop.native="clearActImg(index)">清空图片</el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
				</el-aside>
		    <el-container>
		      <el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
						<el-row :gutter="10">
							<el-col :span="24"  :md="6" :sm="8" v-for="(item,index) in imgList" :key="index" >
								<el-card style="cursor: pointer;" class="box-card mb-3 position-relative" :body-style="{padding:0}" shadow="hover">
									<img :src="$C.webUrl+item.src" class="w-100" style="height: 160px;">
									<div class="p-2 text-center">
										<el-button-group>
										  <el-button size="mini" icon="el-icon-view" @click="previewImg(item.src)"></el-button>
										  <el-button size="mini" icon="el-icon-delete" @click="delImg(item.id)"></el-button>
										</el-button-group>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</el-main>
		    </el-container>
		  </el-container>
			<el-footer class="border-top d-flex align-items-center px-0">
				<!-- 底部分页 -->
				<div style="width: 200px;" class="border-right h-100 d-flex align-items-center justify-content-center">
					<el-button-group>
						<el-button size="mini" @click="actPrev">上一页</el-button>
						<el-button size="mini" @click="actNext">下一页</el-button>
					</el-button-group>
				</div>
				<div class="px-3">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="imgForm.current" :page-size="imgForm.pageSize" layout="prev, pager, next, jumper" :total="imgTotal"></el-pagination>
				</div>
			</el-footer>
		</el-container>
		<!-- 上传图片 -->
		<el-dialog title="上传图片" :visible.sync="uploadModal">
			<div class="text-center">
				<el-upload
				  class="upload-demo"
				  drag
					name="act_img"
					:data="{id:nowActId}"
				  :action="uploadUrl"
					:headers="uploadHeaders"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				  multiple>
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10mb</div>
				</el-upload>
			</div>
		</el-dialog>
		<!-- 预览图片 -->
		<el-dialog :visible.sync="previewModal" width="60vw">
			<div style="margin: -60px -20px -30px -20px">
				<img :src="previewSrc" class="w-100" draggable="false">
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				imgForm: {
					current: 1,
					pageSize: 12,
				},
				imgTotal: 0,
				imgList: [],
				previewModal: false,
				uploadModal: false,
				actList: [],
				actMaxPage: 1,
				actIndex: 0,
				actForm: {
					current:1,
					pageSize: 6,
					name: '',
				},
				previewSrc: '',
			}
		},
		computed:{
			nowActId() {
				if (this.actList.length) {
					return this.actList[this.actIndex].id
				} else {
					return 0
				}
			},
			...mapState(['admin']),
			uploadUrl() {
				return this.$C.webUrl+'/admin/imglistadd'
			},
			uploadHeaders() {
				return {
					token: this.admin.token
				}
			},
		},
		watch:{
			nowActId() {
				if (!this.nowActId) return
				this.imgForm.current = 1
				this.axios.post('/admin/getimglist',Object.assign({id:this.nowActId},this.imgForm),{token:true,loading:true}).then(res=>{
					this.imgForm.current = res.data.data.current
					this.imgTotal = res.data.data.total
					this.imgList = res.data.data.list
				})
			} 
		},
		methods: {
			handleAvatarSuccess(res) {
				this.axios.post('/admin/getimglist',Object.assign({id:this.nowActId},this.imgForm),{token:true,loading:true}).then(res=>{
					this.imgForm.current = res.data.data.current
					this.imgTotal = res.data.data.total
					this.imgList = res.data.data.list
					this.actList[this.actIndex].img_total = this.imgList.length
				})
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
			delImg(id) {
				this.$confirm('您确定要删除这张照片吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.getImgList(id)
				}).catch(()=>{})
			},
			getImgList(id) {
				this.axios.post('/admin/delactimg',{id},{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					if (res.data.errorCode) return
					this.axios.post('/admin/getimglist',Object.assign({id:this.nowActId},this.imgForm),{token:true,loading:true}).then(res=>{
						this.imgForm.current = res.data.data.current
						this.imgTotal = res.data.data.total
						this.imgList = res.data.data.list
					})
				})
			},
			search() {
				this.getActImgList()
			},
			reset() {
				this.actForm = {
					current:1,
					pageSize: 6,
					name: '',
				}
				this.getActImgList()
			},
			actPrev() {
				if (this.actForm.current == 1) return this.$message('没有上一页了')
				this.actForm.current--
				this.getActImgList()
			},
			actNext() {
				if (this.actForm.current == this.actMaxPage) return this.$message('没有下一页了')
				this.actForm.current++
				this.getActImgList()
			},
			getActImgList() {
				this.axios.post('/admin/getactimglist',this.actForm,{token:true,loading:true}).then(res=>{
					if (!res.data.data.list.length) return this.$message('没有相关数据')
					this.actIndex = 0
					this.actList = res.data.data.list
					this.actForm.current = res.data.data.current
					this.actMaxPage = res.data.data.maxPage
				})
			},
			handleCurrentChange(val) {
				this.imgForm.current = val
				this.getImgList(this.nowActId)
			},
			previewImg(src) {
				this.previewSrc = this.$C.webUrl+src
				this.previewModal = true
			},
			clearActImg(index){
				let act_id = this.actList[index].id
				this.$confirm('您确定要清空该活动下的所有图片吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/clearimg',{act_id},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						if (act_id===this.nowActId) this.getImgList(act_id)
						this.actList[index].img_total = 0
					})
				}).catch(()=>{})
			},
			actChange(index) {
				this.actIndex = index
			}
		},
		created() {
			this.getActImgList()
		}
	}
</script>

<style scoped>
	.sum-active{
		color: #67c23a!important;
		background-color: #f0f9eb;
		border-color: #c2e7b0!important;
	}
</style>
