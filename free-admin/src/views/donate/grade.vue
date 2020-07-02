<template>
	<div>
		<el-button type="warning" class="mb-3" @click="addGrade">添加等级</el-button>
		<el-table :data="list">
			<el-table-column align="center" label="排序" width="80">
				<template slot-scope="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="等级名称" prop="name" ></el-table-column>
			<el-table-column align="center" label="最低金额" prop="min" ></el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="update(scope.row.id)">修改名称</el-button>
					<el-button plain size="mini" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 修改等级弹窗 -->
		<el-dialog :title="type?'添加等级':'修改等级'" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="等级名称">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="最低金额">
		      <el-input-number v-model="form.min" :min="0" label="最低金额"></el-input-number>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogConfirm">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				dialogFormVisible : false,
				form: {
					name: '',
					min: 0,
				},
				type: 1,
				id: 0,
			}
		},
		methods: {
			addGrade() {
				this.form = {
					name: '',
					min: 0,
				}
				this.type = 1
				this.dialogFormVisible = true
			},
			dialogConfirm() {
				if (!this.type) {
					this.axios.post('/admin/updatedonategrade',{id:this.id,name:this.form.name,min:this.form.min},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.dialogFormVisible = false
						this.getDonateGrade()
					})
				} else {
					this.form.name = this.form.name.trim()
					if (!/^\S{2,10}$/.test(this.form.name)) return this.$message.error('名称在2-10位,不含空格')
					if (!this.form.min) return this.$message.error('金额不能为0')
					this.axios.post('/admin/adddonategrade',this.form,{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return
						this.dialogFormVisible = false
						this.getDonateGrade()
					})
				}
			},
			update(id) {
				this.type = 0
				this.id = id
				let temp = this.list.find(v=>v.id==id)
				this.form.name = temp.name
				this.form.min = temp.min
				this.dialogFormVisible = true
			},
			
			del(id) {
				if (id === 1) return this.$message('您无法删除默认等级')
				this.$confirm('您确定要删除该等级吗','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					this.axios.post('/admin/deldonategrade',{id},{token:true,loading:true}).then(res=>{
						this.$message(res.data.msg)
						if (res.data.errorCode) return;
						this.getDonateGrade()
					})
				}).catch(()=>{})
			},
			getDonateGrade() {
				this.axios.post('/admin/getdonategrade',{},{token:true,loading:true}).then(res=>{
					this.list = res.data.data
				})
			}
		},
		created() {
			this.getDonateGrade()
		}
	}
</script>

<style>
</style>
