<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
			<span>科普知识查询</span>
			</div>
			<el-form label-width="100px" :model="form" :inline="true">
				<el-form-item label="科普知识名称" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-select v-model="form.create_time" @change="getTopicList">
					    <el-option label="倒序" value="0"></el-option>
							<el-option label="正序" value="1"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTopicList">查询</el-button>
					<el-button @click="resetForm" plain>还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-row :gutter="20">
			<el-col :span="6" class="my-3" v-for="(item,index) in list" :key="index">
				<el-card class="box-card" shadow="hover">
					<div slot="header" class="clearfix">
						<span>{{item.name}}</span>
						<el-button @click="toTopicEdit(item.id)" style="float: right;padding: 3px 0;" type="text">查看编辑</el-button>
					</div>
					<img @click="toTopicEdit(item.id)" :src="$C.webUrl+item.cover" draggable="false" style="height: 170px ;width: 100%;cursor: pointer;">
				</el-card>
			</el-col>
		</el-row>
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
					name: '',
					create_time: '0',
					current: 1,
					pageSize: 8, 
				},
				total:0,
				list: []
			}
		},
		methods:{
			toTopicEdit(id) {
				sessionStorage.setItem('topic_id',id);
				this.$router.push({name:'topic_edit'})
			},
			resetForm() {
				this.form = {
					name: '',
					create_time: '0',
					current: 1,
					pageSize: 8, 
				}
				this.getTopicList()
			},
			getTopicList() {
				this.axios.post('/admin/gettopiclist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.total = res.data.data.total
					this.current = res.data.data.current
				})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getTopicList()
			}
		},
		created() {
			this.getTopicList()
		}
	}
</script>

<style>
</style>
