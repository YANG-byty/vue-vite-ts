<template>
  <div class="common-table">
    <Table :columns="columns" :loading="loading" :data="dataList">
      <template #per="{ row }">
        <span class="blue-tag">{{ row.per }}</span>
      </template>
      <template #action="{ row }">
        <div class="table-action">
          <span @click="perSeting(row)">
            <i class="iconfont icon-iconshezhi" />
            人员设置</span
          >
        </div>
      </template>
    </Table>
  </div>
  <div class="common-page align-right">
    <Page
      :total="total"
      show-sizer
      show-elevator
      show-total
      @on-change="pageCurrentChangeHandle"
      @on-page-size-change="pageSizeChangeHandle"
    />
  </div>
  <!-- 选择人员 -->
  <select-user
    :value="showSelectUser"
    @closeChange="closeChange"
    @setUserList="setUserList"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch } from 'vue'
import SelectUser from '@/components/SelectUser.vue'
export default {
  components: { SelectUser },
  setup() {
    const state = reactive({
      showSelectUser: false,
      dataList: [
        {
          taskName: '莲都区纪委监察委',
          per: '张三',
        },
      ],
      total: 0,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          type: 'index',
          title: '序号',
          align: 'center',
          width: 100,
        },
        {
          title: '报送单位',
          key: 'taskName',
          align: 'left',
          minWidth: 150,
        },
        {
          title: '填报人员',
          slot: 'per',
          align: 'left',
          minWidth: 150,
        },
        {
          title: '备注',
          key: 'remark',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 150,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 150,
        },
      ],
    })
    const methods = {
      // 获取用户
      setUserList(val: any) {
        console.log(val)
      },
      // 关闭
      closeChange(val: boolean) {
        state.showSelectUser = val
      },
      // 点击人员设置
      perSeting(row: any) {
        state.showSelectUser = true
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
      },
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped></style>
