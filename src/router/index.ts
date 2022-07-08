import { createRouter, createWebHistory } from 'vue-router'
import ViewUIPlus from 'view-ui-plus'

import * as util from '@/libs/util'

import config from '@/config'

// 路由数据
import routes from './routes'
let env: any = import.meta.env

// 导出路由 在 main.js 里使用
const router = createRouter({
  routes,
  history: createWebHistory(env.VITE_BASE_URL),
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to: any, from: any, next) => {
  if (config.Setting.showProgressBar) ViewUIPlus.LoadingBar.start()
  const token = util.getCookie('token')
  //判断是否有标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 不需要登录的页面直接放行
  if (to.meta.noAuth) {
    return next()
  }
  if (token && token !== 'undefined') {
    return next()
  } else {
    // 没有登录的时候跳转到登录界面
    // 携带上登陆成功之后需要跳转的页面完整路径
    next({
      name: 'login',
    })
  }
})

router.afterEach((to: any) => {
  if (config.Setting.showProgressBar) ViewUIPlus.LoadingBar.finish()
  // 多页控制 打开新的页面
  // 更改标题
  // util.title({
  //   title: to.meta.title,
  // })
  // 返回页面顶端
  window.scrollTo(0, 0)
})

export default router
