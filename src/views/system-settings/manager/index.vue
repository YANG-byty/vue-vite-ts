<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="width: 510px">
      <div class="disFlexCenter title mt20">
        <div class="">单位租户</div>
        <Button type="primary" @click="addTenementFn"> + 添加租户 </Button>
      </div>
      <div class="content-box">
        <div class="common-table table-one">
          <div class="table">
            <Table
              :columns="groupColumns"
              :loading="groupLoading"
              :data="groupList"
              @on-cell-click="nodeClick"
            >
              <template #action="{ row }">
                <div class="table-action">
                  <span @click="removeTenement(row)">
                    <i class="iconfont icon-yichu" />
                    移除</span
                  >
                </div>
              </template>
            </Table>
          </div>
        </div>
        <div class="common-page align-right">
          <Page
            :total="groupTotal"
            show-sizer
            show-elevator
            show-total
            @on-change="groupPageCurrentChangeHandle"
            @on-page-size-change="groupPageSizeChangeHandle"
          />
        </div>
      </div>
    </div>
    <Form
      ref="dataFormRef"
      :model="dataForm"
      label-position="left"
      :label-width="100"
      class="setting-right"
    >
      <div class="detail-info">
        <div class="navigation">
          {{ groupData.name || '--' }}
        </div>
        <div class="disFlexCenter title mt20">
          <div class="">租户管理员</div>
          <Button type="primary" @click="addUnitFn"> + 添加 </Button>
        </div>
        <div class="content-box">
          <div class="common-table table-two">
            <div class="table">
              <Table :columns="columns" :loading="loading" :data="dataList">
                <template #action="{ row }">
                  <div class="table-action">
                    <span @click="removeUser(row)">
                      <i class="iconfont icon-yichu" />
                      移除
                    </span>
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
        </div>
      </div>
    </Form>
  </div>
  <Modal
    v-model="modalTenement"
    title="移除租户"
    :footer-hide="true"
    :before-close="beforeClose"
  >
    <div class="mt20">
      该操作为高风险操作，如果您移除了该租户，那么该租户下所有的数据信息将全部被删除，且不可恢复。是否继续强制删除？
    </div>
    <div class="password-wrap mt20">
      <span>您的密码：</span>
      <Input type="number" v-model="password" />
    </div>
    <div class="align-right">
      <Button @click="beforeClose" class="mr10"> 取消 </Button>
      <Button type="primary" @click="ok"> 保存 </Button>
    </div>
  </Modal>
  <!-- 添加租户 -->
  <add-tenement
    :value="showAddTenement"
    @closeChange="closeChange"
    @selectTenement="selectTenement"
  />
  <!-- 添加租户管理员 -->
  <select-user
    :value="isSelectUser"
    :id="orgId"
    currentTitle="人员选择"
    @setDataList="setDataList"
    @closeChange="closeChange"
    :userList="checkedUserList"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import AddTenement from '@/components/AddTenement.vue'
