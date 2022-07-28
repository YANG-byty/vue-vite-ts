<template>
  <el-select
    :value="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
    ref="multiSelect"
    placeholder="请选择"
  >
    <!-- <el-input
      class="selectInput"
      v-model="filterText"
      placeholder="请输入关键字搜索"
    >
    </el-input> -->
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        node-key="id"
        lazy
        :load="loadNode"
        :data="rootDate"
        :props="defaultProps"
        @node-click="handleNodeClick"
        empty-text="未查找到该组织"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>
<script lang="ts">
import {
  treeListWithUserNumOrg,
  treeLikeNameListOrg,
  treeLikeUserorg,
} from '@/api/org'
import * as util from '@/libs/util'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { reactive, toRefs, ref, watch, nextTick } from 'vue'
export default {
  name: 'el-tree-select',
  props: {
    searchTitle: {
      type: String,
    },
    value: {
      type: Boolean,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    interface Tree {
      name: string
      leaf?: boolean
    }
    const multiSelect = ref()
    const state = reactive({
      visible: false,
      filterText: '',
      valueTitle: '',
      clearable: true,
      treeData: <any>[],
      rootDate: <any>[],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      userFlag: '',
      searchTitle: 2,
      id: <any>'',
    })

    const methods = {
      // 初始化值
      initHandle() {
        multiSelect.value.toggleMenu() //默认展开选项
        // multiSelect.value.handleClose() //关闭
      },
      getTagTreeList() {
        treeListWithUserNumOrg({ id: state.id }).then((res: any) => {
          state.rootDate = res
          if (res && res.length > 0) {
            setTimeout(() => {
              methods.initHandle()
            }, 200)
          } else {
            emit('getValue', state.id)
          }
          methods.getTreeData(state.rootDate)
        })
      },
      getTreeData(tree: any) {
        if (tree && tree.length > 0) {
          let treeData = tree.map((item: any, index: number) => {
            if (item.type == 2) {
              item.name = item.nickName
            } else {
              item.orgPath
                ? (item.name = item.orgPath)
                : (item.name = `${item.orgName}(${item.userNum})`)
            }
            item.id = item.id
            item.ifSub == 1 ? (item.leaf = false) : (item.leaf = true)
          })
          return treeData
        }
      },
      loadNode(node: Node, resolve: (data: Tree[]) => void) {
        //如果是根目录则加载根目录数据
        if (node.level === 0) {
          return resolve(state.rootDate)
        }
        treeListWithUserNumOrg({ id: node.data.id }).then((res: any) => {
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
        if (state.searchTitle == 2 || state.searchTitle == 3) {
          if (node.ifSub !== 1) {
            state.valueTitle = node.name
            emit('getValue', node, state.searchTitle)
            multiSelect.value.blur()
          }
        } else {
          state.valueTitle = node.name
          emit('getValue', node, state.searchTitle)
          multiSelect.value.blur()
        }
      },
      // 清除选中
      clearHandle() {
        state.valueTitle = ''
        state.filterText = ''
        methods.getTagTreeList()
        emit('closeDataTree')
      },
      /* 清空选中样式 */
      clearSelected() {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
      //搜索结果
      getOrgWithName(val: string) {
        if (!state.userFlag) {
          let params = { orgName: state.filterText, id: state.id }
          treeLikeNameListOrg(params).then((res) => {
            if (val) {
              state.rootDate = res
              methods.getTreeData(state.rootDate)
            } else {
              state.rootDate = []
              methods.getTagTreeList()
            }
          })
        } else {
          let params: any = { name: state.filterText }
          treeLikeUserorg(params).then((res) => {
            if (val) {
              state.rootDate = res
              methods.getTreeData(state.rootDate)
            } else {
              state.rootDate = []
              methods.getTagTreeList()
            }
          })
        }
      },
    }
    watch(
      [
        () => props.isUser,
        () => props.searchTitle,
        () => props.value,
        () => props.id,
      ],
      (val: any, oldVal: any) => {
        state.userFlag = val[0]
        state.searchTitle = val[1]
        state.visible = val[2]
        state.id = val[3]
        return
        if (!val[1]) {
          methods.clearHandle()
          emit('getSearchTitle')
        }
        if (val[2]) {
          methods.getTagTreeList()
          if (!state.searchTitle) {
            methods.clearHandle()
            emit('getSearchTitle')
          }
        }
      }
    )
    watch(
      () => state.filterText,
      (val: any, oldVal: any) => {
        return
        util.debounce(
          state,
          () => {
            if (val) {
              methods.getOrgWithName(val)
            } else {
              methods.getTagTreeList()
            }
          },
          500
        )
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      multiSelect,
    }
  },
}
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 400px;
  min-height: 300px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  min-width: 390px;
  background: #fff;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 4px 20px;
  line-height: 25px;
  width: 390px;
  white-space: break-spaces;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #606266;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
<style>
.el-select-dropdown__wrap {
  max-height: 400px;
}
</style>
