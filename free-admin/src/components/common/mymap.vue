<template>
	<div>
		<el-input id="suggestId" v-model="address">
			<i style="font-size: 20px;" class="el-icon-location-information el-input__icon" slot="suffix"></i>
		</el-input>
		<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
		<div class="map-area mt-3" :id="mapId"></div>
	</div>
</template>

<script>
	import loadBMap from '../../common/loadBMap.js'
	export default {
		props:{
			init: {
				default: '',
			}
		},
		data() {
			return {
				address: '',
				lngAndLat: {},
				mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
				myMap: null,
			}
		},
		watch: {
			address() {
				this.$emit('changeAddress',this.address)
			},
			
		},
		mounted() {
			let that = this
			loadBMap('1nALKvw5isuWFTN6OFWa8HZSxux22AAQ')
			.then(() => {
				// 百度地图API功能
				this.myMap = new BMap.Map(this.mapId) // 创建Map实例
				let tempMap = this.myMap
				if (this.init) {
					this.myMap.centerAndZoom(new BMap.Point(this.init.lng, this.init.lat), 14)
					this.myMap.clearOverlays();    //清除地图上所有覆盖物
					var marker = new BMap.Marker(new BMap.Point(this.init.lng, this.init.lat));  // 创建标注 
					this.myMap.addOverlay(marker); //加入地图
					// locationName (this.init.lng, this.init.lat);
					this.lngAndLat['lng']= this.init.lng;
					this.lngAndLat['lat'] = this.init.lat;
				} else {
					this.myMap.centerAndZoom("福州",12)
				}
				
				
				this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
				
				//城市列表控件
				this.myMap.enableInertialDragging();
				this.myMap.enableContinuousZoom();
				let size = new BMap.Size(10, 20); //城市列表控件显示在地图上的坐标
				this.myMap.addControl(new BMap.CityListControl({
						offset: size,
				}));
				
				//地图点击获取经纬度 添加坐标
				this.myMap.addEventListener('click', (e)=> {
					this.myMap.clearOverlays();    //清除地图上所有覆盖物
					var marker = new BMap.Marker(new BMap.Point(e.point.lng,e.point.lat));  // 创建标注 
					this.myMap.addOverlay(marker); //加入地图
					locationName (e.point.lat, e.point.lng);
					this.lngAndLat['lng']= e.point.lng;
					this.lngAndLat['lat'] = e.point.lat;
					this.$emit('changeIngLat',this.lngAndLat)
				});
				
				function G(id) {
					return document.getElementById(id);
				}
						
				let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
					{"input" : "suggestId"
					,"location" : this.myMap
				});
				
				ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
					var str = "";
					var _value = e.fromitem.value;
					var value = "";
					if (e.fromitem.index > -1) {
						value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					}    
					str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
					
					value = "";
					if (e.toitem.index > -1) {
						_value = e.toitem.value;
						value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					}    
					str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
					G("searchResultPanel").innerHTML = str;			
				});
				
				let myValue;
				ac.addEventListener("onconfirm", (e) => {    //鼠标点击下拉列表后的事件
				var _value = e.item.value;
					myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
					setPlace();
					this.address = myValue;
				});
				
				
				function setPlace(){
					tempMap.clearOverlays();    //清除地图上所有覆盖物
					function myFun(){
						var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
						//console.log(pp);
						tempMap.centerAndZoom(pp, 18);
						tempMap.addOverlay(new BMap.Marker(pp));    //添加标注
						that.lngAndLat['lng'] = pp.lng;
						that.lngAndLat['lat'] = pp.lat;
						that.$emit('changeIngLat',that.lngAndLat)
					}
					var local = new BMap.LocalSearch(tempMap, { //智能搜索
						onSearchComplete: myFun
					});
					local.search(myValue);
				}
				
				
			})
			.catch(err => {
				console.log('地图加载失败')
			})
			
			
			//根据经纬度获取定位名称
			function locationName (lat, lng) {
				let location_name = ''
				//获取定位名称
				var new_point = new BMap.Point(lng, lat);
				var gc = new BMap.Geocoder();  //初始化，Geocoder类
				gc.getLocation(new_point,  (rs) => {   //getLocation函数用来解析地址信息，分别返回省市区街等
						let addComp = rs.addressComponents,
								province = addComp.province,//获取省份
								city = addComp.city,//获取城市
								district = addComp.district,//区
								street = addComp.street,//街
								streetNumber = addComp.streetNumber ? addComp.streetNumber : "";
						location_name = province + city + district + street + streetNumber;
						that.address = location_name;
				}); 
			}
		}
	}
</script>

<style scoped>
	.map-area {
		width: 70%;
		height: 450px;
	}
</style>
