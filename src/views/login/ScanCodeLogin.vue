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
          <!-- <img
            src="@/assets/images/phone.png"
            alt=""
            @click="loginBoxShow"
            class="back"
          /> -->
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
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const refForm = ref()
    const state = reactive({
      zzdAuthUrl: '',
    })
    const methods = {
      loginBoxShow() {
        router.replace({ name: 'passWordLogin' })
      },
    }
    onMounted(() => {
      window.addEventListener('message', (event) => {
        // 这里的event.data 就是登录成功的信息
        // 数据格式：{ "code": "aaaa", "state": "bbbb" }
        console.log(event)
        if (event.data.code) {
          const code = router.currentRoute.value.query.code
          if (code) {
            // 正常登录进来
            let params = {
              code,
              // redirect_uri: config.Setting.OAUTH_REDIRECT_URI,
            }
            store.dispatch('login', params).then(() => {
              util.setCookie('plantformTag', 2)
              router.replace('/')
            })
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
