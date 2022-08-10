// 任务管理
const taskPlan = <any>{
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
    {
      path: '/submissionTask/stayDetail',
      name: 'submissionTask/stayDetail',
      meta: {
        title: '报送详情',
      },
      component: () =>
        import('@/views/task-management/submission-task/StayDetail.vue'),
    },
  ],
}
// 报送管理
const stayFill = <any>{
  path: '/submissionManagement/stayFill',
  name: 'submissionManagement/stayFill',
  redirect: '/submissionManagement/stayFill',
  component: () => import('@/views/submission-management/index.vue'),
  children: [
    {
      path: '/submissionManagement/stayFill',
      name: 'submissionManagement/stayFill',
      meta: {
        title: '待我报送',
      },
      component: () =>
        import('@/views/submission-management/stay-fill/index.vue'),
    },
    {
      path: '/submissionManagement/allTask',
      name: 'submissionManagement/allTask',
      meta: {
        title: '全部报送',
      },
      component: () =>
        import('@/views/submission-management/all-task/index.vue'),
    },
    {
      path: '/stayFill/detail',
      name: 'stayFill/detail',
      meta: {
        title: '报送详情',
      },
      component: () =>
        import('@/views/submission-management/stay-fill/Detail.vue'),
    },
    {
      path: '/stayFill/apply',
      name: 'stayFill/apply',
      meta: {
        title: '编辑报送',
      },
      component: () =>
        import('@/views/submission-management/stay-fill/Apply.vue'),
    },
    {
      path: '/stayFill/taskDetail',
      name: 'stayFill/taskDetail',
      meta: {
        title: '任务详情',
      },
      component: () =>
        import('@/views/submission-management/stay-fill/TaskDetail.vue'),
    },
  ],
}
// 报送审核
const stayAudit = <any>{
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
      component: () => import('@/views/submission-audit/stay-audit/index.vue'),
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
      path: '/submissionAudit/Detail',
      name: 'submissionAudit/Detail',
      meta: {
        title: '报送详情',
      },
      component: () => import('@/views/submission-audit/all-audit/Detail.vue'),
    },
    {
      path: '/submissionAudit/taskDetail',
      name: 'submissionAudit/taskDetail',
      meta: {
        title: '任务详情',
      },
      component: () =>
        import('@/views/submission-audit/all-audit/TaskDetail.vue'),
    },
  ],
}
// 数据统计
const dataStatistics = <any>{
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
}
// 系统设置
const systemSettings = <any>{
  // path: '/content',
  // name: 'content',
  path: '/systemSettings/unitGroup',
  name: 'systemSettings/unitGroup',
  // redirect: '/systemSettings/unitGroup',
  // component: () => import('@/layout/index.vue'),
  component: () => import('@/views/system-settings/index.vue'),
  children: [
    {
      path: '/systemSettings/unitGroup',
      name: 'systemSettings/unitGroup',
      component: () => import('@/views/system-settings/unit-group/index.vue'),
    },
    {
      path: '/systemSettings/personnelSetting',
      name: 'systemSettings/personnelSetting',
      component: () =>
        import('@/views/system-settings/personnel-setting/index.vue'),
    },
    {
      path: '/systemSettings/relationSetting',
      name: 'systemSettings/relationSetting',
      component: () =>
        import('@/views/system-settings/relation-setting/index.vue'),
    },
    {
      path: '/systemSettings/correspondenceUnit',
      name: 'systemSettings/correspondenceUnit',
      component: () =>
        import('@/views/system-settings/correspondence-unit/index.vue'),
    },
    {
      path: '/systemSettings/manager',
      name: 'systemSettings/manager',
      component: () => import('@/views/system-settings/manager/index.vue'),
    },
  ],
}

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
          title: '主体责任落实平台',
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  taskPlan,
  stayFill,
  stayAudit,
  dataStatistics,
  systemSettings,
  // 测试 237 环境登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  // 浙政钉环境登录
  {
    path: '/zzdOpenLogin',
    name: 'zzdOpenLogin',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import('@/views/login/ZzdOpenLogin.vue'),
  },
  // 浙政钉环境 密码登录
  {
    path: '/passWordLogin',
    name: 'passWordLogin',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import('@/views/login/PassWordLogin.vue'),
  },
  // 浙政钉环境 扫码登录
  {
    path: '/scanCodeLogin',
    name: 'scanCodeLogin',
    meta: {
      title: '登录',
      noAuth: true,
    },
    component: () => import('@/views/login/ScanCodeLogin.vue'),
  },
]

export default Router
