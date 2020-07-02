<template>
	<div>
		<el-container style="position: absolute;top: 55px;right: 0;bottom: 0;left: 0;">
			<el-header class="d-flex border-bottom align-items-center justify-content-between">
				<div class="d-flex ">
					<el-input v-model="topicForm.name" placeholder="输入科普知识名称" style="width: 250px;" size="medium" class="mr-3"></el-input>
					<el-button type="primary" size="medium" @click="search">搜索</el-button>
					<el-button size="medium" @click="reset">还原搜索</el-button>
				</div>
				<el-button type="warning" size="medium" @click="save">保存</el-button>
			</el-header>
			<el-container>
				<el-aside style="position: absolute;top: 60px;left: 0;bottom: 60px;" class="bg-white border-right" width="200px">
					<ul class="list-group list-group-flush">
						<li @click="changeTopic(index)" style="cursor: pointer;" :class="{'sum-active':topicIndex===index}"  v-for="(item,index) in topicList" :key="index" class="list-group-item list-group-item-action d-flex align-items-center py-3">
							<span style="font-size: 15px;">{{item.name}}</span>
						</li>
					</ul>
				</el-aside>
				<el-container>
					<el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>{{title}}</span>
							</div>
							<!-- 答卷组件 -->
							<questionItem v-for= "(item,index) in questionList" :key="index" :qIndex="index" :qItem="item" @questionUp="questionUp" @questionDown="questionDown" @questionDel="questionDel" @optionsChange="optionsChange"></questionItem>
						</el-card>
					</el-main>
				</el-container>
			</el-container>
			<!-- 底部 -->
			<el-footer class="border-top d-flex align-items-center px-0">
				<div style="width: 200px;" class="border-right h-100 d-flex align-items-center justify-content-center">
					<el-button-group>
						<el-button size="mini" @click="prev">上一页</el-button>
						<el-button size="mini" @click="next">下一页</el-button>
					</el-button-group>
				</div>
				<div class="pl-3">
					<el-button type="primary" @click="addRadio">添加单选</el-button>
					<el-button type="primary" @click="addCheckbox">添加多选</el-button>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import questionItem from '../../components/common/questionItem.vue'
	export default {
		components:{
			questionItem
		},
		data() {
			return {
				questionList: [],
				topicForm: {
					current: 1,
					pageSize: 10,
					name: ''
				},
				topicTotal: 0,
				maxPage: 0,
				topicIndex: 0,
				topicList: [],
			}
		},
		computed: {
			title() {
				if (this.topicList.length) {
					return this.topicList[this.topicIndex].name
				} else {
					return '未选择科普知识'
				}
			}
		},
		methods:{
			optionsChange(e) {
				if (e.type==='radio') {
					this.questionList[e.index].answer = ''
				} else if (e.type==='checkbox') {
					this.questionList[e.index].answerArr = []
				}
			},
			save() {
				if (this.questionList.length===0) return this.$message.error(`您未添加题目,无法保存`)
				for (let i=0;i<this.questionList.length;i++) {
					if (this.questionList[i].type==='radio' && this.questionList[i].answer === '') {
						return this.$message.error(`第${i+1}题未选择答案,无法保存`)
					} else if (this.questionList[i].type==='checkbox' && this.questionList[i].answerArr.length === 0) {
						return this.$message.error(`第${i+1}题未选择答案,无法保存`)
					}
				}
				this.axios.post('/admin/savequestion',{id: this.topicList[this.topicIndex].id,list: JSON.stringify(this.questionList)},{token:true,loading:true}).then(res=>{
					this.$message(res.data.msg)
					this.topicList[this.topicIndex].list = JSON.stringify(this.questionList);
				})
				
			},
			search() {
				this.getTopicList()
			},
			reset() {
				this.topicForm.name = ''
				this.getTopicList()
			},
			changeTopic(index) {
				this.topicIndex = index
				if (this.topicList[this.topicIndex].list) {
					this.questionList =  JSON.parse(this.topicList[this.topicIndex].list)
				} else {
					this.questionList = []
				}
			},
			prev() {
				if (this.topicForm.current === 1) return this.$message('没有上一页了');
				this.topicForm.current--
				this.getTopicList()
			},
			next() {
				if (this.topicForm.current === this.topicTotal) return this.$message('没有下一页了');
				this.topicForm.current++
				this.getTopicList()
			},
			getTopicList() {
				this.topicForm.name = this.topicForm.name.trim().replace(/\s+/g,' ')
				this.axios.post('/admin/gettopicqlist',this.topicForm,{token:true,loading:true}).then(res=>{
					if (res.data.data.list.length === 0) return this.$message('没有查询到数据')
					this.topicForm.current = res.data.data.current
					this.topicTotal = res.data.data.maxPage
					this.topicList = res.data.data.list
					this.topicIndex = 0
					if (this.topicList[this.topicIndex].list) {
						this.questionList =  JSON.parse(this.topicList[this.topicIndex].list)
					} else {
						this.questionList = []
					}
				})
			},
			questionUp(e) {
				if (e===0) return this.$message('无法上移了')
				let temp = this.questionList[e];
				this.$set(this.questionList,e,this.questionList[e-1]);
				this.$set(this.questionList,e-1,temp);
			},
			questionDown(e) {
				if(e==this.questionList.length-1) return this.$message("无法再下移了");
				var temp = this.questionList[e];
				this.$set(this.questionList,e,this.questionList[e+1]);
				this.$set(this.questionList,e+1,temp);
			},
			questionDel(e) {
				this.questionList.splice(e,1);
			},
			addRadio() {
				this.questionList.push({
					title: '新问题',
					type: 'radio',
					options: [
						{name: '选项一'},
						{name: '选项二'},
						{name: '选项三'},
					],
					answer: '',
					answerArr: [],
				})
			},
			addCheckbox() {
				this.questionList.push({
					title: '新问题',
					type: 'checkbox',
					options: [
						{name: '选项一'},
						{name: '选项二'},
						{name: '选项三'},
					],
					answer: '',
					answerArr: [],
				})
			}
		},
		created() {
			this.getTopicList()
		}
	}
</script>

<style>
	.sum-active{
		color: #67c23a!important;
		background-color: #f0f9eb;
		border-color: #c2e7b0!important;
	}
</style>
