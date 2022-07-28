import request from '@/plugins/request'

/* ----------报送计划--------- */

// 获取单位报送人员列表
export function getUnitUserList(data: any) {
  return request({
    url: '/duty/tenantUnitUser/getUnitUserList',
    method: 'post',
    data,
  })
}

// 列表
export function dutyPlanPage(data: any) {
  return request({
    url: '/duty/dutyPlan/page',
    method: 'post',
    data,
  })
}
// 新增
export function addTutyPlan(data: any) {
  return request({
    url: '/duty/dutyPlan/add',
    method: 'post',
    data,
  })
}
// 编辑
export function dutyPlanUpdate(data: any) {
  return request({
    url: '/duty/dutyPlan/update',
    method: 'post',
    data,
  })
}
// 详情
export function dutyPlanGetDetails(data: any) {
  return request({
    url: '/duty/dutyPlan/getDetails',
    method: 'get',
    params: data,
  })
}
// 删除
export function dutyPlanDel(data: any) {
  return request({
    url: '/duty/dutyPlan/del',
    method: 'get',
    params: data,
  })
}
// 作废
export function dutyPlanCancel(data: any) {
  return request({
    url: '/duty/dutyPlan/cancel',
    method: 'get',
    params: data,
  })
}

/* ----------报送任务--------- */

// 列表
export function dutyPlanTaskPage(data: any) {
  return request({
    url: '/duty/dutyPlan/taskPage',
    method: 'post',
    data,
  })
}
// 删除
export function planTaskDel(data: any) {
  return request({
    url: '/duty/planTask/del',
    method: 'get',
    params: data,
  })
}
/* ----------逾期报送--------- */

// 列表
export function overTimeTaskPage(data: any) {
  return request({
    url: '/duty/dutyPlan/overTimeTaskPage',
    method: 'post',
    data,
  })
}

/* ----------待我报送--------- */

// 列表
export function planTaskMyPage(data: any) {
  return request({
    url: '/duty/planTask/myPage',
    method: 'post',
    data,
  })
}

// 任务详情
export function planTaskDetail(data: any) {
  return request({
    url: '/duty/dutyPlan/getTaskDetails',
    method: 'get',
    params: data,
  })
}
// 报送详情
export function getReportByTaskId(data: any) {
  return request({
    url: '/duty/dutyPlan/getReportByTaskId',
    method: 'get',
    params: data,
  })
}
// 审核
export function updateApproval(data: any) {
  return request({
    url: '/duty/planTask/updateApproval',
    method: 'post',
    data,
  })
}
// 审核
export function stepOneNode(data: any) {
  return request({
    url: '/duty/planTask/stepOneNode',
    method: 'post',
    data,
  })
}
// 提交审核
export function submitApproval(data: any) {
  return request({
    url: '/duty/planTask/submitApproval',
    method: 'post',
    data,
  })
}
// 保存
export function planTaskUpdate(data: any) {
  return request({
    url: '/duty/planTask/update',
    method: 'post',
    data,
  })
}
// 修改得牌信息
export function updateCard(data: any) {
  return request({
    url: '/duty/planTask/updateCard',
    method: 'post',
    data,
  })
}

/* ----------全部报送--------- */

// 列表
export function planTaskAllPage(data: any) {
  return request({
    url: '/duty/planTask/allPage',
    method: 'post',
    data,
  })
}

/* ----------报送审核--------- */

// 待我审核列表
export function approvalTaskPage(data: any) {
  return request({
    url: '/duty/dutyPlan/approvalTaskPage',
    method: 'post',
    data,
  })
}
// 全部审核列表
export function allApprovalTaskPage(data: any) {
  return request({
    url: '/duty/dutyPlan/allApprovalTaskPage',
    method: 'post',
    data,
  })
}
