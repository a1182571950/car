<template>
	<div class="border-bottom py-3">
		<div>
			<span>{{qIndex+1}}.</span>
			<span class="ml-3 font-weight-bold">{{qItem.title}}</span>
		</div>
		<div style="margin-top: 15px;">
			<template v-if="qItem.type==='radio'">
				<div class="d-flex flex-column pl-4">
					<el-radio v-model="qItem.answer" v-for="(item,index) in qItem.options" :key="index" :label="item.name">{{item.name}}</el-radio>
				</div>
			</template>
			<template v-if="qItem.type==='checkbox'">
					<div class="d-flex flex-column pl-4">
						<el-checkbox v-model="qItem.answerArr" v-for="(item,index) in qItem.options" :key="index" :label="item.name">{{item.name}}</el-checkbox>
					</div>
			</template>
		</div>
		<div>
			<el-button-group>
			  <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdit"></el-button>
			  <el-button size="mini" type="primary" icon="el-icon-top" @click="questionUp"></el-button>
			  <el-button size="mini" type="primary" icon="el-icon-bottom" @click="questionDown"></el-button>
			  <el-button size="mini" type="primary" icon="el-icon-delete" @click="questionDel"></el-button>
			</el-button-group>
		</div>
		<div v-show="editShow">
			<div class="d-flex mt-2">
				<div style="width: 130px;">题目标题</div>
				<el-input size="mini" v-model="qItem.title"></el-input>
			</div>
			<el-table :data="qItem.options">
				<el-table-column  label="选项文字" width="350">
					<template slot-scope="scope">
						<el-input @change="optionsChange" size="mini" v-model="scope.row.name"></el-input>
					</template>
				</el-table-column>
				<el-table-column  label="添加选项" align="center">
					<template slot-scope="scope">
						<el-button @click="addOption(scope.$index)" icon="el-icon-circle-plus" circle size="mini"></el-button>
					</template>
				</el-table-column>
				<el-table-column  label="删除选项" align="center">
					<template slot-scope="scope">
						<el-button @click="delOption(scope.$index)" icon="el-icon-remove" circle size="mini"></el-button>
					</template>
				</el-table-column>
				<el-table-column  label="上移" align="center">
					<template slot-scope="scope">
						<el-button @click="upOption(scope.$index)" icon="el-icon-top" circle size="mini"></el-button>
					</template>
				</el-table-column>
				<el-table-column  label="下移" align="center">
					<template slot-scope="scope">
						<el-button @click="downOption(scope.$index)" icon="el-icon-bottom" circle size="mini"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			qIndex: Number,
			qItem: Object,
		},
		data() {
			return {
				editShow: false
			}
		},
		methods: {
			showEdit() {
				this.editShow = !this.editShow
			},
			optionsChange() {
				this.$emit('optionsChange',{index:this.qIndex,type:this.qItem.type})
			},
			questionUp() {
				this.$emit('questionUp',this.qIndex)
			},
			questionDown() {
				this.$emit('questionDown',this.qIndex)
			},
			questionDel() {
				this.$emit('questionDel',this.qIndex)
			},
			addOption(index) {
				this.qItem.options.splice(index+1,0,{name:'新选项'})
			},
			delOption(index) {
				this.qItem.options.splice(index,1)
			},
			upOption(index) {
				if (index === 0) return this.$message('无法再上移了')
				let temp = this.qItem.options[index];
				this.$set(this.qItem.options,index,this.qItem.options[index-1]);
				this.$set(this.qItem.options,index-1,temp);
			},
			downOption(index) {
				if(index==this.qItem.options.length-1)return this.$message("无法再下移了");
				let temp = this.qItem.options[index];
				this.$set(this.qItem.options,index,this.qItem.options[index+1]);
				this.$set(this.qItem.options,index+1,temp);
			}
		}
	}
</script>

<style>
</style>
