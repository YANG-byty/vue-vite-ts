<template>
  <Layout>
    <Header menu="/stayAudit" />
    <Content style="display: flex">
      <Sider width="208" class="left-sider">
        <Menu
          :active-name="router.currentRoute.value.path"
          width="256"
          @on-select="selectPage"
        >
          <MenuItem name="/submissionAudit/stayAudit"> 待我审核 </MenuItem>
          <MenuItem name="/submissionAudit/allAudit"> 全部审核 </MenuItem>
        </Menu>
      </Sider>
      <Content class="content-right">
        <div class="common-content">
          <div
            class="mt20"
            v-if="routeList.includes(router.currentRoute.value.path)"
          ></div>
          <div class="mt20 flexFlex return-box" v-else>
            <Button class="returnBtn" @click="router.go(-1)">
              <Icon type="md-return-left" style="margin-right: 5px" />返回
            </Button>
            <span class="metaTitle">{{
              router.currentRoute.value.meta.title
            }}</span>
          </div>
          <router-view />
        </div>
      </Content>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      routeList: ['/submissionAudit/stayAudit', '/submissionAudit/allAudit'],
    })
    const methods = {
      selectPage(path: string) {
        if (path == router.currentRoute.value.path) return
        router.replace(path)
      },
    }
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
