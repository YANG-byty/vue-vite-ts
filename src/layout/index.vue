<template>
  <Layout>
    <Header menu="/unitGroup" />
    <Content style="display: flex">
      <Sider width="208" class="left-sider">
        <Menu
          :active-name="router.currentRoute.value.path"
          width="256"
          @on-select="selectPage"
        >
          <MenuItem name="/systemSettings/unitGroup"> 单位分组管理 </MenuItem>
          <MenuItem name="/systemSettings/personnelSetting">
            报送人员设置
          </MenuItem>
          <MenuItem name="/systemSettings/relationSetting">
            监督关系设置
          </MenuItem>
          <MenuItem name="/systemSettings/correspondenceUnit">
            租户信息配置
          </MenuItem>
          <MenuItem name="/systemSettings/manager"> 系统租户管理</MenuItem>
        </Menu>
      </Sider>
      <Content class="content-right">
        <div class="common-content">
          <div class="mt20"></div>
          <router-view />
        </div>
      </Content>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch, computed } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      menuAllList: computed(() => {
        return store.state.menuAllList
      }),
    })
    const methods = {
      selectPage(path: string) {
        if (path == router.currentRoute.value.path) return
        router.replace(path)
      },
    }
    watch(
      () => state.menuAllList,
      (val: any, oldVal: any) => {}
    )
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
      router,
    }
  },
}
</script>

<style lang="less" scoped></style>
