<template>
	<div>
		<div v-if="!list.length" style="text-align: center;">
			<img src="../../assets/common/none-list.png" draggable="false" style="width: 500px;height: 480px;margin-top: 50px;">
		</div>
		<el-row v-else :gutter="20">
			<el-col :span="12" v-for="(item,index) in list" :key="index" class="mb-3">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>{{item.name}}</span>
					</div>
					<el-form label-width="80px" label-position="left">
						<el-form-item label="图标">
							<img :src="$C.webUrl+item.logo" style="width: 100px;height: 60px;" draggable="false">
						</el-form-item>
						<el-form-item label="地址">
							{{item.address}}
							<el-button class="ml-3" type="primary" size="small" @click="showMap(item.lng_and_lat)">查看地图</el-button>
						</el-form-item>
						<el-form-item label="理由">
							{{item.reason}}
						</el-form-item>
						<el-form-item label="操作">
							<el-button type="success" @click="passHandle(item.id,1)">通过</el-button>
							<el-button type="danger" @click="passHandle(item.id,0)">不通过</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<!-- 分页 -->
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
					current: 1,
					pageSize: 4,
				},
				total: 0,
				list: []
			}
		},
		methods: {
			passHandle(id,pass) {
				let msg = pass===1?'通过':'不通过'
				this.$confirm('您确定要'+msg+'吗?','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/passhandle',{id,pass},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						this.getOrgCheckList()
					})
				}).catch(()=>{})
			},
			handleCurrentChange(val) {
				this.form.current = val
				this.getOrgCheckList()
			},
			getOrgCheckList() {
				this.axios.post('/admin/getorgchecklist',this.form,{token:true,loading:true}).then(res=>{
					this.list = res.data.data.list
					this.total = res.data.data.total
					this.form.current = res.data.data.current
				})
			},
			showMap(e) {
				let init = JSON.parse(e)
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
		},
		created() {
			this.getOrgCheckList()
		}
	}
</script>

<style scoped>
	.map-area {
		width: 100%;
		height: 550px;
	}
</style>
