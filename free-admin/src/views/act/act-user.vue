<template>
	<div>
		<!-- 顶部按钮 -->
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>{{act_name}}</span>
			</div>
			<el-button type="primary" @click="downExcel">生成EXCEL文件</el-button>
			<el-button plain @click="goBack">返回列表</el-button>
		</el-card>
		<!-- 活动用户列表 -->
		<el-table :data="list" style="margin-top: 20px;">
			<el-table-column label="用户ID" prop="id" align="center"></el-table-column>
			<el-table-column label="用户名" prop="username"></el-table-column>
			<el-table-column label="头像">
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.userpic" style="width: 70px;height: 70px;border-radius: 50%;">
				</template>
			</el-table-column>
			<el-table-column label="名称" prop="act_name"></el-table-column>
			<el-table-column label="电话" prop="act_phone"></el-table-column>
			<el-table-column label="报名时间">
				<template slot-scope="scope">
					{{$T.formatTime(scope.row.create_time)}}
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
					act_id: 0,
					current: 1,
					pageSize: 6,
				},
				total: 0,
				act_name: '',
				list: [],
			}
		},
		methods: {
			downExcel() {
				this.axios.get('/admin/actUserExcel?act_id='+this.form.act_id+'&act_name='+this.act_name,{token:true}).then(res=>{
					window.open(this.$C.webUrl+'/admin/downExcel?excelCache='+res.data.data);     
				})
			},
			goBack() {
				this.$router.back()
			},
			handleCurrentChange(e) {
				this.form.current = e
				this.getActUserList()
			},
			getActUserList() {
				this.axios.post('/admin/actUserList',this.form,{token:true}).then(res=>{
					this.form.current = res.data.data.current
					this.total = res.data.data.total
					this.list = res.data.data.list
				})
			}
		},
		created() {
			this.form.act_id = this.$route.params.id
			this.act_name = this.$route.params.name
			this.getActUserList()
		}
	}
</script>

<style>
</style>
