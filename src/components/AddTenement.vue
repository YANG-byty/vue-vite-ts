<template>
  <div>
    <Drawer
      title="添加租户"
      v-model="visible"
      width="600"
      :before-close="beforeClose"
    >
      <div class="common-table">
        <div class="table">
          <Table
            :columns="columns"
            :loading="loading"
            :data="dataList"
            maxHeight="580"
          >
            <template #action="{ row }">
              <div class="table-action">
                <span @click="selectTenement(row)">
                  <Icon type="ios-checkmark-circle-outline" />
                  选择</span
                >
              </div>
            </template>
          </Table>
        </div>
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
    </Drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, ref } from 'vue'
import * as requestRefers from '@/api/settings'
import { getOrgUnitList } from '@/api/org'
export default {
  props: ['value', 'id'],
  setup(props, { emit }) {
    const dataFormRef = ref()
    const state = reactive({
      visible: false,
      dataList: <any>[],
      loading: false,
      columns: [
        {
          title: '租户名称',
          key: 'orgName',
          align: 'left',
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 150,
        },
      ],
      total: 0,
      params: {
        size: 10,
        page: 1,
      },
    })
    const methods = {
      selectTenement(row: any) {
        let obj = {
          orgId: row.id,
        }
        requestRefers.addTenant(obj).then(() => {
          emit('selectTenement', row)
        })
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
      getDataList() {
        state.loading = true
        getOrgUnitList(state.params).then((res: any) => {
          state.dataList = res.list
          state.total = res.total
          state.loading = false
        })
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
        methods.getDataList()
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.size = data
        methods.getDataList()
      },
    }
    watch([() => props.value], (newVal: any, oldVal: any) => {
      //此时返回的是数组,按下标获取对应值
      state.visible = newVal[0]
      // methods.getDataList()
    })
    return {
      ...toRefs(state),
      ...methods,
      dataFormRef,
    }
  },
}
</script>

<style lang="less" scoped></style>
