<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="width: 510px">
      <div class="disFlexCenter title mt20">
        <div class="">单位分组</div>
        <Button type="primary" @click="addGroupFn"> + 添加分组 </Button>
      </div>
      <div class="content-box">
        <div class="common-table table-one">
          <div class="table">
            <Table
              :columns="groupColumns"
              :loading="groupLoading"
              :data="groupList"
              @on-cell-click="handleRowClick"
            >
              <template #action="{ row }">
                <div class="table-action">
                  <span @click="addGroupFn(row)">
                    <i class="iconfont icon-bianji" />
                    编辑
                  </span>
                  <span @click="groupRemove(row)">
                    <i class="iconfont icon-shanchu" />
                    删除
                  </span>
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
      <div class="detail-top mt20">
        <div class="title">分组名称：{{ groupData.name || '--' }}</div>
        <div class="detail-item">
          <Row :gutter="100" class="mt20">
            <Col span="24"> 分组备注：{{ groupData.remark || '--' }} </Col>
          </Row>
        </div>
      </div>
      <div class="detail-info">
        <div class="disFlexCenter title mt20">
          <div class="">分组内单位</div>
          <Button type="primary" @click="addUnitFn"> + 添加单位 </Button>
        </div>
        <div class="content-box">
          <div class="disFlex">
            <FormItem label="单位名称：" class="mr20">
              <Input v-model="dataForm.orgName" />
            </FormItem>
            <FormItem label="设置时间：" class="mr20">
              <DatePicker
                type="datetimerange"
                style="width: 100%"
                v-model="dataForm.endDate"
                clearable
                :editable="false"
                placeholder=""
                format="yyyy-MM-dd HH:mm:ss"
                @on-change="changeCreatDate"
              />
            </FormItem>
            <Button class="reset mr20" @click="resetForm"> 重置 </Button>
            <Button class="search" type="primary" @click="getDataList">
              查询
            </Button>
          </div>
          <div class="common-table table-two">
            <div class="table">
              <Table :columns="columns" :loading="loading" :data="dataList">
                <template #status="{ row }">
                  <span :class="row.class">{{ row.statusHide }}</span>
                </template>
                <template #action="{ row }">
                  <div class="table-action">
                    <span @click="removeFn(row)">
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

  <!-- 添加分组 -->
  <add-group
    :value="showAddGroup"
    ref="refGroup"
    @closeChange="closeChange"
    @submitFn="submitFn"
  />
  <!-- 选择组织 -->
  <select-org
    :value="showSelectOrg"
    :dataList="dataListAll"
    @closeChange="closeChange"
    @setOrgList="setOrgList"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, ref } from 'vue'
import AddGroup from '@/components/AddGroup.vue'
import SelectOrg from '@/components/SelectOrg.vue'
import * as requestRefers from '@/api/settings'
import { Message, Modal } from 'view-ui-plus'
export default {
  components: { AddGroup, SelectOrg },
  setup(props) {
    const refGroup = ref()
    const state = reactive({
      showAddGroup: false,
      showSelectOrg: false,
      dataForm: <any>{},
      groupData: <any>{},
      groupList: [],
      groupTotal: 0,
      groupParams: {
        limit: 10,
        page: 1,
      },
      groupColumns: [
        {
          title: '分组名称',
          key: 'name',
          align: 'left',
          className: 'pointer',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200,
        },
      ],
      groupLoading: false,
      dataList: <any>[],
      dataListAll: <any>[],
      total: 0,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '单位名称',
          key: 'orgName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '填报人员',
          key: 'userCount',
          align: 'center',
          minWidth: 60,
        },
        {
          title: '设置时间',
          key: 'createTime',
          align: 'center',
          minWidth: 130,
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
      // 确认添加
      setOrgList(data: any) {
        console.log(data)
        requestRefers
          .addGroupUnit({ groupId: state.groupData.groupId, orgIds: data })
          .then((res: any) => {
            methods.getDataList()
            state.showSelectOrg = false
          })
      },
      // 点击单位分组
      handleRowClick(row: any, column: any) {
        if (column.title == '分组名称') {
          state.groupData = {
            id: row.id,
            groupId: row.id,
            name: row.name,
            remark: row.remark,
          }
          methods.getDataList()
        }
      },
      // 移除分组
      removeFn(row: any) {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '确定要移除此单位么？',
            onOk: () => {
              requestRefers
                .pageGroupUnitDel({
                  id: row.id,
                })
                .then(() => {
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
      // 选择时间
      changeCreatDate(val: any) {
        state.dataForm.startTime = val[0]
        state.dataForm.endTime = val[1]
      },
      // 分组删除
      groupRemove(row: any) {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '确定要删除此分组么？',
            onOk: () => {
              requestRefers.groupDel({ id: row.id }).then(() => {
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
      // 新增、编辑
      addGroupFn(row: any) {
        if (row.id) {
          refGroup.value.dataForm = {
            id: row.id,
            name: row.name,
            remark: row.remark,
          }
        }
        state.showAddGroup = true
      },
      // 确定新增分组
      submitFn(data: any) {
        if (data.id) {
          requestRefers.groupEdit(data).then(() => {
            state.showAddGroup = false
            methods.getGroupList()
          })
          return
        }
        requestRefers.addGroup(data).then(() => {
          state.showAddGroup = false
          methods.getGroupList()
        })
      },
      // 点击添加单位
      addUnitFn() {
        state.showSelectOrg = true
      },
      // 关闭
      closeChange(val: boolean) {
        state.showSelectOrg = val
        state.showAddGroup = val
      },
      // 获取单位分组列表
      getGroupList() {
        state.groupLoading = true
        requestRefers
          .groupPageList(state.groupParams)
          .then((res: any) => {
            state.groupList = res.records

            state.groupTotal = res.total
            if (res.records.length > 0) {
              state.groupData = {
                id: res.records[0].id,
                groupId: res.records[0].id,
                name: res.records[0].name,
                remark: res.records[0].remark,
              }
              methods.getDataList()
            }
            state.groupLoading = false
          })
          .catch(() => {
            state.groupLoading = false
          })
      },
      // 获取分组内单位列表
      getDataList() {
        state.loading = true
        let obj = {
          orgName: state.dataForm.orgName,
          startTime: state.dataForm.startTime,
          endTime: state.dataForm.endTime,
          groupId: state.groupData.groupId,
          ...state.params,
        }
        requestRefers
          .pageGroupUnitList(obj)
          .then((res: any) => {
            state.dataList = res.records
            state.total = res.total
            state.loading = false
            methods.getDataListAll()
          })
          .catch(() => {
            state.loading = false
          })
      },
      // 获取分组内单位列表all
      getDataListAll() {
        let obj = {
          orgName: state.dataForm.orgName,
          startTime: state.dataForm.startTime,
          endTime: state.dataForm.endTime,
          groupId: state.groupData.groupId,
          ...state.params,
        }
        obj.limit = state.total
        requestRefers.pageGroupUnitList(obj).then((res: any) => {
          state.dataListAll = res.records
        })
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
        methods.getDataList()
      },
    }
    // methods.getGroupList()

    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
      refGroup,
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
  height: calc(100vh - 470px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 510px) !important;
  }
}
</style>
