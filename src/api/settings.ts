import request from '@/plugins/request'

/* ----------单位分组管理--------- */

// 单位分组列表
export function groupPageList(data: any) {
  return request({
    url: '/duty/group/pageList',
    method: 'get',
    params: data,
  })
}
// 单位分组删除
export function groupDel(data: any) {
  return request({
    url: '/duty/group/del',
    method: 'get',
    params: data,
  })
}
// 单位分组新增
export function addGroup(data: any) {
  return request({
    url: '/duty/group',
    method: 'post',
    data,
  })
}
// 单位分组编辑
export function groupEdit(data: any) {
  return request({
    url: '/duty/group/edit',
    method: 'post',
    data,
  })
}

// 分组内单位列表
export function pageGroupUnitList(data: any) {
  return request({
    url: '/duty/groupUnit/pageGroupUnitList',
    method: 'get',
    params: data,
  })
}
// 分组内单位删除
export function pageGroupUnitDel(data: any) {
  return request({
    url: '/duty/groupUnit/del',
    method: 'get',
    params: data,
  })
}
// 分组内单位新增
export function addGroupUnit(data: any) {
  return request({
    url: '/duty/groupUnit',
    method: 'post',
    data,
  })
}

/* ----------系统租户管理--------- */

// 单位租户列表
export function tenantPageList(data: any) {
  return request({
    url: '/duty/tenant/pageList',
    method: 'get',
    params: data,
  })
}
// 添加租户
export function addTenant(data: any) {
  return request({
    url: '/duty/tenant',
    method: 'post',
    data,
  })
}
// 移除租户
export function delTenant(data: any) {
  return request({
    url: '/duty/tenant/del',
    method: 'get',
    params: data,
  })
}
// 租户管理员列表
export function tenantAdminPageList(data: any) {
  return request({
    url: '/duty/tenantAdmin/pageList',
    method: 'get',
    params: data,
  })
}
// 移除管理员
export function tenantAdminDel(data: any) {
  return request({
    url: '/duty/tenantAdmin/del',
    method: 'get',
    params: data,
  })
}
// 新增租户管理员
export function addTenantAdmin(data: any) {
  return request({
    url: '/duty/tenantAdmin',
    method: 'post',
    data,
  })
}

/* ----------报送人员设置--------- */

// 报送人员列表
export function tenantUnitUserPageList(data: any) {
  return request({
    url: '/duty/tenantUnitUser/pageList',
    method: 'get',
    params: data,
  })
}
// 报送人员设置
export function tenantUnitUserPeopleSet(data: any) {
  return request({
    url: '/duty/tenantUnitUser/peopleSet',
    method: 'post',
    data,
  })
}

/* ----------监督关系设置--------- */

// 负责单位列表
export function orgUnitPageList(data: any) {
  return request({
    url: '/duty/orgUnit/pageList',
    method: 'get',
    params: data,
  })
}
// 负责单位移除
export function orgUnitDel(data: any) {
  return request({
    url: '/duty/orgUnit/del',
    method: 'get',
    params: data,
  })
}
// 负责单位添加
export function addOrgUnit(data: any) {
  return request({
    url: '/duty/orgUnit',
    method: 'post',
    data,
  })
}
// 单位组织树
export function getGroupUnitList() {
  return request({
    url: '/duty/group/getGroupUnitList',
    method: 'get',
  })
}

/* ----------租户信息配置--------- */

// 对应报送单位列表
export function tenantUnitPageList(data: any) {
  return request({
    url: '/duty/tenantUnit/pageList',
    method: 'get',
    params: data,
  })
}
//  移除租户单位
export function tenantUnitDel(data: any) {
  return request({
    url: '/duty/tenantUnit/del',
    method: 'get',
    params: data,
  })
}
// 添加租户单位
export function addTenantUnit(data: any) {
  return request({
    url: '/duty/tenantUnit',
    method: 'post',
    data,
  })
}
