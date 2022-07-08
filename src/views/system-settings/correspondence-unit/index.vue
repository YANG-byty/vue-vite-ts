<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="min-width: 510px">
      <div class="disFlexCenter title mt20">
        <p class="">平台租户</p>
      </div>
      <div class="content-box">
        <div class="common-table">
          <Table
            :columns="groupColumns"
            :loading="loading"
            :data="groupList"
            @on-row-click="nodeClick"
          />
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
          <p class="">对应报送单位</p>
          <Button class="search" type="primary" @click="addUnitFn">
            + 添加单位
          </Button>
        </div>
        <div class="content-box">
          <div class="disFlex">
            <FormItem label="报送内容：" class="mr20">
              <Input readonly v-model="dataForm.reporting" />
            </FormItem>
            <FormItem label="设置时间：" class="mr20">
              <DatePicker
                type="datetimerange"
                style="width: 100%"
                v-model="dataForm.acquiredDate"
                clearable
                :editable="false"
                placeholder=""
                format="yyyy-MM-dd HH:mm"
                @on-change="changeCreatDate"
              />
            </FormItem>
            <Button class="reset mr20" @click="resetForm"> 重置 </Button>
            <Button class="search" type="primary" @click="getDataList">
              查询
            </Button>
          </div>
          <div class="common-table">
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
  <select-unit v-model="showSelectUnit" @closeChange="closeChange" />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import SelectUnit from '@/components/SelectUnit.vue'
export default {
  components: { SelectUnit },
  setup(props) {
    const state = reactive({
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
          title: '单位名称',
          key: 'name',
          align: 'left',
          minWidth: 260,
        },
      ],
      dataList: [
        {
          taskName: '莲都区纪委监察委',
          num: 12,
          time: '2022-6-16 14:52:05',
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
          title: '单位名称',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '填报人员',
          key: 'num',
          align: 'center',
          minWidth: 60,
        },
        {
          title: '设置时间',
          key: 'time',
          align: 'center',
          minWidth: 120,
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
      // 移除分组
      removeFn() {},
      // 选择时间
      changeCreatDate(val: any) {
        state.dataForm.acquiredDate = val
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
      },
      // 获取列表
      getDataList() {},
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

<style lang="less" scoped></style>
