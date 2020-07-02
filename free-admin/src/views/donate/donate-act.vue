<template>
	<div>
		<el-container style="position: absolute;top: 55px;right: 0;bottom: 0;left: 0;">
			<el-header class="d-flex border-bottom align-items-center justify-content-between">
				<div class="d-flex ">
					<el-input placeholder="输入活动名称" style="width: 250px;" size="medium" class="mr-3" v-model="actForm.name"></el-input>
					<el-button type="primary" size="medium" @click="search">搜索</el-button>
					<el-button type="success" size="medium" @click="reset">还原搜索</el-button>
					<el-button type="warning" size="medium" @click="donateExcel">生成Excel文件</el-button>
				</div>
			</el-header>
			<el-container>
				<el-aside style="position: absolute;top: 60px;left: 0;bottom: 60px;" class="bg-white border-right" width="200px">
					<!-- 侧边|活动列表 -->
					<ul class="list-group list-group-flush">
						<li style="cursor: pointer;" :class="{'sum-active':actIndex===index}" @click.stop="actChange(index)" v-for="(item,index) in actList" :key="index" class="list-group-item list-group-item-action d-flex align-items-center">
							<span style="font-size: 12px;">{{item.name}}</span>
						</li>
					</ul>
				</el-aside>
			</el-container>
			<el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
				<!-- 捐赠表格 -->
				<el-table :data="list">
					<el-table-column label="用户名" prop="username" align="center"></el-table-column>
					<el-table-column label="头像" align="center">
						<template slot-scope="scope">
							<img :src="$C.webUrl+scope.row.userpic" style="width: 60px;height: 60px;border-radius: 50%;">
						</template>
					</el-table-column>
					<el-table-column label="捐赠金额" prop="count" align="center"></el-table-column>
					<el-table-column label="备注" prop="remark" align="center"></el-table-column>
					<el-table-column label="捐赠时间" align="center">
						<template slot-scope="scope">
							{{$T.formatTime(scope.row.create_time)}}
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<el-footer class="border-top d-flex align-items-center px-0">
				<!-- 底部分页 -->
				<div style="width: 200px;" class="border-right h-100 d-flex align-items-center justify-content-center">
					<el-button-group>
						<el-button size="mini" @click="actPrev">上一页</el-button>
						<el-button size="mini" @click="actNext">下一页</el-button>
					</el-button-group>
				</div>
				<div class="px-3">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="donateForm.current" :page-size="donateForm.pageSize" layout="prev, pager, next, jumper" :total="donateTotal"></el-pagination>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				actList: [],
				actMaxPage: 1,
				actIndex: 0,
				actForm: {
					current:1,
					pageSize: 8,
					name: '',
				},
				donateForm: {
					current: 1,
					pageSize: 6,
				},
				donateTotal: 0,
				list: []
			}
		},
		computed: {
			nowActId() {
				if (this.actList.length) {
					return this.actList[this.actIndex].id
				} else {
					return 0
				}
			},
		},
		watch: {
			nowActId() {
				if (!this.nowActId) return
				this.donateForm.current = 1
				this.getDonateListInfo()
			}
		},
		methods: {
			donateExcel() {
				if (!this.nowActId) return this.$message('无活动数据')
				console.log(this.nowActId)
				this.axios.post('/admin/donateExcel',{act_id:this.nowActId,act_name:this.actList[this.actIndex].name},{token:true}).then(res=>{
					window.open(this.$C.webUrl+'/admin/downExcel?excelCache='+res.data.data);
				})
			},
			search() {
				this.actForm.name = this.actForm.name.trim().replace(/\s+/g,' ');
				this.getDonateActList()
			},
			reset() {
				this.actForm.name = ''
				this.actForm.current = 1
				this.getDonateActList()
			},
			getDonateListInfo() {
				this.axios.post('/admin/getDonateListInfo',Object.assign({act_id:this.nowActId},this.donateForm),{token:true}).then(res=>{
					
					this.donateForm.current = res.data.data.current
					this.donateTotal = res.data.data.total
					this.list = res.data.data.list
				})
			},
			actChange(index) {
				this.actIndex = index
			},
			handleCurrentChange(e) {
				this.donateForm.current = e
				this.getDonateListInfo()
			},
			getDonateActList() {
				this.axios.post('/admin/getDonateActList',this.actForm,{token:true}).then(res=>{
					if (!res.data.data.list.length) return this.$message('没有相关数据')
					this.actForm.current = res.data.data.current
					this.actMaxPage = res.data.data.maxPage
					this.actList = res.data.data.list
				})
			},
			actPrev() {
				if (this.actForm.current === 1) return this.$message('没有上一页了')
				this.actIndex = 0
				this.actForm.current--
				this.getDonateActList()
			},
			actNext() {
				if (this.actForm.current == this.actMaxPage) return this.$message('没有下一页了')
				this.actIndex = 0
				this.actForm.current++
				this.getDonateActList()
			},
			
		},
		created() {
			this.getDonateActList()
		}
	}
</script>

<style>
</style>
