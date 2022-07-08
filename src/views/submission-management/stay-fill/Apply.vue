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
      <Button class="reset" @click="handleDraft"> 保存草稿 </Button>
      <Button type="primary" @click="handleSubmit"> 提价审核 </Button>
    </div>
    <div class="detail-info">
      <p class="title mt20">报送详情</p>
      <div class="content-box">
        <FormItem label="报送内容：">
          <div class="pb20">
            <!-- 富文本编辑器 -->
            <div id="taskEditor" />
          </div>
        </FormItem>
        <FormItem label="附件：" prop="file">
          <p>
            最多支持5个附件文件、单个附件≤5MB、附件格式doc,docx,pdf,xls,xlsx格式。
          </p>
          <Upload
            :action="url + '/file/filetransfer/upload'"
            :show-upload-list="true"
            multiple
            :default-file-list="filePathList"
            :headers="uploadHeader"
            :before-upload="handleBeforeUpload"
            :on-success="fileSuccessFn"
            :on-remove="handleRemoveFn"
          >
            <Button type="success" style="width: 96px"> 选择 </Button>
          </Upload>
          <div>
            <span class="tag">yy.png</span>
          </div>
        </FormItem>
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
import { reactive, toRefs, onMounted, computed } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import router from '@/router'
import config from '@/config'
import * as util from '@/libs/util'
import E from 'wangeditor'
import SubmissionHistory from '@/components/SubmissionHistory.vue'
import AuditLog from '@/components/AuditLog.vue'
export default {
  components: { SubmissionHistory, AuditLog },
  setup(props) {
    let taskEditor: any = ''
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
      url: config.Setting.apiBaseURL,
      fileList: [],
      filePathList: [],
      uploadHeader: computed(() => {
        const token = util.getCookie('token')
        const tokenType = util.getCookie('token_type')
        return {
          Authorization: tokenType + ' ' + token,
        }
      }),
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
      handleDraft() {},
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
      // 选择附件
      handleBeforeUpload(file: any) {
        // 判断格式是否满足要求
        if (file.size > config.Setting.fileSize) {
          Message.info(
            '文件最大不能超过' + config.Setting.fileSize / 1024000 + 'M'
          )
          return false
        }
      },
      // 附件上传成功
      fileSuccessFn(response: any, file: any, fileList: any) {
        console.log(fileList)
        state.fileList = fileList
      },
      // 删除附件
      handleRemoveFn(file: any, fileList: any) {
        console.log(fileList)
        state.fileList = fileList
      },
      // 任务内容-富文本编辑器
      createdTaskEditor() {
        taskEditor = new E('#taskEditor')
        taskEditor.config.height = 'auto'
        taskEditor.config.showFullScreen = false
        taskEditor.config.uploadImgServer = '/upload-img'
        taskEditor.config.placeholder = '请填写审查报告内容!'
        taskEditor.config.fontSizes = {
          'x-small': { name: '10px', value: '1' },
          small: { name: '13px', value: '2' },
          normal: { name: '16px', value: '3' },
          large: { name: '18px', value: '4' },
          'x-large': { name: '24px', value: '5' },
          'xx-large': { name: '32px', value: '6' },
          'xxx-large': { name: '48px', value: '7' },
        }
        taskEditor.config.colors = [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf',
          '#FF0000',
        ]
        taskEditor.config.customUploadImg = function (
          file: any,
          insertImgFn: any
        ): void {
          // 上传图片开始
          // 创建formData对象
          const formData = new FormData()
          for (var i = 0; i < file.length; i++) {
            formData.append('file', file[i]) // 多张图片文件都放进一个form-data，有些小伙伴说这里应该这样写：formData.append("file[" + i + "]", files[i], files[i].name)，后端才能拿到完整的图片数组，其实不然，用这个formData.getAll("file")方法恰好拿到数组，或者也可以forEach获取，有很多种办法。
          }
          formData.append('size', '0')
          // requestRefers.uploadFile(formData).then((res: any) => {
          //   insertImgFn(res)
          // })
        }
        taskEditor.create()
      },
    }
    onMounted(() => {
      methods.createdTaskEditor()
    })
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
