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
            <Select v-model="dataForm.taskStatus" clearable>
              <Option
                v-for="item in submissionUnitList"
                :value="item.value"
                :key="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="报送时间：">
            <DatePicker
              type="datetimerange"
              style="width: 100%"
              v-model="dataForm.acquiredDate"
              clearable
              :editable="false"
              placeholder=""
              format="yyyy-MM-dd HH:mm"
              @on-change="changeCreatDate($event, 1)"
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
          <FormItem label="报送截止：">
            <DatePicker
              type="datetimerange"
              style="width: 100%"
              v-model="dataForm.acquiredOut"
              clearable
              :editable="false"
              placeholder=""
              format="yyyy-MM-dd HH:mm"
              @on-change="changeCreatDate($event, 2)"
            />
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="复审标识：">
            <Select v-model="dataForm.taskStatus" clearable>
              <Option
                v-for="item in recheckList"
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
            <Select v-model="dataForm.taskStatus" clearable>
              <Option
                v-for="item in boardList"
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
            <span @click="openDetailInfo(row)">
              <i class="iconfont icon-fabudehuodong-daishenhe" />
              去审核</span
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
import { boardList } from '@/libs/enum'
import router from '@/router'
export default {
  setup() {
    const state = reactive({
      dataForm: <any>{},
      submissionUnitList: [
        {
          value: 1,
          label: '使用单位选择器',
        },
      ],
      recheckList: [
        {
          value: 1,
          label: '是',
        },
        {
          value: 2,
          label: '否',
        },
      ],
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          taskName: '学习贯彻重要决策部署、重要会议精神情况',
          deptName: '每季一次',
          num: '不得牌',
          statusHide: '进行中',
          personNum: '否',
        },
      ],
      total: 0,
      boardList: boardList,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '汇报主题',
          key: 'taskBatch',
          align: 'center',
          ellipsis: true,
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '报送单位',
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
        },
        {
          title: '复审标识',
          key: 'personNum',
          align: 'center',
        },
        {
          title: '报送时间',
          key: 'personNum',
          align: 'center',
        },
        {
          title: '得牌信息',
          key: 'num',
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
      // 选择时间
      changeCreatDate(val: any, flag: number) {
        switch (flag) {
          case 1:
            state.dataForm.acquiredDate = val
            break
          case 2:
            state.dataForm.acquiredOut = val
            break
        }
      },
      // 详情
      openDetailInfo() {
        router.push('/stayAudit/Detail')
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
