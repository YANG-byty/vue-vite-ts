<template>
  <div class="top-form mt20">
    <Form ref="dataFormRef" :model="dataForm" :label-width="100">
      <Row :gutter="88">
        <Col span="6">
          <FormItem label="汇报主题：">
            <Input v-model="dataForm.taskBatch" clearable maxlength="40" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="任务状态：">
            <Select v-model="dataForm.taskStatus" clearable placeholder="">
              <Option
                v-for="item in taskStatusList"
                :value="item.value"
                :key="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="创建时间：">
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
        </Col>
        <Col span="2">
          <Button class="reset" @click="resetForm"> 重置 </Button>
        </Col>
        <Col span="2">
          <Button type="primary" class="search" @click="getDataList">
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
  <Button type="primary" class="search mt20" @click="handleAddForm">
    新建任务
  </Button>
  <div class="common-table">
    <div class="table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template #status="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template #action="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(row)">
              <i class="iconfont icon-details" />
              详情</span
            >
            <span @click="handleAddForm(row)"
              ><i class="iconfont icon-bianji" />编辑</span
            >
            <span @click="handleCancellation(row)"
              ><i
                class="iconfont icon-zuofei1"
                style="font-size: 14px"
              />作废</span
            >
            <span @click="handleDelete(row)"
              ><i class="iconfont icon-shanchu" />删除</span
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
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { planStatusEnumList } from '@/libs/enum'
import router from '@/router'
export default {
  setup() {
    const state = reactive({
      dataForm: {
        createStartTime: '',
        createEndTime: '',
        acquiredDate: [],
        taskBatch: '',
        taskStatus: '',
      },
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          taskName: '学习贯彻重要决策部署、重要会议精神情况',
          deptName: '每季一次',
          num: 33,
          statusHide: '进行中',
          personNum: '2022-3-9 13:50:59',
        },
      ],
      total: 0,
      taskStatusList: planStatusEnumList,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '计划编号',
          key: 'taskBatch',
          align: 'center',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '汇报主题',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '报送频次',
          key: 'deptName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '报送单位数量',
          key: 'num',
          align: 'center',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '计划状态',
          slot: 'status',
          align: 'center',
        },
        {
          title: '创建时间',
          key: 'personNum',
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 270,
        },
      ],
    })
    const methods = {
      // 作废
      handleCancellation() {},
      // 删除
      handleDelete() {},
      // 详情
      openDetailInfo() {
        router.push('/taskPlan/detail')
      },
      // 新增
      handleAddForm() {
        router.push('/taskPlan/apply')
      },
      // 查询列表
      getDataList() {
        // requestRefers
        //   .dffPage({
        //     ...this.params,
        //     ...this.dataForm
        //   })
        //   .then((res) => {
        //     this.dataList = res.list || [];
        //     this.loading = false;
        //     this.total = res.total || 0;
        //     this.dataList.forEach((item) => {
        //       item.statusHide = this.enumConversion(planStatusEnumList, 'value', item.taskStatus, 'label');
        //       item.class = this.enumConversion(planStatusEnumList, 'value', item.taskStatus, 'class');
        //     });
        //   });
      },
      // 重置
      resetForm() {
        state.dataForm = {
          createStartTime: '',
          createEndTime: '',
          acquiredDate: [],
          taskBatch: '',
          taskStatus: '',
        }
        methods.getDataList()
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
      // 创建时间选中
      changeCreatDate(date: Array<string>) {
        state.dataForm.createStartTime = date[0]
        state.dataForm.createEndTime = date[1]
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
