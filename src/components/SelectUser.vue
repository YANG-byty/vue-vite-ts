<template>
  <div>
    <Drawer
      :title="title"
      :closable="false"
      v-model="visible"
      :inner="true"
      width="900"
      @on-close="closeDrawer"
    >
      <div class="personGroupBox">
        <div>
          <div class="flexBox">
            <div class="personGroupBoxL">
              <Form :label-width="90">
                <SelectTree
                  :searchTitle="searchTitle"
                  :id="id"
                  :value="visible"
                  ref="refSelectTree"
                  @getValue="getValue"
                  @getSearchTitle="getSearchTitle"
                  @closeDataTree="closeDataTree"
                  class="mb10"
                  style="width: 400px"
                />
              </Form>
              <div>
                <div class="personListBox">
                  <div
                    class="personList"
                    v-for="(item, index) in personList"
                    :key="index"
                    @click="setMen(item)"
                  >
                    <div class="item">
                      <div class="img-box">
                        <img src="@/assets/images/profile.png" alt="" />
                        <div class="user-info">
                          <div>
                            <span class="name">{{ item.nickName }}</span>
                            <span class="mr10"></span>
                          </div>
                          <!-- <p class="org">{{ item.phone }}</p> -->
                        </div>
                      </div>
                      <Icon
                        type="ios-checkmark"
                        size="24"
                        v-if="item.checked"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="personGroupBoxL">
              <div>
                <h4>授权用户</h4>
                <div class="personListBox">
                  <div
                    class="personList"
                    v-for="(item, index) in groupsList"
                    :key="index"
                  >
                    <div class="item">
                      <div class="img-box">
                        <img src="@/assets/images/profile.png" alt="" />
                        <div class="user-info">
                          <div>
                            <span class="name">{{ item.nickName }}</span>
                          </div>
                          <!-- <p class="org">{{ item.phone }}</p> -->
                        </div>
                      </div>
                      <div class="btn">
                        <span @click="removePeople(item, index)">移除</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="align-right">
        <Button class="mr10" @click="closeDrawer">取消</Button>
        <Button
          type="primary"
          class="mr10"
          @click="addGroupUserSubmit"
          :loading="addGroupFormLoading"
          >确定</Button
        >
      </div>
    </Drawer>
  </div>
</template>
<script lang="ts">
import { getOrgUsers } from '@/api/user-center'
import { reactive, toRefs, watch, ref, getCurrentInstance } from 'vue'
import SelectTree from './SelectTree.vue'
export default {
  emits: ['closeChange', 'setDataList', 'resetDataList', 'input'],
  props: {
    currentTitle: {
      type: String,
    },
    value: {
      type: Boolean,
    },
    id: {
      type: String,
      default: '',
    },
    userList: {
      type: Array,
      default: () => [],
    },
    selectCurentItem: {
      type: Object,
      default: () => {},
    },
  },
  components: { SelectTree },
  setup(props, { emit }) {
    // 获取vue实例
    const { proxy } = <any>getCurrentInstance()
    const refSelectTree = ref()
    const state = reactive({
      visible: false,
      title: <any>'',
      personList: <any>[],
      userList: <any>[],
      groupsList: <any>[],
      addGroupFormLoading: false,
      searchTitle: '2',
      id: <any>'',
    })
    const methods = {
      setMen(item: any) {
        item.id = item.userId
        methods.getCheckArray(item)
      },
      getCheckArray(item: any) {
        let groupsArr = []
        state.personList.forEach((list: any) => {
          console.log(item.userId == list.userId)
          if (item.userId == list.userId) {
            list.checked = true
          }
        })
        let obj = { ...item }
        groupsArr.push(obj, ...state.groupsList)
        state.groupsList = methods.filterArry(groupsArr)
      },
      //数组对象去重
      filterArry(arr: any) {
        var result = []
        var obj = {}
        for (var i = 0; i < arr.length; i++) {
          if (!obj[arr[i].userId]) {
            result.push(arr[i])
            obj[arr[i].userId] = true
          } else {
            proxy.Message.error('已存在该授权用户')
          }
        }
        return result
      },
      closeDataTree() {
        state.personList = []
      },
      getSearchTitle() {
        state.searchTitle = '2'
      },
      getValue(val: any) {
        if (val.type == 1 || !val.type) {
          if (val.id) {
            methods.getOrgUsersList(val.id)
          } else {
            methods.getOrgUsersList(val)
          }
        } else {
          val.userId = val.id
          methods.getCheckArray(val)
        }
      },
      //部门筛选人
      getOrgUsersList(val: any) {
        state.personList = []
        getOrgUsers({ orgId: val }).then((res: any) => {
          if (res) {
            state.personList = res
            state.personList.map((item: any) => {
              let index = state.userList.findIndex((value: any) => {
                return value.userId == item.userId
              })
              item.checked = index >= 0
            })
          } else {
            proxy.Message.error('该组织下暂无人员')
          }
        })
      },
      removePeople(item: any) {
        state.personList.forEach((list: any) => {
          if (item.userId == list.userId) {
            list.checked = false
          }
        })
        state.groupsList = state.groupsList.filter(
          (list: any) => list.userId !== item.userId
        )
      },
      resetData() {
        state.searchTitle = '2'
        methods.closeDataTree()
        refSelectTree.value.filterText = ''
        refSelectTree.value.valueTitle = ''
        state.groupsList = []
      },
      closeDrawer() {
        // refSelectTree.value.filterText = ''
        // console.log(refSelectTree.value)
        emit('closeChange', false)
        emit('resetDataList', [])
      },
      // 确定选中的人员
      addGroupUserSubmit() {
        if (state.groupsList.length == 0) {
          proxy.Message.error('请选择租户人员')
          return
        }
        emit('setDataList', state.groupsList)
        emit('closeChange', false)
      },
    }
    watch(
      [
        () => props.userList,
        () => props.currentTitle,
        () => props.value,
        () => state.visible,
        () => props.id,
      ],
      (val, oldVal) => {
        state.groupsList = val[0]
        state.userList = val[0]
        state.title = val[1]
        state.visible = val[2]
        state.id = val[4]
        return
        if (val[2] != oldVal[2]) {
          state.visible = val[2]
          emit('input', val)
          if (!val[2]) {
            methods.resetData()
          }
        }
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      refSelectTree,
    }
  },
}
</script>
<style scoped lang="less">
.personGroupBox {
  background-color: #f6f8f9;
  margin-top: 10px;
  .flexBox {
    display: flex;
    align-items: center;
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
}
</style>
