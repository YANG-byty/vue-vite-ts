<template>
  <Form ref="dataFormRef" :model="dataForm" label-position="top">
    <div class="detail-top">
      <p class="title">学习贯彻重要决策部署、重要会议精神情况</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5"> 计划状态：进行中、已结束、已作废 </Col>
          <Col span="5"> 创建用户：李春洋 </Col>
          <Col span="5"> 创建时间：2022-6-18 16:53:57 </Col>
          <Col span="5"> 创建单位：杭州市百图科技有限公司 / 信息中心 </Col>
        </Row>
      </div>
    </div>
    <div class="footer-button align-right">
      <Button class="reset" @click="handleOperationLog"> 操作日志 </Button>
      <Button class="reset" @click="handleCancellation"> 作废 </Button>
      <Button class="reset" @click="removeTask"> 删除 </Button>
      <Button type="primary" @click="handleEdit"> 编辑 </Button>
    </div>
    <!-- 基本信息 -->
    <div class="detail-info mt20">
      <p class="title mt20">基本信息</p>
      <div class="content-box">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="汇报主题：" prop="taskBatch">
              <Input
                v-model="dataForm.taskBatch"
                clearable
                maxlength="40"
                readonly
              />
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="计划年度：" prop="year">
              <DatePicker
                readonly
                type="year"
                v-model="dataForm.year"
                placeholder=""
                style="width: 12.5rem"
                format="yyyy"
              />
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="赋牌策略：" prop="taskStatus">
              <Input readonly v-model="dataForm.taskStatus" placeholder="--" />
            </FormItem>
          </Col>
        </Row>
        <FormItem label="任务内容：" prop="taskContent">
          <!-- 富文本 -->
          <div class="editor-wrap w-e-text" v-html="msg"></div>
        </FormItem>
        <FormItem label="任务内容：">
          <Input
            readonly
            v-model="dataForm.reporting"
            type="textarea"
            :rows="4"
            placeholder="请填写"
          />
        </FormItem>
        <FormItem label="任务备注：">
          <!-- 富文本 -->
          <div class="editor-wrap">富文本</div>
        </FormItem>
        <FormItem label="附件：" prop="file">
          <p>
            最多支持5个附件文件、单个附件≤5MB、附件格式doc,docx,pdf,xls,xlsx格式。
          </p>
          <div>
            <span class="tag">yy.png</span>
          </div>
        </FormItem>
      </div>
    </div>
    <!-- 报送频率 -->
    <div class="detail-info mt20">
      <p class="title mt20">报送频率</p>
      <div class="content-box">
        <div class="flexItems flexCenter" style="max-width: 93.75rem">
          <FormItem class="disFlex flexItems">
            <span style="color: #515a6e">填报频率：</span>
            <Input readonly v-model="dataForm.frequency" placeholder="--" />
          </FormItem>
        </div>
        <div class="card-wrap" style="max-width: 101.375rem">
          <FormItem
            class="disFlex flexItems"
            v-for="(item, index) in 12"
            :key="index"
          >
            <Card dis-hover>
              <template #title>
                <div class="disFlex flexCenter">
                  <span>填报日期</span>
                </div>
              </template>
              <div>
                <span>开始：</span>
                <DatePicker
                  type="date"
                  v-model="dataForm.startTime"
                  placeholder=""
                  style="width: 12.5rem"
                  format="yyyy-mm-dd"
                  readonly
                />
                <span style="margin-left: 0.625rem">截止：</span>
                <DatePicker
                  type="date"
                  v-model="dataForm.endTime"
                  placeholder=""
                  style="width: 12.5rem"
                  format="yyyy-mm-dd"
                  readonly
                />
              </div>
            </Card>
          </FormItem>
        </div>
      </div>
    </div>
    <!-- 报送单位 -->
    <div class="detail-info">
      <p class="title mt20">报送单位</p>
      <div class="content-box">
        <div class="mt20" />
        <Card dis-hover>
          <template #title> 注意事项 </template>
          <p>
            （1）增加单位：增加单位后、系统自动根据报送计划，将新增单位缺失的报送任务补充完整。
          </p>
          <p>
            （2）减少单位：被减少单位对于该计划之前的所有填报任务均被删除，且不可恢复。
          </p>
        </Card>
        <div class="mt20" />
        <div class="common-table">
          <Table :columns="columns" :loading="loading" :data="dataList">
            <template #status="{ row }">
              <span :class="row.class">{{ row.statusHide }}</span>
            </template>
            <template #unit="{ row }">
              <span class="blue-tag">{{ row.taskName }}</span>
            </template>
            <template #action="{ row }">
              <div class="table-action">
                <span @click="openDetailInfo(row)">
                  <i class="iconfont icon-xiangqing" />
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
      </div>
    </div>
  </Form>
  <!-- 选择单位 -->
  <select-unit
    :value="showSelectUnit"
    :disable="disable"
    @closeChange="closeChange"
  />
  <!-- 操作日志 -->
  <operation-log :value="showOperationLog" @closeChange="closeChange" />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import SelectUnit from '@/components/SelectUnit.vue'
