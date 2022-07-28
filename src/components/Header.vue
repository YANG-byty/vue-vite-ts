<template>
  <div>
    <div class="header">
      <div class="left-logo">
        <img src="@/assets/images/logo.png" />主题责任落实平台
      </div>
      <ul class="ul-wrap">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          :class="menu == item.flag ? 'active' : ''"
          @click="tabPage(item.path)"
        >
          {{ item.title }}
          <span v-if="index == 2 || index == 3">3</span>
        </li>
      </ul>
      <div class="right-name">
        <Dropdown @on-click="exitFn">
          <div class="userIcon">
            <i class="iconfont icon-yonghu" />
          </div>
          <span>{{ name }}</span>
          <Icon type="ios-arrow-down" />
          <template #list>
            <DropdownMenu>
              <DropdownItem><Icon type="ios-close-circle" /> 关闭</DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import * as util from '@/libs/util'
export default {
  props: {
    menu: {
      type: String,
      default: '/',
    },
  },
  setup() {
    const store = useStore()

    const state = reactive({
      name: util.getCookie('authName'),
      touterTitle: '',
      tabList: [
        {
          title: '首页',
          flag: '/',
          path: '/',
        },
        {
          title: '任务管理',
          flag: '/taskPlan',
          path: '/taskManagement/taskPlan',
        },
        {
          title: '报送管理',
          flag: '/stayFill',
          path: '/submissionManagement/stayFill',
        },
        {
          title: '报送审核',
          flag: '/stayAudit',
          path: '/submissionAudit/stayAudit',
        },
        {
          title: '数据统计',
          flag: '/accomplishStatistics',
          path: '/dataStatistics/accomplishStatistics',
        },
        {
          title: '系统设置',
          flag: '/unitGroup',
          path: '/systemSettings/unitGroup',
        },
      ],
    })

    const methods = {
      tabPage(path: string) {
        if (path == router.currentRoute.value.path) return
        router.replace(path)
      },
      goHome: () => {
        router.replace('/')
      },
      exitFn: () => {
        window.opener = null
        window.open('about:blank', '_top')?.close()
      },
      goBack: () => {
        router.go(-1)
      },
    }

    watch(
      () => router,
      (to: any, from: any) => {
        console.log(to, from)
      }
    )
    onBeforeMount(() => {})
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped></style>
