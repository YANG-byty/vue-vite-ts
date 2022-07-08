<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="min-width: 510px">
      <div class="disFlexCenter title mt20">
        <p class="">单位租户</p>
        <Button class="search" type="primary" @click="addTenementFn">
          + 添加租户
        </Button>
      </div>
      <div class="content-box">
        <div class="common-table">
          <Table
            :columns="groupColumns"
            :loading="loading"
            :data="groupList"
            @on-row-click="nodeClick"
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
      style="min-width: 900px"
    >
      <div class="detail-info">
        <p class="navigation">莲都区纪委监委</p>
        <div class="disFlexCenter title mt20">
          <p class="">租户管理员</p>
          <Button class="search" type="primary" @click="addUnitFn">
            + 添加
          </Button>
        </div>
        <div class="content-box">
          <div class="common-table">
            <Table :columns="columns" :loading="loading" :data="dataList">
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
    <p class="mt20">
      该操作为高风险操作，如果您移除了该租户，那么该租户下所有的数据信息将全部被删除，且不可恢复。是否继续强制删除？
    </p>
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
  <select-user v-model="showSelectUnit" @closeChange="closeChange" />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import AddTenement from '@/components/AddTenement.vue'
import SelectUser from '@/components/SelectUser.vue'
export default {
  components: { AddTenement, SelectUser },
  setup(props) {
    const state = reactive({
      password: '',
      modalTenement: false,
      showAddTenement: false,
      showSelectUnit: false,
      dataForm: <any>{},
      fileList: [],
      filePathList: [],
      groupList: [
        {
          id: '100',
          name: '丽水市纪委监委',
        },
        {
          id: '101',
          name: '莲都区纪委监委',
        },
      ],
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
          minWidth: 260,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100,
        },
      ],
      dataList: [
        {
          taskName: '张三',
          num: 3435423466,
          time: '13298154657',
          remark: '市场部 / 产品部',
        },
      ],
      total: 0,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '姓名',
          key: 'taskName',
          align: 'center',
        },
        {
          title: '账号',
          key: 'num',
          align: 'center',
        },
        {
          title: '手机号',
          key: 'time',
          align: 'center',
        },
        {
          title: '主职部室',
          key: 'remark',
          align: 'center',
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
      // 添加租户
      selectTenement(data: any) {
        console.log(data)
      },
      addTenementFn() {
        state.showAddTenement = true
      },
      beforeClose() {
        state.modalTenement = false
      },
      ok() {
        if (state.password.length) {
          methods.beforeClose()
        } else {
          Message.error('密码不能为空')
        }
      },
      // 移出租户
      removeTenement(row: any) {
        state.modalTenement = true
      },
      // 点击行
      nodeClick(row: any) {
        console.log(row)
      },
      addUnitFn() {
        state.showSelectUnit = true
      },
      // 关闭
      closeChange(val: boolean) {
        state.showSelectUnit = val
        state.showAddTenement = val
      },
      // 分页
      groupPageCurrentChangeHandle(data: number) {
        state.params.page = data
      },
      // 翻页
      groupPageSizeChangeHandle(data: number) {
        state.params.limit = data
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
      },
      resetForm() {
        state.dataForm = {}
      },
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
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
