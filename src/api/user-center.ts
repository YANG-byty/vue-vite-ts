import request from '@/plugins/request'

//部门刷选人
export function getOrgUsers(data: any) {
  return request({
    url: '/user/orgUser/getOrgUsers',
    method: 'get',
    params: data,
  })
}

//设置分组确定
export function addGroupUser(data: any) {
  return request({
    url: '/user/group/addGroupUser',
    method: 'post',
    data,
  })
}

//获取用户权限
export function userMenu() {
  return request({
    url: '/permission/current/user/menu',
    method: 'get',
  })
}
