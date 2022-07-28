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
    <div class="table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template #status="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template #action="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(1, row)">
              <i class="iconfont icon-details" />
              任务详情</span
            >
            <span @click="openDetailInfo(2, row)">
              <i class="iconfont icon-details" />
              报送详情</span
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
import { reactive, toRefs, onMounted, watch } from 'vue'
import { planStatusEnumList } from '@/libs/enum'
import { Modal } from 'view-ui-plus'
import router from '@/router'
export default {
  setup() {
    const state = reactive({
      dataForm: <any>{},
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          taskName: '学习贯彻重要决策部署、重要会议精神情况',
          deptName: '每季一次',
          num: '是',
          statusHide: '已报送 / 未通过',
          personNum: '张三',
          time: '2022-6-17',
          dateTime: '2022-6-20 14:33:08',
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
          title: '汇报主题',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '报送截止',
          key: 'time',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '分发时间',
          key: 'time',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '上报状态 / 审核结果',
          slot: 'status',
          align: 'center',
          minWidth: 170,
        },
        {
          title: '是否草稿',
          key: 'num',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '得牌信息',
          key: 'num',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '报送时间',
          key: 'dateTime',
          align: 'center',
          minWidth: 180,
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
          width: 220,
        },
      ],
    })
    const methods = {
      // 报送截止
      changeCreatDate(val: string) {
        state.dataForm.acquiredDate = val
      },
      // 详情
      openDetailInfo(flag: number) {
        switch (flag) {
          case 1:
            router.push('/submissionTask/detail')
            break
          case 2:
            router.push('/allTask/detail')
            break

          default:
            break
        }
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
