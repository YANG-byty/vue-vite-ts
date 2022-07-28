<template>
  <Drawer
    title="选择单位"
    v-model="visible"
    width="600"
    :before-close="beforeClose"
  >
    <!-- 单位分组 -->
    <div v-show="showOrganizational">
      <div class="disFlexCenter mt20">
        <div>已选单位（{{ setDataList.length }}）</div>
        <div class="textBtn" @click="handleOrganizational(false)">
          从法人单位选择
        </div>
      </div>
      <div class="tree-wrap">
        <el-input
          class="mt20"
          v-model="filterText"
          placeholder="请输入关键字搜索"
          maxlength="40"
        />
        <el-tree
          ref="treeRef"
          @check="checkChangeFn"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :default-checked-keys="setDataList"
          id="tree-option"
          :data="rootDate"
          :filter-node-method="filterNode"
          empty-text="未查找到数据"
        />
      </div>
    </div>
    <!-- 法人单位 -->
    <div v-show="!showOrganizational">
      <div class="disFlexCenter mt20">
        <div>已选单位（{{ setDataList.length }}）</div>
        <div class="textBtn" @click="handleOrganizational(true)">
          从单位分组选择
        </div>
      </div>
      <div class="common-table">
        <div class="table">
          <Table
            :columns="columns"
            :loading="loading"
            :data="unitList"
            maxHeight="580"
            @on-select="selectFn"
            @on-select-cancel="selectCancelFn"
            @on-select-all="selectAllFn"
            @on-select-all-cancel="selectAllCancelFn"
          />
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

    <div class="footer-button align-right">
      <Button @click="beforeClose"> 取消 </Button>
      <Button type="primary" @click="handleSave"> 保存 </Button>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { reactive, toRefs, watch, ref, nextTick } from 'vue'
import { getOrgUnitList } from '@/api/org'
import * as requestRefers from '@/api/settings'
import { Modal } from 'view-ui-plus'
import { ElTree } from 'element-plus'
export default {
  emits: ['closeChange', 'setUnitList'],
  props: ['value', 'checkedList'],
  components: {},
  setup(props, { emit }) {
    interface Tree {
      orgName: string
      name: string
      leaf?: boolean
    }
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const filterNode = (value: string, data: Tree) => {
      if (!value) return true
      return data.orgName.includes(value)
    }
    const state = reactive({
      visible: false,
      filterText: '',
      rootDate: <any>[],
      defaultProps: {
        children: 'groupUnitList',
        label: 'orgName',
        isLeaf: 'leaf',
      },
      showOrganizational: true,
      unitList: <any>[],
      loading: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '单位名称',
          key: 'orgName',
          align: 'left',
        },
        // {
        //   title: '操作',
        //   slot: 'action',
        //   align: 'center',
        //   width: 150,
        // },
      ],
      total: 0,
      params: {
        size: 10,
        page: 1,
      },
      setDataList: <any>[],
    })
    const methods = {
      // 点击tree复选框
      checkChangeFn(data: any, checkedKeys: any) {
        let arr =
          state.setDataList.length > 0
            ? state.setDataList.map((value: any) => value.orgId)
            : []
        if (data.leaf) {
          // 单选
          if (
            checkedKeys.checkedNodes.length > 0 &&
            !checkedKeys.checkedNodes[0].leaf
          ) {
            let arrList = <any>[]
            checkedKeys.checkedNodes[0].groupUnitList.map((item: any) => {
              if (!arr.includes(item.id)) {
                arrList.push(item)
              }
            })
            state.setDataList = [...state.setDataList, ...arrList]
          } else {
            let flagList = state.setDataList.filter(
              (value: any) => value.id != data.id
            )
            let idList = state.setDataList.map((item: any) => item.id)
            if (idList.includes(data.id)) {
              state.setDataList = flagList
            } else {
              state.setDataList.push(data)
            }
          }
        } else {
          // 全选
          if (
            checkedKeys.checkedNodes.length > 0 &&
            !checkedKeys.checkedNodes[0].leaf
          ) {
            data.groupUnitList.map((item: any) => {
              if (!arr.includes(item.id)) {
                state.setDataList.push(item)
              }
            })
          } else {
            let idList = data.groupUnitList.map((item: any) => item.id)
            let arrList = state.setDataList.filter((value: any) => {
              return !idList.includes(value.id)
            })
            state.setDataList = arrList
          }
        }
        console.log(state.setDataList)
      },
      // 选中table复选框
      selectFn(val: any, row: any) {
        state.setDataList.push(row)
      },
      selectCancelFn(val: any, row: any) {
        let list = state.setDataList.filter((item: any) => item.id != row.id)
        state.setDataList = list
      },
      selectAllFn(val: any) {
        let arr =
          state.setDataList.length > 0
            ? state.setDataList.map((value: any) => value.id)
            : []

        val.map((item: any) => {
          if (!arr.includes(item.id)) {
            state.setDataList.push(item)
          }
        })
      },
      selectAllCancelFn() {
        let arr =
          state.unitList.length > 0
            ? state.unitList.map((value: any) => value.id)
            : []
        let list = state.setDataList.filter(
          (item: any) => !arr.includes(item.id)
        )
        state.setDataList = list
      },
      // 设置tree选中
      setTreeFn() {
        let arr =
          state.setDataList.length > 0
            ? state.setDataList.map((value: any) => value.id)
            : []
        nextTick(() => {
          treeRef.value?.setCheckedKeys(arr)
        })
      },
      // 获取法人单位列表
      getDataList() {
        getOrgUnitList(state.params).then((res: any) => {
          state.unitList = res.list
          state.total = res.total
          if (state.unitList.length > 0 && state.setDataList.length > 0) {
            let arr = state.setDataList.map((value: any) => value.id)
            state.unitList.map((item: any) => {
              // item.orgId = item.id
              item._checked = arr.includes(item.id)
            })
          }
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
      // 切换
      handleOrganizational(flag: boolean) {
        state.showOrganizational = flag
        if (!flag) {
          methods.getDataList()
        } else {
          methods.setTreeFn()
        }
      },
      // 确定选中单位
      handleSave() {
        emit('setUnitList', state.setDataList)
      },
      // 获取组织树
      getTagTreeList() {
        requestRefers.getGroupUnitList().then((res: any) => {
          state.rootDate = res.filter(
            (item: any) => item.groupUnitList.length > 0
          )
          if (state.rootDate.length > 0) {
            state.rootDate.map((item: any) => {
              item.orgName = item.groupName
              item.leaf = false
              // item.id = item.groupId
              if (item.groupUnitList.length > 0) {
                item.groupUnitList.map((value: any) => {
                  value.leaf = true
                  value.id = value.orgId
                })
              }
            })
            if (state.setDataList.length > 0) {
              nextTick(() => {
                let arr = state.setDataList.map((value: any) => value.orgId)
                treeRef.value?.setCheckedKeys(arr)
              })
            }
          }
        })
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
    }
    watch([() => props.value, () => props.checkedList], (val: any) => {
      state.showOrganizational = true
      state.visible = val[0]
      return
      if (val[0]) {
        state.setDataList = val[1]
        if (state.setDataList.length > 0) {
          state.setDataList.map((item: any) => {
            item.id = item.orgId
          })
        }
        console.log(state.setDataList)
        methods.getTagTreeList()
      }
    })
    watch(
      () => state.filterText,
      (val) => {
        treeRef.value!.filter(val)
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      treeRef,
      filterNode,
    }
  },
}
</script>

<style lang="less" scoped>
.tree-wrap {
  border: 1px solid #f6f8f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #efefef;
}
</style>
