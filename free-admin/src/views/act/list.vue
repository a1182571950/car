<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>活动查询</span>
			</div>
			<el-form size="mini" label-width="100px" :model="form" :inline="true">
				<el-form-item label="活动名称" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="活动状态">
					<el-select v-model="form.time" @change="selChange">
					    <el-option label="全部" value="0"></el-option>
							<el-option label="未开始" value="1"></el-option>
							<el-option label="已结束" value="2"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
					<el-button plain @click="resetSearch">还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-table class="mt-3" :data="list">
			<el-table-column align="center" label="ID" prop="id" ></el-table-column>
			<el-table-column align="center" label="名称" prop="name"></el-table-column>
			<el-table-column align="center" label="封面" >
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.cover" style="width: 100px;height: 80px;">
				</template>
			</el-table-column>
			<el-table-column align="center" label="简介" prop="name"></el-table-column>
			<el-table-column align="center" label="参与人数" >
				<template slot-scope="scope">
					{{scope.row.join_people?scope.row.join_people:'0'}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="开始时间">
				<template slot-scope="scope">
					{{$T.formatTime(scope.row.start_time)}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="300">
				<template slot-scope="scope">
					<el-button plain size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
					<el-button type="success" size="mini" @click="toActUser(scope.row.id,scope.row.name)">活动用户</el-button>
					<el-button type="primary" size="mini" @click="delAct(scope.row.id)">删除</el-button>
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
					time: '0',
					name: '',
					current:1,
					pageSize:6,
				},
				list: [],
				total:0,
			}
		},
		methods: {
			toActUser(id,name) {
				this.$router.push({path:'/act/act-user/'+id+'/'+name})
			},
			toEdit(id) {
				sessionStorage.setItem('act_id',id)
				this.$router.push({name:'act_edit'})
			},
			delAct(id) {
				this.$confirm('您确定要删除这条活动记录吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/delact',{id},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.getActList()
					})
				}).catch(()=>{})
			},
			resetSearch() {
				this.form = {
					time: '0',
					name: '',
					current:1,
					pageSize:6,
				}
				this.getActList()
			},
			search() {
				this.form.current = 1
				this.getActList()
			},
			selChange() {
				this.form.current = 1
				this.getActList()
			},
			getActList() {
				this.form.name = this.form.name.trim().replace(/\s+/g,' ')
				this.axios.post('/admin/getactlist',this.form,{token:true,loading:true}).then(res=>{
					if (!res.data.data.list.length) return this.$message('没有相关数据')
					this.list = res.data.data.list
					this.form.current = res.data.data.current
					this.total = res.data.data.total
				})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getActList()
			}
		},
		created() {
			this.getActList()
		}
	}
</script>

<style>
</style>
