<template>
	<div>
		<!-- 数据统计 -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item,index) in counts" :key="index">
				<el-card class="box-card" shadow="hover">
					<div class="d-flex align-items-center">
						<i :class="[item.icon,item.color]" class="bg-primary mr-3 text-white h4 mb-0" style="width: 40px;height: 40px;text-align: center;line-height: 40px;"></i>
						<div>
							<h4 class="mb-1">{{item.num}}</h4>
							<small class="text-muted">{{item.desc}}</small>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 提示|统计图 -->
		<el-row :gutter="20" class="mt-3">
			<el-col :span="12" style="height: 370px;justify-content: space-between;" class="d-flex flex-column">
				<el-card class="box-card" shadow="hover" v-for="(tip,ti) in tips" :key="ti">
					<div slot="header" class="clearfix">
						<span>{{tip.title}}</span>
						<el-button style="float: right;padding: 3px 0;" type="text">{{tip.desc}}</el-button>
					</div>
					<div class="row">
						<div class="col-4" v-for="(tlist,listi) in tip.list" :key="listi">
							<button class="btn btn-light w-100">
								<h4>{{tlist.value}}</h4>
								<small class="text-muted">{{tlist.name}}</small>
							</button>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<!-- 统计图 -->
				<el-card class="box-card" style="height: 370px;" shadow="hover">
					<div slot="header" class="clearfix">
						<span>活动参与排名</span>
					</div>
					<!-- 统计图容器 -->
					<div ref="myChart" style="width: 100%;height: 270px;"></div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 底部 -->
		<el-row :gutter="20" class="my-3">
			<el-col :span="12">
				<el-card class="box-card" shadow="hover">
					<div slot="header" class="clearfix">
					<span>捐赠与答题</span>
					</div>
					<div class="media align-items-center border">
						<span class="border-right py-4 px-3 bg-light">本月捐赠</span>
						<div class="media-body">
							<div class="border-bottom pl-3 pb-2"><span>捐赠人数 </span>{{donate_month_user_total}}</div>
							<div class="pl-3 pt-1"><span>捐赠总额 </span>{{donate_month_total}}</div>
						</div>
					</div>
					<div class="media align-items-center border mt-4">
						<span class="border-right py-4 px-3 bg-light">本月答题</span>
						<div class="media-body">
							<div class="border-bottom pl-3 pb-2"><span>答题总数 </span>{{record_month_total}}</div>
							<div class="pl-3 pt-1"><span>通过数量 </span>{{record_month_pass}}</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card" shadow="hover">
					<div slot="header" class="clearfix">
					<span>本月新增活动一览</span>
					</div>
					<el-table :data="actMonthList" height="172" border style="width: 100%">
						<el-table-column prop="name" label="活动名称"></el-table-column>
						<el-table-column  label="开始时间">
							<template slot-scope="scope">
								{{$T.formatTime(scope.row.start_time)}}
							</template>
						</el-table-column>
						<el-table-column prop="address" label="地址"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<div style="text-align: right;font-size: 15px;"><a href="http://www.beian.miit.gov.cn/">闽ICP备20011513号</a></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				actMonthList: [],
				counts: [
					{icon:'el-icon-user-solid',num:0,desc:'用户总数',color:'bg-primary'},
					{icon:'el-icon-s-flag',num:0,desc:'活动总数',color:'bg-success'},
					{icon:'el-icon-s-claim',num:0,desc:'科普总数',color:'bg-danger'},
					{icon:'el-icon-s-finance',num:0,desc:'捐款总额',color:'bg-warning'},
				],
				tips: [
					{
						title:'机构摘要',
						desc:'需要处理的机构信息',
						list:[
							{name:'未审核',value:0},
							{name:'已通过',value:0},
							{name:'本月新增',value:0},
						]
					},
					{
						title:'本月活动摘要',
						desc:'活动相关信息',
						list:[
							{name:'新增数量',value:0},
							{name:'参与人数',value:0},
							{name:'评论总数',value:0},
						]
					}
				],
				donate_month_user_total:0,
				donate_month_total: 0,
				record_month_total: 0,
				record_month_pass: 0,
				xAxis_data: [],
				yAxis_data: [],
				// data return 底部
			}
		},
		mounted() {
			// 画统计图
			this.getChartList()
		},
		methods: {
			drawLine() {
				// 初始化echarts实例
				let myChart = echarts.init(this.$refs.myChart)
				// 配置参数
				myChart.setOption({
					tooltip: {},
					legend: {
							data:['参与人数']
					},
					xAxis: {
							data: this.xAxis_data
					},
					yAxis: {},
					series: [{
							name: '参与人数',
							type: 'bar',
							data: this.yAxis_data
					}]
				})
			},
			getIndexData() {
				this.axios.get('/admin/getIndexData',{token:true}).then(res=>{
					this.counts[0].num = res.data.data.user_total
					this.counts[1].num = res.data.data.act_total
					this.counts[2].num = res.data.data.topic_total
					this.counts[3].num = res.data.data.donate_total
					this.tips[0].list[0].value = res.data.data.org_check_num
					this.tips[0].list[1].value = res.data.data.org_pass_num
					this.tips[0].list[2].value = res.data.data.org_month_num
					this.tips[1].list[0].value = res.data.data.act_month_total
					this.tips[1].list[1].value = res.data.data.act_month_user_total
					this.tips[1].list[2].value = res.data.data.act_month_com_total
					this.donate_month_user_total = res.data.data.donate_month_user_total
					this.donate_month_total = res.data.data.donate_month_total
					this.record_month_total = res.data.data.record_month_total
					this.record_month_pass = res.data.data.record_month_pass
				})
			},
			getMonthActList() {
				this.axios.get('/admin/getMonthActList',{token:true}).then(res=>{
					this.actMonthList = res.data.data
				})
			},
			getChartList() {
				this.axios.get('/admin/getChartList',{token:true}).then(res=>{
					for (let i=0;i<res.data.data.length;i++) {
						this.xAxis_data.push(res.data.data[i].name)
						this.yAxis_data.push(res.data.data[i].total)
					}
					this.drawLine()
				})
			}
			// methods底部
		},
		created() {
			this.getIndexData()
			this.getMonthActList()
		}
	}
</script>

<style>
</style>