import SelectUser from '@/components/SelectUser.vue'
import * as requestRefers from '@/api/settings'
import { getUnitOrg } from '@/api/org'
export default {
  components: { AddTenement, SelectUser },
  setup(props) {
    const state = reactive({
      password: '',
      modalTenement: false,
      showAddTenement: false,
      isSelectUser: false,
      dataForm: <any>{},
      groupList: <any>[],
      groupData: <any>{},
      groupTotal: 0,
      groupParams: {
        limit: 10,
        page: 1,
      },
      groupColumns: [
        {
          title: '租户名称',
          key: 'name',
          align: 'left',
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100,
        },
      ],
      groupLoading: false,
      dataList: <any>[],
      total: 0,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '姓名',
          key: 'nickName',
          align: 'left',
        },
        {
          title: '账号',
          key: 'username',
          align: 'left',
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'left',
        },
        {
          title: '主职部室',
          key: 'zzOrgPath',
          align: 'left',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 150,
        },
      ],
      tenementId: '',
      orgId: '',
      userList: <any>[],
      checkedUserList: <any>[],
      orgName: '',
    })

    const methods = {
      // 获取已选人员
      setDataList(val: any) {
        let userIds = val.map((item: any) => {
          return item.userId
        })
        let obj = {
          tenantId: state.tenementId,
          userIds: userIds,
        }
        requestRefers.addTenantAdmin(obj).then((res) => {
          Message.success('添加成功')
          methods.getDataList()
        })
      },
      // 添加租户
      selectTenement() {
        methods.getGroupList()
      },
      addTenementFn() {
        state.showAddTenement = true
      },
      beforeClose() {
        state.modalTenement = false
      },
      ok() {
        if (state.password.length) {
          requestRefers.delTenant({ id: state.tenementId }).then(() => {
            methods.beforeClose()
            Message.success('移除成功')
            methods.getGroupList()
          })
        } else {
          Message.error('密码不能为空')
        }
      },
      // 移除租户
      removeTenement(row: any) {
        // state.modalTenement = true
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content:
              '该操作为高风险操作，如果您移除了该租户，那么该租户下所有的数据信息将全部被删除，且不可恢复。是否继续强制删除？',
            onOk: () => {
              requestRefers.delTenant({ id: row.id }).then(() => {
                Message.success('移除成功')
                methods.getGroupList()
              })
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
        })
      },
      // 移除管理员
      removeUser(row: any) {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '确定要移除此管理员么？',
            onOk: () => {
              requestRefers.tenantAdminDel({ id: row.id }).then((res) => {
                Message.success('移除成功')
                methods.getDataList()
              })
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
        })
      },
      // 点击行
      nodeClick(row: any, column: any) {
        if (column.title == '租户名称') {
          state.tenementId = row.id
          state.orgId = row.orgId
          state.groupData = row
          methods.getDataList()
        }
      },
      // 点击添加按钮
      addUnitFn() {
        state.userList = state.dataList
        if (state.userList.length > 0) {
          state.userList.map((item: any) => {
            item.userId = item.userId
          })
        }
        state.isSelectUser = true
      },
      // 获取单位租户列表
      getGroupList() {
        state.groupLoading = true
        requestRefers
          .tenantPageList(state.groupParams)
          .then((res: any) => {
            state.groupList = res.records
            state.groupTotal = res.total
            if (res.records.length > 0) {
              state.groupData = res.records[0]
              state.tenementId = res.records[0].id
              state.orgId = res.records[0].orgId
              methods.getDataList()
            }
            state.groupLoading = false
          })
          .catch(() => {
            state.groupLoading = false
          })
      },
      // 获取租户管理员列表
      getDataList() {
        state.loading = true
        let obj = {
          tenantId: state.groupData.id,
          ...state.params,
        }
        requestRefers
          .tenantAdminPageList(obj)
          .then((res: any) => {
            state.loading = false
            state.dataList = res.records
            state.total = res.total
            methods.getDataListAll()
          })
          .catch(() => {
            state.loading = false
          })
      },
      // 获取租户管理员列表all
      getDataListAll() {
        let obj = {
          tenantId: state.groupData.id,
          ...state.params,
        }
        obj.limit = state.total
        requestRefers.tenantAdminPageList(obj).then((res: any) => {
          state.checkedUserList = res.records
        })
      },
      // 关闭
      closeChange(val: boolean) {
        state.isSelectUser = val
        state.showAddTenement = val
      },
      // 分页
      groupPageCurrentChangeHandle(data: number) {
        state.groupParams.page = data
        methods.getGroupList()
      },
      // 翻页
      groupPageSizeChangeHandle(data: number) {
        state.groupParams.limit = data
        methods.getGroupList()
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
      resetForm() {
        state.dataForm = {}
      },
      // 获取当前人所在单位
      getUnitOrgFn() {
        getUnitOrg().then((res: any) => {
          state.orgName = res.orgName
        })
      },
    }
    // methods.getUnitOrgFn()
    // methods.getGroupList()
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
.table-one {
  height: calc(100vh - 265px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 310px) !important;
  }
}
.table-two {
  height: calc(100vh - 310px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 356px) !important;
  }
}
.password-wrap {
  display: flex;
  align-items: center;
  span {
    width: 100px;
    &::before {
      content: '*';
      color: red;
    }
  }
}
</style>
