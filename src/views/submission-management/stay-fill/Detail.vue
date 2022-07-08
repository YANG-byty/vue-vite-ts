<template>
  <Form ref="dataFormRef" :model="dataForm" label-position="top">
    <div class="detail-top">
      <p class="title">学习贯彻重要决策部署、重要会议精神情况</p>
      <div class="detail-item">
        <Row :gutter="100" class="mt20">
          <Col span="5"> 任务状态：正常 / 作废 </Col>
          <Col span="5"> 任务年度：2022 </Col>
          <Col span="5"> 分发时间：2022-6-11 </Col>
          <Col span="5"> 下发单位：杭州市百图科技有限公司 / 信息中心 </Col>
        </Row>
        <Row :gutter="100">
          <Col span="5"> 报送状态：未报送 </Col>
          <Col span="5"> 赋牌策略：自动复牌 </Col>
          <Col span="5"> 报送周期：2022-6-1 至 2022-6-30 </Col>
          <Col span="5"> 报送单位：丽水百图科技有限公司 </Col>
        </Row>
      </div>
    </div>
    <div class="footer-button align-right">
      <Button class="reset" @click="handleTaskDetail"> 任务详情 </Button>
      <Button class="reset" @click="handleRecord"> 报送记录 </Button>
      <Button class="reset" @click="handleAuditLog"> 审核日志 </Button>
      <Button class="reset" @click="handleEdit"> 编辑内容 </Button>
      <Button type="primary" @click="handleSubmit"> 提价审核 </Button>
    </div>
    <div class="detail-info">
      <p class="title mt20">报送详情</p>
      <div class="content-box">
        <FormItem label="报送内容：">
          <Input
            readonly
            v-model="dataForm.reporting"
            type="textarea"
            :rows="4"
            placeholder="--"
          />
        </FormItem>
        <FormItem label="附件：" prop="file">
          <div>
            <span class="tag">yy.png</span>
          </div>
        </FormItem>
        <div class="not-available-content">暂无提交报内容</div>
      </div>
    </div>
  </Form>

  <!-- 报送记录 -->
  <submission-history v-model="showHistory" />
  <!-- 审核日志 -->
  <audit-log
    :value="showAuditLog"
    :node-log-info="nodeLogInfo"
    @closeChange="closeChange"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import router from '@/router'
import SubmissionHistory from '@/components/SubmissionHistory.vue'
import AuditLog from '@/components/AuditLog.vue'
export default {
  components: { SubmissionHistory, AuditLog },
  setup(props) {
    const state = reactive({
      nodeLogInfo: [
        {
          approveStatus: 'agree',
          createTime: '2022-05-16 15:28:55',
          instanceStatus: 2,
          processId: '3a369085827d4889a0b28a53a00ed09b',
          nodeList: [
            {
              action: null,
              actionExt: null,
              actionRemark: null,
              deal: '已结束',
              icon: 1,
              nodeName: '已结束',
              operateTime: null,
              operationName: null,
              sendList: null,
            },
          ],
        },
      ],
      showHistory: false,
      showAuditLog: false,
      dataForm: {
        taskBatch: '',
        year: '',
        taskStatus: '',
        taskContent: '',
      },
      fileList: [],
      filePathList: [],
    })

    const methods = {
      closeChange(val: boolean) {
        state.showAuditLog = val
      },
      // 任务详情
      handleTaskDetail() {
        router.push('/submissionTask/detail')
      },
      // 报送记录
      handleRecord() {
        state.showHistory = true
      },
      // 审核日志
      handleAuditLog() {
        state.showAuditLog = true
      },
      // 编辑内容
      handleEdit() {
        router.push('/allTask/apply')
      },
      // 提价审核
      handleSubmit() {
        Modal.confirm({
          title: '提示',
          content: '当前任务报送后不可撤回、不可编辑，确定立即报送吗？',
          onOk: () => {
            Message.success('提交成功')
          },
          onCancel: () => {
            return false
          },
        })
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
  width: 330px !important;
}

.flexItems {
  display: flex;
  align-items: center;
}
.flexCenter {
  justify-content: space-between;
}
.deleteBtn {
  color: #57a3f3;
  cursor: pointer;
}
.ivu-card-body {
  .ivu-date-picker,
  .ivu-select {
    width: 120px !important;
  }
}
.card-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
