<template>
  <div class="login-wrap-box">
    <div class="login-cont">
      <div class="titleBox">
        <img
          src="../../assets/images/logo.png"
          alt=""
          style="width: 42px; margin: 0 10px"
        />
        <div>主体责任落实平台登录</div>
      </div>
      <!--扫码登录-->
      <div class="register box">
        <div class="titleBack">
          <img
            src="@/assets/images/phone.png"
            alt=""
            @click="loginBoxShow"
            class="back"
          />
        </div>
        <div class="code-box">
          <!-- <p class="zzdTitle">浙政钉<span style="color:#999">扫码登录</span></p> -->
          <iframe
            id="zzdAuthiframe"
            frameborder="0"
            :src="zzdAuthUrl"
            height="320px"
          ></iframe>
          <!-- <p class="txt"><span style="color:#999">请打开</span>浙政钉<span style="color:#999">扫一扫登录</span></p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, ref } from 'vue'
import * as util from '@/libs/util'
import router from '@/router'
import config from '@/config'
export default {
  setup() {
    const refForm = ref()
    const state = reactive({
      zzdAuthUrl: '',
      isbind: '',
      loginBox: true,
      scanCodeBox: false,
    })
    const methods = {
      createdFn() {
        console.log(router.currentRoute.value.query)
        let isbind = <any>router.currentRoute.value.query.isbind
        if (isbind == 2 || isbind == 3) {
          state.zzdAuthUrl = <string>(
            config.Setting.ZZD_OAUTH_REDIRECT_URI_reBind
          )
        } else {
          state.zzdAuthUrl = <string>config.Setting.ZZD_OAUTH_REDIRECT_URI
        }

        if (router.currentRoute.value.query.isbind) {
          state.isbind = <any>router.currentRoute.value.query.isbind
          state.loginBox = false
          state.scanCodeBox = true
        } else {
          state.loginBox = true
          state.scanCodeBox = false
        }
      },
      //浙政钉扫码登录
      zzdCodeLogin(code: string) {
        // zzdCode(code).then((res:any) => {
        // if (res.token) {
        //   util.setCookie('token', res.token)
        // }
        //   router.replace({ name: 'home' })
        // })
      },
      loginBoxShow() {
        router.replace({ name: 'passWordLogin' })
      },
    }
    methods.createdFn()
    onMounted(() => {
      window.addEventListener('message', (event) => {
        // 这里的event.data 就是登录成功的信息
        // 数据格式：{ "code": "aaaa", "state": "bbbb" }
        console.log(event)

        if (event.data.code) {
          if (event.data.state == 'login') {
            methods.zzdCodeLogin(event.data.code)
          }
        }
      })
    })
    return {
      ...toRefs(state),
      ...methods,
      refForm,
    }
  },
}
</script>
<style src="@/assets/css/login.less" lang="less"></style>
