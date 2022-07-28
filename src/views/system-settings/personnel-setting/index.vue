<template>
  <div class="common-table">
    <div class="table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template #nickNames="{ row }">
          <span
            class="blue-tag"
            v-if="row.nickNames"
            v-for="item in row.nickNames"
            >{{ item.nickName }}</span
          >
          <span v-else>--</span>
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
    :value="isSelectUser"
    :id="tenantUnitId"
    currentTitle="人员选择"
    @setDataList="setDataList"
    @closeChange="closeChange"
    :userList="userList"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import SelectUser from '@/components/SelectUser.vue'
import * as requestRefers from '@/api/settings'
import { Message } from 'view-ui-plus'
export default {
  components: { SelectUser },
  setup() {
    const state = reactive({
      isSelectUser: false,
      dataList: <any>[],
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
          key: 'orgName',
          align: 'left',
          width: 230,
        },
        {
          title: '填报人员',
          slot: 'nickNames',
          align: 'left',
          // minWidth: 350,
        },
        // {
        //   title: '备注',
        //   key: 'remark',
        //   align: 'left',
        //   ellipsis: true,
        //   tooltip: true,
        //   minWidth: 150,
        // },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 150,
        },
      ],
      tenantUnitId: '',
      userList: <any>[],
    })
    const methods = {
      // 获取已选人员
      setDataList(val: any) {
        console.log(val)
        let userIds = val.map((item: any) => {
          return item.userId
        })
        let obj = {
          tenantUnitId: state.tenantUnitId,
          userIds: userIds,
        }
        requestRefers.tenantUnitUserPeopleSet(obj).then((res) => {
          Message.success('添加成功')
          methods.getDataList()
        })
      },
      // 获取租户管理员列表
      getDataList() {
        state.loading = true
        requestRefers
          .tenantUnitUserPageList(state.params)
          .then((res: any) => {
            state.dataList = res.records
            state.total = res.total
            state.loading = false
          })
          .catch(() => {
            state.loading = false
          })
      },
      // 关闭
      closeChange(val: boolean) {
        state.isSelectUser = val
      },
      // 点击人员设置
      perSeting(row: any) {
        state.tenantUnitId = row.orgId
        state.userList = row.nickNames || []
        state.isSelectUser = true
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
        methods.getDataList()
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
        methods.getDataList()
      },
    }
    // methods.getDataList()
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100vh - 210px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 248px) !important;
  }
}
</style>
