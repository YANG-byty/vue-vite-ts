import request from '../plugins/request'

/**
 * 待审核任务数量
 */
export const pendApprovalTask = () => {
  return request({
    url: '/duty/dutyPlan/pendApprovalTask',
    method: 'post',
  })
}
/**
 * 待处理任务数量
 */
export const todoTask = () => {
  return request({
    url: '/duty/planTask/todoTask',
    method: 'post',
  })
}

/**
 * 获取所有菜单（正式+灰度）
 * @param {*} params
 */
export const getAllMenuList = () => {
  return request({
    url: '/home/menu/getAllMenuList',
    method: 'get',
  })
}

//获取当前用户的菜单
export function getUserMenus(params: any) {
  return request({
    url: '/duty/current/user/menu',
    method: 'get',
    params,
  })
}

//获取当前用户的权限点
export function getUserPerms() {
  return request({
    url: '/duty/current/user/perms',
    method: 'get',
  })
}
