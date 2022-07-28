<template>
  <Drawer
    :title="title"
    v-model="visible"
    width="900"
    :before-close="beforeClose"
  >
    <!-- 组织树 -->
    <div class="flexBox">
      <div class="personGroupBoxL">
        <el-input
          class="selectInput mt20"
          v-model="filterText"
          placeholder="请输入关键字搜索"
          maxlength="40"
        />
        <div class="tree-wrap">
          <!-- @node-click="handleNodeClick"
             :load="loadNode"
              -->
          <el-tree
            @check="checkChangeFn"
            :props="defaultProps"
            node-key="id"
            :default-checked-keys="defaultCheckedList"
            lazy
            show-checkbox
            ref="selectTree"
            :filter-node-method="filterNode"
            id="tree-option"
            :data="selectedOrgData"
            empty-text="未查找到数据"
          />
        </div>
      </div>
      <div class="personGroupBoxL" style="margin-left: 8px">
        <div>
          <div class="disFlexCenter mt20">
            <div>已选单位（{{ groupsList.length }}）</div>
            <div class="textBtn" @click="resetFn">清空</div>
          </div>
          <div class="personListBox">
            <div
              class="personList"
              v-for="(item, index) in groupsList"
              :key="index"
            >
              <div class="item">
                <div class="img-box">
                  <div class="user-info">
                    <div>
                      <span class="name">{{ item.orgName }}</span>
                    </div>
                    <!-- <p class="org">{{ item.phone }}</p> -->
                  </div>
                </div>
                <div class="btn">
                  <span @click="removeUnit(item, index)">移除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-button align-right">
      <Button @click="beforeClose"> 取消 </Button>
      <Button type="primary" @click="handleSave"> 保存 </Button>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { reactive, ref, toRefs, watch, nextTick } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { getOrgAreaOrgList } from '@/api/org'
import { ElTree } from 'element-plus'
export default {
  emits: ['closeChange', 'setOrgList'],
  props: ['value', 'dataList'],
  components: {},
  setup(props, { emit }) {
    interface Tree {
      orgName: string
      name: string
      leaf?: boolean
    }
    const selectTree = ref()
    const filterNode = (value: string, data: Tree) => {
      if (!value) return true
      return data.orgName.includes(value)
    }
    const state = reactive({
      visible: false,
      title: '选择单位',
      filterText: '',
      valueTitle: '',
      clearable: true,
      treeData: [],
      selectedOrgData: <any>[],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      groupsList: <any>[],
      defaultCheckedList: <any>[],
    })
    const methods = {
      // 点击复选框
      checkChangeFn() {
        var allNodes = selectTree.value.getCheckedNodes()
        state.groupsList = allNodes.filter((item: any) => item.leaf)
        state.defaultCheckedList = state.groupsList.map((val: any) => val.orgId)
      },
      // 移除
      removeUnit(item: any, index: number) {
        state.groupsList.splice(index, 1)
        state.defaultCheckedList = state.groupsList.map((val: any) => val.orgId)
        selectTree.value.setCheckedKeys(state.defaultCheckedList)
      },
      // 确定选中单位
      handleSave() {
        if (state.defaultCheckedList.length == 0) {
          Message.error('请选择单位')
          return
        }
        emit('setOrgList', state.defaultCheckedList)
      },
      getTagTreeList() {
        getOrgAreaOrgList({ parentId: '' }).then((res: any) => {
          state.selectedOrgData = [res]
          methods.getTreeDataAll(state.selectedOrgData)
          // methods.getTreeData(state.selectedOrgData)
        })
      },
      getTreeDataAll(tree: any) {
        let treeData = []
        treeData = tree.filter((item: any) => item.children.length > 0)
        if (treeData && treeData.length > 0) {
          treeData = tree.map((item: any) => {
            item.name = item.orgName
            item.orgId = item.id
            if (item.children || item.children.length > 0) {
              item.leaf = false
              item.children.map((value: any) => {
                value.name = value.orgName
                value.orgId = value.id
                value.leaf = true
              })
            } else {
              item.leaf = true
            }
          })
          nextTick(() => {
            selectTree.value.setCheckedKeys(state.defaultCheckedList)
          })
          return treeData
        } else {
          state.selectedOrgData = []
        }
      },
      getTreeData(tree: any) {
        if (tree && tree.length > 0) {
          let treeData = tree.map((item: any, index: number) => {
            item.name = item.orgName
            item.orgId = item.id
            item.isChildren ? (item.leaf = false) : (item.leaf = true)
          })
          nextTick(() => {
            selectTree.value.setCheckedKeys(state.defaultCheckedList)
          })
          return treeData
        }
      },
      loadNode(node: Node, resolve: (data: Tree[]) => void) {
        //如果是根目录则加载根目录数据
        if (node.level === 0) {
          // return resolve([{ name: 'region' }])
          return resolve(state.selectedOrgData)
        }
        getOrgAreaOrgList({ parentId: node.data.id }).then((res: any) => {
          //如果有数据返回，则通过resolve方法懒加载到相应节点
          if (res) {
            setTimeout(() => {
              let resData = res
              methods.getTreeData(resData)
              resolve(resData)
            }, 500)
            //否则插入空的节点
          } else {
            return resolve([])
          }
        })
      },
      // 切换选项
      handleNodeClick(node: any) {
        //2,3 代表不能选带有父级的组织
        // if (props.searchTitle == 2 || props.searchTitle == 3) {
        if (node.isChildren) {
          // props.valueTitle = node.name
          // emit('getValue', node, props.searchTitle)
          selectTree.value.remove()
        }
        // } else {
        //   state.valueTitle = node.name
        //   // emit('getValue', node, props.searchTitle)
        //   selectTree.value.blur()
        // }
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
        methods.resetFn()
      },
      resetFn() {
        state.defaultCheckedList = []
        state.groupsList = []
        selectTree.value.setCheckedKeys([])
      },
    }
    watch([() => props.value, () => props.dataList], (val: any) => {
      state.visible = val[0]
      return
      methods.getTagTreeList()
      if (val[0]) {
        if (val[1].length > 0) {
          state.groupsList = val[1]
          state.defaultCheckedList = val[1].map((val: any) => val.orgId)
          return
        }
      }
      methods.resetFn()
    })
    watch(
      () => state.filterText,
      (val) => {
        selectTree.value!.filter(val)
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      selectTree,
      filterNode,
    }
  },
}
</script>

<style lang="less" scoped>
.flexBox {
  display: flex;
  justify-content: space-around;
  .personGroupBoxL {
    width: 430px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    height: 560px;
    // overflow: auto;
    background-color: #fff;
    .personListBox {
      height: 500px;
      overflow: auto;
      .personList {
        padding: 10px;
        .item {
          display: flex;
          align-items: center;
          font-size: 13px;
          justify-content: space-between;
          border: 1px solid #eee;
          border-radius: 20px;
          padding: 6px 12px;
          .setPerson {
            color: orange;
            cursor: pointer;
          }
          .btn {
            color: orange;
            display: flex;
            span {
              display: inline-block;
              padding: 0 5px;
              cursor: pointer;
            }
          }
          .img-box {
            display: flex;
            align-items: center;
          }
        }
        &:hover {
          background-color: #f6f8f9;
        }
      }
    }
  }
}
</style>
