import { clientToken, getLoginUserInfo } from '@/api/login'
import * as util from '@/libs/util'

const user = {
  // namespaced: true, //开启命名空间
  actions: {
    login({ dispatch }: any, params: any) {
      return new Promise((resolve: any, reject: any) => {
        clientToken(params)
          .then(async (res: any) => {
            console.log(res)
            util.setCookie('nick_name', res.nick_name)
            util.setCookie('user_id', res.user_id)
            util.setCookie('token', res.access_token)
            util.setCookie('token_type', res.token_type)
            // 设置用户信息
            await dispatch('getUserInfo')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getLoginUserInfo()
          .then(async (res: any) => {
            util.setCookie('authName', res.nickName)
            util.setCookie('org_name', res.orgName)
            util.setCookie('user_id', res.userId)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}

export default user