import OperationLog from '@/components/OperationLog.vue'
import router from '@/router'
export default {
  components: { SelectUnit, OperationLog },
  setup(props) {
    const state = reactive({
      disable: true,
      showSelectUnit: false,
      showOperationLog: false,
      dataForm: {
        taskBatch: '',
        year: '',
        taskStatus: '',
        taskContent: '',
      },
      fileList: [],
      filePathList: [],
      frequencyList: [
        {
          id: 1,
          title: '每月一次',
        },
        {
          id: 2,
          title: '每季一次',
        },
        {
          id: 3,
          title: '半年一次',
        },
        {
          id: 4,
          title: '全年一次',
        },
        {
          id: 5,
          title: '手动指定',
        },
      ],
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          remark: '学习贯彻重要决策部署、重要会议精神情况',
          taskName: '每季一次',
          num: 33,
        },
      ],
      loading: false,
      total: 0,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '单位名称',
          slot: 'unit',
          align: 'left',
          minWidth: 300,
        },
        {
          title: '填报成员',
          key: 'num',
          align: 'left',
          minWidth: 100,
        },
        {
          title: '分发备注',
          key: 'remark',
          align: 'center',
          ellipsis: true,
          tooltip: true,
          minWidth: 300,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 220,
        },
      ],
      msg: '<blockquote><p data-we-empty-p="" style="line-height:1.6; text-align:justify;"><i><b>若</b>若若若<font size="6">若</font>若<font face="仿宋">若若若</font>若eq<strike>wer</strike>q<u>w玩儿</u><span style="font-size: 14px;"></span><span style="font-size: 14px;"></span><u>若</u>若若<strike></strike>若若若<strike></strike><span style="font-size: 14px;"></span><span style="font-size: 14px;"></span><font color="#ff0000">若若若若</font>若<span style="background-color: rgb(77, 128, 191);">若若若</span>若若若<strike>若若</strike>若&nbsp; &nbsp;<i>66666</i></i></p></blockquote><p><br/></p><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th><i>sdfasdf</i></th><th><i>asdf</i></th><th><i>asdf</i></th><th><i>ddd</i></th><th><i>dd</i></th></tr><tr><td><i>sdfasdfd</i></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>',
    })

    const methods = {
      // 作废
      handleCancellation() {},
      // 删除
      removeTask() {},
      // 点击操作日志
      handleOperationLog() {
        state.showOperationLog = true
      },
      // 点击报送单位详情
      openDetailInfo() {
        state.showSelectUnit = true
      },
      closeChange(val: boolean) {
        state.showSelectUnit = val
        state.showOperationLog = val
      },
      // 编辑
      handleEdit() {
        router.push('/taskPlan/apply')
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
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
.ivu-date-picker,
.ivu-select {
  width: 20.625rem !important;
}

.flexItems {
  display: flex;
  align-items: center;
}
.flexCenter {
  justify-content: space-between;
}
.ivu-card-body {
  .ivu-date-picker,
  .ivu-select {
    width: 7.5rem !important;
  }
}
.card-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
