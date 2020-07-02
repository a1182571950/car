<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix"><span>捐赠查询</span></div>
			<el-form label-width="80px" :model="form" :inline="true">
				<el-form-item label="用户名" >
					<el-input v-model="form.username" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker size="mini" @change="timeChange"
						v-model="time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="search">查询</el-button>
					<el-button @click="resetSearch" size="mini" plain>还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-table class="mt-3" :data="list">
			<el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
			<el-table-column align="center" label="用户名" prop="username"></el-table-column>
			<el-table-column align="center" label="头像">
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.userpic" draggable="false" style="width: 80px;height: 80px;border-radius: 50%;">
				</template>
			</el-table-column>
			<el-table-column align="center" label="活动名称">
				<template slot-scope="scope">
					{{scope.row.name?scope.row.name:'默认捐款'}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="金额" prop="count"></el-table-column>
			<el-table-column align="center" label="备注" prop="remark"></el-table-column>
			<el-table-column align="center" label="时间">
				<template slot-scope="scope">
					{{$T.formatTime(scope.row.create_time)}}
				</template>
			</el-table-column>
		</el-table>
		
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
					username: '',
					start_time: 0,
					end_time: 0,
					current: 1,
					pageSize: 6,
				},
				total: 0,
				time: null,
				list: [],
			}
		},
		methods: {
			timeChange(val) {
				if (val) {
					this.form.start_time = val[0].getTime()/1000
					this.form.end_time = val[1].getTime()/1000
				} else {
					this.form.start_time = 0
					this.form.end_time = 0
				}
				this.getDonateList()
			},
			resetSearch() {
				this.form = {
					username: '',
					start_time: 0,
					end_time: 0,
					current: 1,
					pageSize: 6,
				}
				this.time = null
				this.getDonateList()
			},
			search() {
				this.getDonateList()
			},
			getDonateList() {
				this.form.username = this.form.username.trim().replace(/\s+/g,' ')
				this.axios.post('/admin/getdonatelist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.total = res.data.data.total
					this.current = res.data.data.current
				})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getDonateList()
			}
		},
		created() {
			this.getDonateList()
		}
	}
</script>

<style>
</style>
