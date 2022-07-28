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

// 扫码登录
export function login(data: any) {
  return request({
    url: '/sys/login',
    method: 'get',
    params: data,
  })
}

//浙政钉打开静默登录
export function zzdExemptLogin(code: any) {
  return request({
    url: '/exemptLogin/' + code,
    method: 'get',
    // noAuth: true,
  })
}
