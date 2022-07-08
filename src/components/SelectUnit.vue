<template>
  <Drawer
    title="选择单位"
    v-model="visible"
    width="600"
    :before-close="beforeClose"
  >
    <!-- 组织树 -->
    <div v-show="showOrganizational">
      <div class="disFlexCenter mt20">
        <div>已选单位（2）</div>
        <div
          class="textBtn"
          @click="handleOrganizational(false)"
        >
          从单位分组选择
        </div>
      </div>
      <div class="tree-wrap">
        <el-input
          class="selectInput mt20"
          v-model="filterText"
          placeholder="请输入关键字搜索"
        />
        <el-tree
          :props="defaultProps"
          @node-click="handleNodeClick"
          :load="loadNode"
          lazy
          show-checkbox
          :default-checked-keys="defaultCheckedList"
          ref="selectTree"
          id="tree-option"
          :data="rootDate"
          empty-text="未查找到该组织"
        />
      </div>
    </div>
    <!-- 单位分组 -->
    <div v-show="!showOrganizational">
      <div class="disFlexCenter mt20">
        <div>已选单位（2）</div>
        <div
          class="textBtn"
          @click="handleOrganizational(true)"
        >
          从组织树选择
        </div>
      </div>
      <div class="tree-wrap">
        <el-input
          class="selectInput mt20"
          v-model="filterText"
          placeholder="请输入关键字搜索"
        />
        <el-tree
          :props="defaultProps"
          @node-click="handleNodeClick"
          :load="loadNode"
          lazy
          show-checkbox
          ref="selectTree"
          id="tree-option"
          :data="rootDate"
          empty-text="未查找到该组织"
        />
      </div>
    </div>

    <div class="footer-button align-right">
      <Button @click="beforeClose">
        取消
      </Button>
      <Button
        type="primary"
        @click="handleSave"
      >
        保存
      </Button>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';
export default {
  emits: ['closeChange', 'setUnitList'],
  props: ['value', 'disable'],
  components: {},
  setup(props, { emit }) {
    interface Tree {
      name: string
      leaf?: boolean
    }
    const state = reactive({
      visible: false,
      filterText: '',
      valueTitle: '',
      treeData: [],
      rootDate: [
        {
          id: 1,
          name: 'Level one 1',
          disabled: true,
          children: [
            {
              id: 4,
              name: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  name: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  name: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
      ],
      defaultCheckedList: [1],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      showOrganizational: true,
    });
    const methods = {
      // 切换
      handleOrganizational(flag: boolean) {
        state.showOrganizational = flag;
      },
      // 确定选中单位
      handleSave() {
        emit('setUnitList', state.treeData);
      },
      getTagTreeList() {
        console.log(props);
        // treeListWithUserNumOrg({ id: '0' }).then((res) => {
        //   this.rootDate = res;
        //   console.log(res);
        //   this.getTreeData(this.rootDate);
        // });
      },
      getTreeData(tree: any) {
        if (tree && tree.length > 0) {
          let treeData = tree.map((item: any, index: number) => {
            if (item.type == 2) {
              item.name = item.nickName;
            } else {
              item.orgPath
                ? (item.name = item.orgPath)
                : (item.name = `${item.orgName}(${item.userNum})`);
            }
            item.id = item.id;
            item.ifSub == 1 ? (item.leaf = false) : (item.leaf = true);
          });
          return treeData;
        }
      },
      loadNode(node: Node, resolve: (data: Tree[]) => void) {
        //如果是根目录则加载根目录数据
        if (node.level === 0) {
          // return resolve([{ name: 'region' }])
          return resolve(state.rootDate);
        }
        // treeListWithUserNumOrg({ id: node.data.id }).then((res:any) => {
        //   //如果有数据返回，则通过resolve方法懒加载到相应节点
        //   if (res) {
        //     setTimeout(() => {
        //       let resData = res
        //       this.getTreeData(resData)
        //       resolve(resData)
        //     }, 500)
        //     //否则插入空的节点
        //   } else {
        //     return resolve([])
        //   }
        // })
      },
      // 切换选项
      handleNodeClick(node: any) {
        //   //2,3 代表不能选带有父级的组织
        //   if (props.searchTitle == 2 || props.searchTitle == 3) {
        //     if (node.ifSub !== 1) {
        //       // props.valueTitle = node.name
        //       // emit('getValue', node, props.searchTitle)
        //       multiSelect.value.blur()
        //     }
        //   } else {
        //     state.valueTitle = node.name
        //     // emit('getValue', node, props.searchTitle)
        //     multiSelect.value.blur()
        //   }
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false);
        // return new Promise((resolve: any, reject: any) => {
        //   Modal.confirm({
        //     title: '提示',
        //     content: '该表单尚未填写完成，确定要取消么？',
        //     onOk: () => {
        //       resolve()
        //     },
        //     onCancel: () => {
        //       return false
        //     },
        //   })
        // })
      },
    };
    watch([() => props.value, () => props.disable], (val: any) => {
      state.visible = val[0];
      methods.getTagTreeList();
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.tree-wrap {
  border: 1px solid #f6f8f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #efefef;
}
</style>
