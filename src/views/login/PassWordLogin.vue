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
      <!--登录-->
      <div class="login box">
        <div class="scan-code" @click="scanCodeBoxShow">
          <img src="@/assets/images/code.png" alt="" />
        </div>
        <div class="title">用户密码登录</div>
        <div class="login-form">
          <Form :model="loginForm" ref="refForm" :rules="loginFormRules">
            <FormItem prop="userName">
              <i class="iconfont icon-yonghuming"></i>
              <span class="textPhone">用户名</span>
              <span class="line"></span>
              <Input
                placeholder="请输入用户名"
                v-model.trim="loginForm.userName"
                maxlength="11"
              >
              </Input>
            </FormItem>
            <FormItem prop="passWord">
              <i class="iconfont icon-mima"></i>
              <span class="textPhone">密码</span>
              <span class="line"></span>
              <Input
                placeholder="请输入密码"
                v-model.trim="loginForm.passWord"
                maxlength="11"
              >
              </Input>
            </FormItem>
            <div class="login-btn">
              <Button
                type="primary"
                long
                @click="bindTelBoxShow"
                :loading="isLoadding"
                >登录
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, ref } from 'vue'
import * as util from '@/libs/util'
import router from '@/router'
export default {
  setup() {
    const refForm = ref()
    const state = reactive({
      loginForm: {},
      loginFormRules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        passWord: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
        ],
      },
      isLoadding: false,
    })
    const methods = {
      // 登录
      bindTelBoxShow() {
        refForm.value.validate((valid: any) => {
          if (valid) {
            util.debounce(
              state,
              () => {
                state.isLoadding = true
                console.log(state.loginForm)
                // this.login(state.loginForm)
                //   .then(() => {
                //     state.isLoadding = false
                //     router.replace({ name: 'home' })
                //   })
                //   .catch(() => {
                //     state.isLoadding = false
                //   })
              },
              200
            )
          }
        })
      },
      scanCodeBoxShow() {
        router.replace({ name: 'scanCodeLogin' })
      },
    }

    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
      refForm,
    }
  },
}
</script>
<!--
<script src="./script.js"></script>
-->
<style src="@/assets/css/login.less" lang="less"></style>
