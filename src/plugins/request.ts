import axios from 'axios'
import config from '@/config'
import { message } from 'ant-design-vue'
import * as util from '@/libs/util'
const env: any = import.meta.env.VITE_ENV

const baseUrl = config.baseUrl[env]
// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    const openid = util.getCookie('token') || false
    if (openid) {
      config.headers['Authorization'] =
        util.getCookie('token_type') + ' ' + openid
    }
    // config.headers.orgId = '22'
    return config
  },
  (error: any) => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    switch (response.data.code) {
      case 401:
        message.error(response.data.msg)
        return Promise.reject(response)
    }
    return Promise.resolve(response.data.data)
  },
  (error: any) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
