<template>
  <div>
    <Drawer
      title="操作日志"
      v-model="visible"
      width="700"
      :before-close="beforeClose"
    >
      <div class="common-table table">
        <div class="table">
          <Table
            :columns="columns"
            :data="logList"
            :loading="loading"
            maxHeight="580"
          >
            <template #processId="{ row }">
              <span class="text-decoration">
                <span>{{ row.processId }}</span>
              </span>
            </template>
            <template #statusHide="{ row }">
              <span :class="row.class">{{ row.statusHide }}</span>
            </template>
          </Table>
        </div>
      </div>
      <!-- <div class="common-page align-right">
        <Page :total="total" show-sizer show-elevator show-total />
      </div> -->
    </Drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from 'vue'
import { metaExecuteLogList } from '@/api/tuby'
export default {
  props: ['value', 'id'],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      total: 0,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '操作时间',
          key: 'createTime',
          align: 'center',
        },
        {
          title: '操作类型',
          key: 'content',
          align: 'center',
        },
        {
          title: '操作用户',
          key: 'otherContent',
          align: 'center',
        },
      ],
      logList: <any>[],
      id: '',
    })
    const methods = {
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
      // 查询列表
      getDataList() {
        state.loading = true
        metaExecuteLogList({ id: state.id }).then((res: any) => {
          state.logList = res || []
          state.loading = false
        })
      },
      // // 分页
      // pageCurrentChangeHandle(data: number) {
      //   state.params.page = data
      //   methods.getDataList()
      // },
      // // 翻页
      // pageSizeChangeHandle(data: number) {
      //   state.params.limit = data
      //   methods.getDataList()
      // },
    }
    watch([() => props.value, () => props.id], (newVal: any, oldVal: any) => {
      //此时返回的是数组,按下标获取对应值
      state.visible = newVal[0]
      if (newVal[0]) {
        state.id = props.id
        // methods.getDataList()
      }
    })
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
.info-title {
  padding-left: 0 !important;
}
</style>
