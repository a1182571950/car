export default {
	logo: '后台管理系统',
	navBar: {
		active: '0',
		list: [
			{
				name:'首页',
				subActive: '0',
				submenu: [
					{
						icon: 'el-icon-s-home',
						name: '后台首页',
						pathname: 'index'
					},
					{
						icon: 'el-icon-user-solid',
						name: '用户列表',
						pathname: 'index_user-list'
					},
					{
						icon: 'el-icon-circle-plus',
						name: '创建用户',
						pathname: 'index_user-create'
					},
					{
						icon: 'el-icon-s-cooperation',
						name: '机构列表',
						pathname: 'index_org-list'
					},
					{
						icon: 'el-icon-s-claim',
						name: '机构审核',
						pathname: 'index_check'
					},
					{
						icon: 'el-icon-user',
						name: '管理员列表',
						pathname: 'index_admin-list'
					},
					{
						icon: 'el-icon-circle-plus',
						name: '添加管理员',
						pathname: 'index_admin-create'
					},
					{
						icon: 'el-icon-s-tools',
						name: '管理员设置',
						pathname: 'index_admin-edit'
					},
					// {
					// 	icon: 'el-icon-circle-plus',
					// 	name: '测试页面',
					// 	pathname: 'index_test'
					// }
				]
			},
			{
				name:'活动管理',
				subActive: '0',
				submenu: [
					{
						icon: 'el-icon-s-order',
						name: '活动列表',
						pathname: 'act_list'
					},
					{
						icon: 'el-icon-edit',
						name: '活动编辑',
						pathname: 'act_edit'
					},
					{
						icon: 'el-icon-picture',
						name: '活动图片',
						pathname: 'act_img'
					},
					{
						icon: 'el-icon-circle-plus',
						name: '添加活动',
						pathname: 'act_create'
					},
					{
						icon: 'el-icon-s-comment',
						name: '活动评论',
						pathname: 'act_comment'
					}
				]
			},
			{
				name:'科普知识',
				subActive: '0',
				submenu: [
					{
						icon: 'el-icon-tickets',
						name: '知识列表',
						pathname: 'topic_list'
					},
					{
						icon: 'el-icon-document-add',
						name: '添加知识',
						pathname: 'topic_create'
					},
					{
						icon: 'el-icon-edit',
						name: '题目编辑',
						pathname: 'topic_question'
					}
				],
			},
			{
				name:'捐赠管理',
				subActive: '0',
				submenu: [
					{
						icon: 'el-icon-tickets',
						name: '捐赠列表',
						pathname: 'donate_list'
					},
					{
						icon: 'el-icon-s-promotion',
						name: '活动捐赠列表',
						pathname: 'donate_donate-act'
					},
					{
						icon: 'el-icon-present',
						name: '捐赠等级',
						pathname: 'donate_grade'
					}
				],
			},
		]
	}
}