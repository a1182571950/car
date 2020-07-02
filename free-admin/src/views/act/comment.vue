<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>活动评论查询</span>
			</div>
			<el-form size="mini" label-width="80px" :model="form" :inline="true">
				<el-form-item label="活动名称" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="用户名" >
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
					<el-button plain @click="reset">还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-table class="mt-3" :data="list">
			<el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
			<el-table-column align="center" label="活动名称" prop="name" ></el-table-column>
			<el-table-column align="center" label="用户名" prop="username" ></el-table-column>
			<el-table-column align="center" label="评论内容" prop="comment" ></el-table-column>
			<el-table-column align="center" label="评论时间" >
				<template slot-scope="scope">
					{{$T.formatTime(scope.row.create_time)}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button @click="handleCom(scope.row.id,scope.row.is_del,scope.$index)" :type="scope.row.is_del?'primary':'danger'" size="mini">{{scope.row.is_del?'恢复':'删除'}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
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
					current:1,
					pageSize:6,
					name: '',
					username: '',
				},
				list:[],
				total:0,
			}
		},
		methods:{
			handleCom(id,is_del,index) {
				let msg = is_del ? '恢复' : '删除'
				let flag = is_del ? 0 : 1
				this.$confirm(`您确定要${msg}这条评论吗`,'提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/handlecom',{id,is_del:flag},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.list[index].is_del = flag
					})
				}).catch(()=>{})
			},
			search() {
				this.getComList()
			},
			reset() {
				this.form = {
					current:1,
					pageSize:6,
					name: '',
					username: '',
				}
				this.getComList()
			},
			getComList() {
				this.form.name = this.form.name.trim().replace(/\s+/,' ')
				this.form.username = this.form.username.trim().replace(/\s+/,' ')
				this.axios.post('/admin/getcomlist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.total = res.data.data.total
					this.form.current = res.data.data.current
				})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getComList()
			}
		},
		created() {
			this.getComList()
		}
	}
</script>

<style>
</style>
