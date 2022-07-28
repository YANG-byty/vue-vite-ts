import request from '@/plugins/request'

//树根据组织名称查询组织
export function treeLikeNameListOrg(data: any) {
  return request({
    url: '/user/org/imTreeListWithUserNum',
    method: 'post',
    data,
  })
}
//树根据组织名称查询组织和用户
export function treeLikeUserorg(data: string) {
  return request({
    url: '/user/org/getOrgTreeAndUserByLikeName',
    method: 'get',
    params: data,
  })
}
//树根据父级id查询组织和组织人数
export function treeListWithUserNumOrg(data: any) {
  return request({
    url: '/user/org/imTreeListWithUserNum',
    method: 'post',
    data,
  })
}

// 法人单位列表
//192.168.1.237:9527/user/org/getUnitList?page=1&size=1
export function getOrgUnitList(data: any) {
  return request({
    url: '/user/org/getUnitList',
    method: 'get',
    params: data,
  })
}

// 单位列表
export function getOrgAreaOrgList(data: any) {
  return request({
    url: '/duty/orgUnit/getLoginUserUnitList',
    method: 'get',
    params: data,
  })
}
// 组织部室
// id=1405713367427043331
export function treeListWithUserNum(data: any) {
  return request({
    url: '/user/org/treeListWithUserNum',
    method: 'post',
    data,
  })
}
// 获取当前人所在单位
export function getUnitOrg() {
  return request({
    url: '/user/orgUser/getUnitOrg',
    method: 'get',
  })
}
