const Router = [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '主题责任落实平台',
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  // 任务管理
  {
    path: '/taskManagement/taskPlan',
    name: 'taskManagement/taskPlan',
    redirect: '/taskManagement/taskPlan',
    component: () => import('@/views/task-management/index.vue'),
    children: [
      {
        path: '/taskManagement/taskPlan',
        name: 'taskManagement/taskPlan',
        meta: {
          title: '报送计划',
        },
        component: () => import('@/views/task-management/task-plan/index.vue'),
      },
      {
        path: '/taskManagement/submissionTask',
        name: 'taskManagement/submissionTask',
        meta: {
          title: '报送任务',
        },
        component: () =>
          import('@/views/task-management/submission-task/index.vue'),
      },
      {
        path: '/taskManagement/overdueSubmission',
        name: 'taskManagement/overdueSubmission',
        meta: {
          title: '逾期报送',
        },
        component: () =>
          import('@/views/task-management/overdue-submission/index.vue'),
      },
      {
        path: '/taskPlan/detail',
        name: 'taskPlan/detail',
        meta: {
          title: '计划详情',
        },
        component: () => import('@/views/task-management/task-plan/Detail.vue'),
      },
      {
        path: '/taskPlan/apply',
        name: 'taskPlan/apply',
        meta: {
          title: '计划编辑',
        },
        component: () => import('@/views/task-management/task-plan/Apply.vue'),
      },
      {
        path: '/submissionTask/detail',
        name: 'submissionTask/detail',
        meta: {
          title: '任务详情',
        },
        component: () =>
          import('@/views/task-management/submission-task/Detail.vue'),
      },
    ],
  },
  // 报告管理
  {
    path: '/submissionManagement/stayFill',
    name: 'submissionManagement/stayFill',
    redirect: '/submissionManagement/stayFill',
    component: () => import('@/views/submission-management/index.vue'),
    children: [
      {
        path: '/submissionManagement/stayFill',
        name: 'submissionManagement/stayFill',
        meta: {
          title: '待我填报',
        },
        component: () =>
          import('@/views/submission-management/stay-fill/index.vue'),
      },
      {
        path: '/submissionManagement/allTask',
        name: 'submissionManagement/allTask',
        meta: {
          title: '全部任务',
        },
        component: () =>
          import('@/views/submission-management/all-task/index.vue'),
      },
      {
        path: '/allTask/detail',
        name: 'allTask/detail',
        meta: {
          title: '报送详情',
        },
        component: () =>
          import('@/views/submission-management/stay-fill/Detail.vue'),
      },
      {
        path: '/allTask/apply',
        name: 'allTask/apply',
        meta: {
          title: '编辑报送',
        },
        component: () =>
          import('@/views/submission-management/stay-fill/Apply.vue'),
      },
    ],
  },
  // 报送审核
  {
    path: '/submissionAudit/stayAudit',
    name: 'submissionAudit/stayAudit',
    redirect: '/submissionAudit/stayAudit',
    component: () => import('@/views/submission-audit/index.vue'),
    children: [
      {
        path: '/submissionAudit/stayAudit',
        name: 'submissionAudit/stayAudit',
        meta: {
          title: '待我审核',
        },
        component: () =>
          import('@/views/submission-audit/stay-audit/index.vue'),
      },
      {
        path: '/submissionAudit/allAudit',
        name: 'submissionAudit/allAudit',
        meta: {
          title: '全部审核',
        },
        component: () => import('@/views/submission-audit/all-audit/index.vue'),
      },
      {
        path: '/stayAudit/Detail',
        name: 'stayAudit/Detail',
        meta: {
          title: '报送详情',
        },
        component: () =>
          import('@/views/submission-audit/stay-audit/Detail.vue'),
      },
    ],
  },
  // 数据统计
  {
    path: '/dataStatistics/accomplishStatistics',
    name: 'dataStatistics/accomplishStatistics',
    redirect: '/dataStatistics/accomplishStatistics',
    component: () => import('@/views/data-statistics/index.vue'),
    children: [
      {
        path: '/dataStatistics/accomplishStatistics',
        name: 'dataStatistics/accomplishStatistics',
        meta: {
          title: '任务完成统计',
        },
        component: () =>
          import('@/views/data-statistics/AccomplishStatistics.vue'),
      },
      {
        path: '/dataStatistics/UnitsBrand',
        name: 'dataStatistics/UnitsBrand',
        meta: {
          title: '单位得牌统计',
        },
        component: () => import('@/views/data-statistics/UnitsBrand.vue'),
      },
    ],
  },
  // 系统设置
  {
    path: '/systemSettings/unitGroup',
    name: 'systemSettings/unitGroup',
    redirect: '/systemSettings/unitGroup',
    component: () => import('@/views/system-settings/index.vue'),
    children: [
      {
        path: '/systemSettings/unitGroup',
        name: 'systemSettings/unitGroup',
        meta: {
          title: '单位分组管理',
        },
        component: () => import('@/views/system-settings/unit-group/index.vue'),
      },
      {
        path: '/systemSettings/personnelSetting',
        name: 'systemSettings/personnelSetting',
        meta: {
          title: '报送人员设置',
        },
        component: () =>
          import('@/views/system-settings/personnel-setting/index.vue'),
      },
      {
        path: '/systemSettings/relationSetting',
        name: 'systemSettings/relationSetting',
        meta: {
          title: '责任关系设置',
        },
        component: () =>
          import('@/views/system-settings/relation-setting/index.vue'),
      },
      {
        path: '/systemSettings/correspondenceUnit',
        name: 'systemSettings/correspondenceUnit',
        meta: {
          title: '租户对应单位',
        },
        component: () =>
          import('@/views/system-settings/correspondence-unit/index.vue'),
      },
      {
        path: '/systemSettings/manager',
        name: 'systemSettings/manager',
        meta: {
          title: '租户管理人员',
        },
        component: () => import('@/views/system-settings/manager/index.vue'),
      },
    ],
  },
]

export default Router
