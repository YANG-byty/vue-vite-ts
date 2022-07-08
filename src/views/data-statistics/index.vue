<template>
  <Layout>
    <Header menu="/accomplishStatistics" />
    <Content style="display: flex">
      <Sider width="208" class="left-sider">
        <Menu
          :active-name="router.currentRoute.value.path"
          width="256"
          @on-select="selectPage"
        >
          <MenuItem name="/dataStatistics/accomplishStatistics">
            任务完成统计
          </MenuItem>
          <MenuItem name="/dataStatistics/UnitsBrand"> 单位得牌统计 </MenuItem>
        </Menu>
      </Sider>
      <Content class="content-right">
        <div class="common-content">
          <div class="mt20 flexFlex">
            <Button class="returnBtn" @click="router.go(-1)">
              <Icon type="md-return-left" style="margin-right: 5px" />返回
            </Button>
            <span class="metaTitle mt20">{{
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
import { reactive, toRefs, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter()
    const state = reactive({})
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
