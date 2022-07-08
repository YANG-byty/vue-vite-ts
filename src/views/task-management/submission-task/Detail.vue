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
      <Button class="reset" @click="removeTask"> 删除任务 </Button>
      <Button type="primary" @click="handleSubmission"> 查看报送 </Button>
    </div>
    <div class="detail-info">
      <p class="title mt20">任务信息</p>
      <div class="content-box">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="任务名称：" prop="taskBatch">
              <Input
                v-model="dataForm.taskBatch"
                clearable
                maxlength="40"
                readonly
              />
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="任务年份：" prop="year">
              <DatePicker
                readonly
                type="year"
                v-model="dataForm.year"
                placeholder=""
                style="width: 200px"
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
        <FormItem label="上报要求：">
          <Input
            readonly
            v-model="dataForm.reporting"
            type="textarea"
            :rows="4"
            placeholder="请填写"
          />
        </FormItem>
        <FormItem label="任务内容：" prop="taskContent">
          <!-- 富文本 -->
          <div class="editor-wrap">富文本</div>
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
  </Form>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { Modal } from 'view-ui-plus'
import router from '@/router'
export default {
  props: ['value', 'id'],
  components: {},
  setup(props) {
    const state = reactive({
      visible: false,
      title: '新建计划',
      showSelectUnit: false,
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
    })

    const methods = {
      // 删除任务
      removeTask() {
        Modal.confirm({
          title: '提示',
          content: '当前任务删除后不可恢复、确定要删除该报送任务吗？',
          onOk: () => {},
          onCancel: () => {
            return false
          },
        })
      },
      // 查看报送
      handleSubmission() {
        router.push('/stayAudit/Detail')
      },
      // 关闭抽屉
      beforeClose() {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '该表单尚未填写完成，确定要取消么？',
            onOk: () => {
              state.visible = false
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
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
