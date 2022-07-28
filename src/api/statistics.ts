import request from '@/plugins/request'

// 任务完成统计数字
export function taskFinishPage() {
  return request({
    url: '/duty/dutyPlan/taskFinishPage',
    method: 'post',
  })
}
// 任务完成统计列表
export function taskFinishPageList(data: any) {
  return request({
    url: '/duty/dutyPlan/taskFinishPageList',
    method: 'post',
    data,
  })
}
// 单位得牌统计列表
export function deptCardPage(data: any) {
  return request({
    url: '/duty/dutyPlan/deptCardPage',
    method: 'post',
    data,
  })
}
