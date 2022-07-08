import request from '@/plugins/request'
export function clientToken(data: any) {
  return request({
    url: '/duty/auth/client/token',
    method: 'post',
    data,
  })
}
export function getLoginUserInfo() {
  return request({
    url: '/user/user/getUserLoginInfo',
    method: 'get',
  })
}
