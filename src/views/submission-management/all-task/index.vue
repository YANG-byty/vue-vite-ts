<template>
  <div class="top-form mt20">
    <Form ref="dataFormRef" :model="dataForm" :label-width="100">
      <Row :gutter="88">
        <Col span="7">
          <FormItem label="汇报主题：">
            <Input v-model="dataForm.taskBatch" clearable maxlength="40" />
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="报送单位：">
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
        <Col span="7">
          <FormItem label="报送截止：">
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
          <Button type="primary" class="search" @click="getDataList">
            查询
          </Button>
        </Col>
      </Row>
      <Row :gutter="88">
        <Col span="7">
          <FormItem label="报送状态：">
            <Input v-model="dataForm.taskBatch" clearable maxlength="40" />
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="审核结果：">
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
        <Col span="7">
          <FormItem label="得牌信息：">
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
        <Col span="2">
          <Button class="reset" @click="resetForm"> 重置 </Button>
        </Col>
      </Row>
    </Form>
  </div>
  <div class="common-table">
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
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch } from 'vue'
import { taskStatusEnumList } from '@/libs/enum'
import router from '@/router'
import moment from 'moment'
export default {
  setup() {
    const state = reactive({
      dataForm: <any>{},
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          taskName: '学习贯彻重要决策部署、重要会议精神情况',
          deptName: '每季一次',
          num: 33,
          statusHide: '进行中',
          personNum: '3',
        },
      ],
      total: 0,
      taskStatusList: taskStatusEnumList,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '汇报主题',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '报送截止',
          key: 'deptName',
          align: 'left',
          minWidth: 150,
        },
        {
          title: '分发时间',
          key: 'personNum',
          align: 'center',
          minWidth: 150,
        },
        {
          title: '上报状态 / 审核结果',
          slot: 'status',
          align: 'center',
          minWidth: 180,
        },
        {
          title: '得牌信息',
          key: 'num',
          align: 'center',
          minWidth: 150,
        },
        {
          title: '报送时间',
          key: 'personNum',
          align: 'center',
          minWidth: 150,
        },
        {
          title: '报送用户',
          key: 'personNum',
          align: 'center',
          minWidth: 100,
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
      // 报送截止
      changeCreatDate(val: string) {
        state.dataForm.acquiredDate = val
      },
      // 详情
      openDetailInfo() {
        router.push('/submissionTask/detail')
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
        //       item.statusHide = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'label');
        //       item.class = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'class');
        //     });
        //   });
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
