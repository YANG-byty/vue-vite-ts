<template>
  <div class="login-wrap">
    <div class="login-logo">主体责任落实平台登录</div>
    <div class="login-box">
      <div>
        <Button size="large" @click="handleSubmit" type="primary">
          浙政钉扫码登录
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import dd from 'gdt-jsapi'

import { useStore } from 'vuex'
import { Spin } from 'view-ui-plus'
import router from '@/router'
export default {
  setup() {
    const store = useStore()
    const state = reactive({})
    const methods = {
      // userLogin(code: string) {
      //   let data = { code: code }
      //   store.dispatch('handleLogin', data).then((res: any) => {
      //     if (res.success) {
      //       router.push({ path: '/home' })
      //     }
      //   })
      // },
      // getUrlValue() {
      //   // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
      //   dd.getAuthCode({
      //     corpId: <string>import.meta.env.VITE_APP_ZH_CN_ID,
      //   })
      //     .then((res) => {
      //       methods.userLogin(res.auth_code)
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // },

      userLogin(code: any) {
        let data = { code: code }
        store.dispatch('handleLogin', data).then((res: any) => {
          Spin.hide()
          if (res.success) {
            window.location.href =
              window.location.protocol + '//' + window.location.host + '/#/home'
            // window.location.href =
            //   window.location.protocol +
            //   "//" +
            //   window.location.host +
            //   process.env.VUE_APP_HOME;
          }
        })
      },
      getUrlValue(name: any) {
        let href = location.href
        return (
          decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
              href
            ) || ['', ''])[1].replace(/\+/g, '%20')
          ) || null
        )
      },
      handleSubmit() {
        methods.userLogin('738816')
        // window.location.href = process.env.VUE_APP_CODE_URL;
      },
    }
    onMounted(() => {
      // methods.getUrlValue()
      console.log(import.meta.env)

      console.log('打印跳转链接')
      let code = methods.getUrlValue('code')
      if (code) {
        Spin.show()
        methods.userLogin(code)
      }
    })

    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less">
@import '@/assets/css/login.less';
</style>
