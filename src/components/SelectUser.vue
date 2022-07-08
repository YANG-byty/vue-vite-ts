<template>
  <Drawer
    title="人员选择"
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
        />
        <el-tree
          :props="defaultProps"
          @node-click="handleNodeClick"
          :load="loadNode"
          lazy
          show-checkbox
          ref="selectTree"
          id="tree-option"
          :data="selectUserData"
          empty-text="未查找到该组织"
        />
      </div>
      <div class="personGroupBoxL" style="margin-left: 5px">
        <div>
          <h4>授权用户</h4>
          <div class="personListBox">
            <div
              class="personList"
              v-for="(item, index) in userList"
              :key="index"
            >
              <div class="item">
                <div class="img-box">
                  <img src="@/assets/images/profile.png" alt="" />
                  <div class="user-info">
                    <p>
                      <span class="name">{{ item.nickName }}</span>
                    </p>
                    <!-- <p class="org">{{ item.phone }}</p> -->
                  </div>
                </div>
                <div class="btn">
                  <span @click="removeUser(item, index)">移除</span>
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
import { reactive, toRefs, onMounted, watch, ref } from 'vue'
import { Modal } from 'view-ui-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
export default {
  emits: ['closeChange', 'setUserList'],
  props: ['value', 'searchTitle'],
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
      clearable: true,
      treeData: [],
      selectUserData: [
        {
          id: 1,
          name: 'Level one 1',
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
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      showOrganizational: true,
      userList: [
        {
          nickName: '张三',
          id: 1,
          checked: true,
        },
        {
          nickName: '李四',
          id: 2,
          checked: true,
        },
      ],
    })
    const methods = {
      // 移除
      removeUser(item: any) {
        state.userList.forEach((list) => {
          if (item.id == list.id) {
            list.checked = false
          }
        })
      },
      handleOrganizational(flag: boolean) {
        state.showOrganizational = flag
      },
      // 确定选中单位
      handleSave() {
        emit('closeChange', false)
        emit('setUserList', state.userList)
      },
      getTagTreeList() {
        // treeListWithUserNumOrg({ id: '0' }).then((res) => {
        //   this.selectUserData = res;
        //   console.log(res);
        //   this.getTreeData(this.selectUserData);
        // });
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
          // return resolve([{ name: 'region' }])
          return resolve(state.selectUserData)
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
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '该表单尚未填写完成，确定要取消么？',
            onOk: () => {
              emit('closeChange', false)
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
        })
      },
    }
    watch(
      () => props.value,
      (val: boolean) => {
        state.visible = val
      }
    )
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
.flexBox {
  display: flex;
  justify-content: space-around;
  margin: 5px;
  .personGroupBoxL {
    width: 430px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    height: 560px;
    overflow: auto;
    background-color: #fff;
    margin: 10px 2px;
    .personListBox {
      height: 500px;
      overflow: auto;
      .personList {
        padding: 10px;
        margin-top: 5px;
        .item {
          display: flex;
          align-items: center;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 13px;
          justify-content: space-between;
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
            .user-info {
              margin-left: 10px;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
        }
        &:hover {
          background-color: #f6f8f9;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
