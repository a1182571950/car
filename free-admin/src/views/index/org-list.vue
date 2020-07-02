<template>
	<div>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>机构查询</span>
			</div> 
			<el-form  label-width="70px" :inline="true" :model="form">
				<el-form-item label="机构名称" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.pass" @change="getOrgList">
					    <el-option label="全部" value="3"></el-option>
							<el-option label="已通过" value="1"></el-option>
					    <el-option label="待审核" value="2"></el-option>
					    <el-option label="未通过" value="0"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-select v-model="form.create_time" @change="getOrgList">
					    <el-option label="倒序" value="0"></el-option>
							<el-option label="正序" value="1"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="serach">查询</el-button>
					<el-button type="success">还原</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-table class="mt-3" :data="list">
			<el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
			<el-table-column align="center" label="名称" prop="name"></el-table-column>
			<el-table-column align="center" label="logo">
				<template slot-scope="scope">
					<img :src="$C.webUrl+scope.row.logo" style="width: 80px;">
				</template>
			</el-table-column>
			<el-table-column align="center" label="地址" prop="address"></el-table-column>
			<el-table-column align="center" label="创建时间">
				<template slot-scope="scope">
					{{formatTime(scope.row.create_time)}}
				</template>
			</el-table-column>
			<el-table-column label="状态" align="center" width="80">
				<template slot-scope="scope">
					<span :class="scope.row.pass==0?'text-danger':scope.row.pass==1?'text-success':'text-warning'">{{passShow(scope.row.pass)}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="showMap(scope.row)">地图位置</el-button>
				</template>	
			</el-table-column>
		</el-table>
		<div style="height: 80px;"></div>
		<div class="position-fixed border-top d-flex align-items-center bg-white" style="bottom: 0;left: 200px;right: 0;height: 60px;z-index: 100;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="form.current" :page-size="form.pageSize" layout="prev, pager, next, jumper" :total="total"></el-pagination>
		</div>
		<!-- 地图组件 -->
		<el-dialog title="地图显示" :visible.sync="mapPrev" width="60vw">
			<div style="margin: -50px -20px -30px -20px">
				<div class="map-area mt-3" :id="mapId"></div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import loadBMap from '../../common/loadBMap.js'
	export default {
		data() {
			return {
				mapPrev: false,
				mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
				myMap: null,
				form: {
					name:'',
					pass:'3',
					create_time:'0',
					current:1,
					pageSize:6
				},
				total:0,
				list:[],
			}
		},
		methods: {
			passShow(val) {
				if (val==0) return '未通过';
				if (val==1) return '已通过';
				if (val==2) return '待审核';
			},
			serach() {
				this.getOrgList()
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getOrgList()
			},
			formatTime(time) {
				return this.$T.formatTime(time);
			},
			getOrgList() {
				this.form.name = this.form.name.trim().replace(/\s+/g,' ')
				this.axios.post('/admin/getorglist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.form.current = res.data.data.current
					this.total = res.data.data.total
				})
			},
			showMap(e) {
				let init = JSON.parse(e.lng_and_lat)
				init = this.$T.gcj02tobd09(init.lng,init.lat)
				this.mapPrev = true
				loadBMap('1nALKvw5isuWFTN6OFWa8HZSxux22AAQ').then(()=>{
					this.myMap = new BMap.Map(this.mapId)
					this.myMap.centerAndZoom(new BMap.Point(init.bd_lng, init.bd_lat), 14)
					this.myMap.clearOverlays();
					var marker = new BMap.Marker(new BMap.Point(init.bd_lng, init.bd_lat));
					this.myMap.addOverlay(marker);
					this.myMap.enableScrollWheelZoom(true)
				}).catch(err => {
					console.log('地图加载失败')
				})
			}
			// methods底部
		},
		created() {
			this.getOrgList()
		},
	}
</script>

<style scoped>
	.map-area {
		width: 100%;
		height: 550px;
	}
</style>
