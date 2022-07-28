<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="width: 510px; padding-bottom: 20px">
      <!-- <div class="disFlexCenter title mt20">
        <div class="">组织部室</div>
      </div> -->
      <div class="mt20"></div>
      <div class="content-box">
        <div class="common-table table-one">
          <div class="table">
            <Table
              row-key="id"
              :load-data="handleLoadData"
              :columns="groupColumns"
              :loading="groupLoading"
              :data="groupList"
              @on-row-click="nodeClick"
            />
          </div>
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
          {{ (orgName || '--') + ' / ' + (groupObj.orgName || '--') }}
        </div>
        <div class="disFlexCenter title mt20">
          <div class="">负责单位</div>
          <Button type="primary" @click="addUnitFn"> + 添加单位 </Button>
        </div>
        <div class="content-box">
          <div class="disFlex">
            <FormItem label="单位名称：" class="mr20">
              <Input v-model="dataForm.name" />
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
  <select-unit
    :value="showSelectUnit"
    :checkedList="dataListAll"
    @closeChange="closeChange"
    @setUnitList="setUnitList"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import SelectUnit from '@/components/SelectUnit.vue'
import { treeListWithUserNumOrg, getUnitOrg } from '@/api/org'
import * as requestRefers from '@/api/settings'
import { Message, Modal } from 'view-ui-plus'
export default {
  components: { SelectUnit },
  setup(props) {
    const state = reactive({
      showSelectUnit: false,
      dataForm: <any>{},
      groupList: <any>[],
      groupObj: <any>{},
      groupLoading: false,
      groupColumns: [
        {
          title: '组织部室',
          key: 'orgName',
          className: 'pointer',
          align: 'left',
          // minWidth: 260,
          tree: true,
        },
      ],
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
          key: 'name',
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
      orgName: '',
    })
    const methods = {
      setUnitList(val: any) {
        console.log(val)
        let unitIds = val.map((item: any) => item.id)
        let obj = {
          orgId: state.groupObj.id,
          unitIds: unitIds,
        }
        requestRefers.addOrgUnit(obj).then((res: any) => {
          Message.success('添加成功')
          state.showSelectUnit = false
          methods.getDataList()
        })
      },
      // 树形懒加载
      handleLoadData(item: any, callback: any) {
        treeListWithUserNumOrg({ id: item.id }).then((res: any) => {
          if (res.length > 0) {
            res.map((value: any) => {
              if (value.ifSub) {
                value.children = []
                value._loading = false
              }
            })
          }
          callback(res)
        })
      },
      // 移除
      removeFn(row: any) {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '确定要移除此单位么？',
            onOk: () => {
              requestRefers.orgUnitDel({ id: row.id }).then((res: any) => {
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
      // 点击行
      nodeClick(row: any) {
        if (row.ifSub == 0) {
          state.groupObj = row
          methods.getDataList()
        } else {
          state.groupObj = {}
        }
      },
      addUnitFn() {
        if (state.groupObj.id) {
          state.showSelectUnit = true
          return
        }
        Message.error('请选择组织部室')
      },
      // 关闭
      closeChange(val: boolean) {
        state.showSelectUnit = val
      },
      // 获取当前人所在单位
      getUnitOrgFn() {
        getUnitOrg().then((res: any) => {
          state.orgName = res.orgName
          methods.getTreeList(res.id)
        })
      },
      // 获取列表
      getTreeList(id: string) {
        state.groupLoading = true
        treeListWithUserNumOrg({ id: id })
          .then((res: any) => {
            state.groupList = res
            state.groupLoading = false
            if (state.groupList.length > 0) {
              if (res[0].ifSub == 0) {
                state.groupObj = res[0]
                methods.getDataList()
              }
              res.map((value: any) => {
                if (value.ifSub) {
                  value.children = []
                  value._loading = false
                }
              })
            }
          })
          .catch(() => {
            state.groupLoading = false
          })
      },
      // 获取列表
      getDataList() {
        if (!state.groupObj.id) {
          Message.error('请选择组织部室')
          return
        }
        let obj = {
          orgId: state.groupObj.id,
          startTime: state.dataForm.startTime,
          endTime: state.dataForm.endTime,
          name: state.dataForm.name,
          ...state.params,
        }
        state.loading = true
        requestRefers
          .orgUnitPageList(obj)
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
      // 获取列表all
      getDataListAll() {
        let obj = {
          orgId: state.groupObj.id,
          startTime: state.dataForm.startTime,
          endTime: state.dataForm.endTime,
          name: state.dataForm.name,
          ...state.params,
        }
        obj.limit = state.total
        requestRefers.orgUnitPageList(obj).then((res: any) => {
          state.dataListAll = res.records
        })
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
    // methods.getUnitOrgFn()
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
  height: calc(100vh - 170px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 210px) !important;
  }
}
.table-two {
  height: calc(100vh - 368px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 410px) !important;
  }
}
</style>
