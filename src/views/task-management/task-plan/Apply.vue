<template>
  <Form
    ref="dataFormRef"
    :model="dataForm"
    :rules="ruleValidate"
    label-position="top"
  >
    <!-- 基本信息 -->
    <div class="detail-info mt20">
      <p class="title mt20">基本信息</p>
      <div class="content-box">
        <Row :gutter="88">
          <Col span="7">
            <FormItem label="汇报主题：" prop="taskBatch">
              <Input v-model="dataForm.taskBatch" clearable maxlength="40" />
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="计划年度：" prop="year">
              <DatePicker
                type="year"
                v-model="dataForm.year"
                placeholder=""
                style="width: 200px"
                format="yyyy"
                @on-change="changeDate"
              />
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="赋牌策略：" prop="taskStatus">
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
        </Row>
        <FormItem label="任务内容：" prop="taskContent">
          <!-- 富文本编辑器 -->
          <div id="taskContentEditor" ref="taskContentEditor" />
        </FormItem>
        <FormItem label="任务内容：">
          <Input
            v-model="dataForm.reporting"
            type="textarea"
            :rows="4"
            placeholder="请填写"
          />
        </FormItem>
        <FormItem label="任务备注：">
          <!-- 富文本编辑器 -->
          <div id="remarkEditor" />
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
    <!-- 报送频率 -->
    <div class="detail-info mt20">
      <p class="title mt20">报送频率</p>
      <div class="content-box">
        <div class="flexItems flexCenter" style="max-width: 1500px">
          <FormItem class="disFlex flexItems">
            <span style="color: #515a6e">填报频率：</span>
            <Select
              v-model="dataForm.frequency"
              placeholder="请选择"
              @on-change="frequencyChangeFn"
            >
              <Option
                v-for="item in frequencyList"
                :value="item.id"
                :key="item.id"
              >
                {{ item.title }}
              </Option>
            </Select>
          </FormItem>
          <Button
            type="primary"
            v-if="dataForm.frequency == 5"
            @click="addFrequencyFn"
          >
            + 填报周期
          </Button>
        </div>

        <div class="card-wrap" style="max-width: 1622px">
          <FormItem
            class="disFlex flexItems"
            v-for="(item, index) in planDateList"
            :key="index"
          >
            <Card>
              <template #title>
                <div class="disFlex flexCenter">
                  <span>填报日期</span>
                  <span class="deleteBtn" type="text">删除</span>
                </div>
              </template>
              <div>
                <span>开始：</span>
                <DatePicker
                  type="date"
                  v-model="item.startTime"
                  placeholder=""
                  style="width: 200px"
                  format="yyyy-MM-dd"
                  :clearable="false"
                  @on-change="timeChangeFn('start', item, index)"
                />
                <span style="margin-left: 10px">截止：</span>
                <DatePicker
                  type="date"
                  v-model="item.endTime"
                  placeholder=""
                  style="width: 200px"
                  format="yyyy-MM-dd"
                  :clearable="false"
                  @on-change="timeChangeFn('end', item, index)"
                />
              </div>
            </Card>
          </FormItem>
        </div>
      </div>
    </div>
    <!-- 报送单位 -->
    <div class="detail-info mt20">
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
        <div class="flexItems flexCenter">
          <Button type="warning"> 全部删除 </Button>
          <Button type="primary" @click="addUnit"> + 填报单位 </Button>
        </div>
        <div class="mt20" />
        <div class="common-table">
          <div class="table">
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
                  <span @click="handleDelete(row)"
                    ><i class="iconfont icon-fenfa" />删除</span
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
      </div>
    </div>
    <div class="footer-button align-right">
      <Button type="primary" @click="handleSave"> 保存 </Button>
      <Button @click="beforeClose"> 取消 </Button>
    </div>
  </Form>
  <!-- 选择单位 -->
  <select-unit
    :value="showSelectUnit"
    :disable="disable"
    @setUnitList="setUnitList"
    @closeChange="closeChange"
  />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch, ref, computed } from 'vue'
import { Message, Modal } from 'view-ui-plus'
import E from 'wangeditor'
import config from '@/config'
import * as util from '@/libs/util'
import SelectUnit from '@/components/SelectUnit.vue'
import router from '@/router'
import moment from 'moment'

export default {
  props: [],
  components: {
    SelectUnit,
  },
  setup(props, { emit }) {
    const dataFormRef = ref()
    let taskEditor: any = ''
    let remarkEditor: any = ''
    const state = reactive({
      disable: false,
      showSelectUnit: false,
      taskStatusList: [
        {
          value: '1',
          label: '赋牌策略',
        },
      ],
      dataForm: <any>{},
      ruleValidate: {
        taskBatch: [
          { required: true, message: '汇报主题不能为空', trigger: 'blur' },
        ],
        year: [
          {
            required: true,
            message: '计划年度不能为空',
            trigger: 'change',
          },
        ],
        taskStatus: [
          { required: true, message: '赋牌策略不能为空', trigger: 'change' },
        ],
        taskContent: [
          { required: true, message: '任务内容不能为空', trigger: 'change' },
        ],
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
          align: 'left',
          slot: 'unit',
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
      planDateList: <any[]>[],
      allMonthList: <any[]>[],
      msg: '<blockquote><p data-we-empty-p="" style="line-height:1.6; text-align:justify;"><i><b>若</b>若若若<font size="6">若</font>若<font face="仿宋">若若若</font>若eq<strike>wer</strike>q<u>w玩儿</u><span style="font-size: 14px;"></span><span style="font-size: 14px;"></span><u>若</u>若若<strike></strike>若若若<strike></strike><span style="font-size: 14px;"></span><span style="font-size: 14px;"></span><font color="#ff0000">若若若若</font>若<span style="background-color: rgb(77, 128, 191);">若若若</span>若若若<strike>若若</strike>若&nbsp; &nbsp;<i>66666</i></i></p></blockquote><p><br/></p><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th><i>sdfasdf</i></th><th><i>asdf</i></th><th><i>asdf</i></th><th><i>ddd</i></th><th><i>dd</i></th></tr><tr><td><i>sdfasdfd</i></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>',
    })
    const methods = {
      // 点击添加填报
      addFrequencyFn() {
        if (state.planDateList.length < 60) {
          state.planDateList.push({
            startTime: '',
            endTime: '',
          })
        }
      },
      // 填报频率选择
      frequencyChangeFn(val: number) {
        switch (val) {
          case 1:
            state.planDateList = state.allMonthList
            break
          case 2:
            let list = [
              state.allMonthList.slice(0, 3),
              state.allMonthList.slice(3, 6),
              state.allMonthList.slice(6, 9),
              state.allMonthList.slice(9, 12),
            ]
            let arr: any = []
            list.map((item) => {
              arr.push({
                startTime: item[0].startTime,
                endTime: item[2].endTime,
              })
            })
            state.planDateList = arr
            break
          case 3:
            state.planDateList = [
              {
                startTime: state.allMonthList.slice(0, 6)[0].startTime,
                endTime: state.allMonthList.slice(0, 6)[2].endTime,
              },
              {
                startTime: state.allMonthList.slice(6, 12)[0].startTime,
                endTime: state.allMonthList.slice(6, 12)[2].endTime,
              },
            ]
            break
          case 4:
            state.planDateList = [
              {
                startTime: state.allMonthList[0].startTime,
                endTime: state.allMonthList[11].endTime,
              },
            ]
            break
          case 5:
            state.planDateList = []
            break

          default:
            break
        }
      },
      // 选择时间
      timeChangeFn(flag: string, item: any, index: number) {
        if (item.startTime && item.endTime) {
          let startTime = moment(item.startTime).format('YYYY-MM-DD')
          let endTime = moment(item.endTime).format('YYYY-MM-DD')
          if (startTime > endTime) {
            Message.error('截止日期不能早于开始日期')
            switch (flag) {
              case 'start':
                item.startTime = ''
                break
              case 'end':
                item.endTime = ''
                break
              default:
                break
            }
            return
          }
        }
        if (state.planDateList.length > 1) {
          for (let i = 0; i < state.planDateList.length; i++) {
            const element = state.planDateList[i]
            if (i != index) {
              let isDate = methods.isDateIntersection(
                moment(item.startTime).format('YYYY-MM-DD'),
                moment(item.endTime).format('YYYY-MM-DD'),
                moment(element.startTime).format('YYYY-MM-DD'),
                moment(element.endTime).format('YYYY-MM-DD')
              )
              if (isDate) {
                Message.error('日期不能重叠！')
                switch (flag) {
                  case 'start':
                    item.startTime = ''
                    break
                  case 'end':
                    item.endTime = ''
                    break
                  default:
                    break
                }
              }
            }
          }
        }
      },
      // 判断时间段是否重叠
      isDateIntersection(
        start1: string,
        end1: string,
        start2: string,
        end2: string
      ) {
        var startdate1 = new Date(start1.replace('-', '/').replace('-', '/'))
        var enddate1 = new Date(end1.replace('-', '/').replace('-', '/'))

        var startdate2 = new Date(start2.replace('-', '/').replace('-', '/'))
        var enddate2 = new Date(end2.replace('-', '/').replace('-', '/'))

        if (startdate1 >= startdate2 && startdate1 <= enddate2) {
          return true
        }

        if (enddate1 >= startdate2 && enddate1 <= enddate2) {
          return true
        }

        if (startdate1 <= startdate2 && enddate1 >= enddate2) {
          return true
        }
        return false
      },
      // 获取本年12个月日期
      getMonthTime() {
        var tempDate = new Date()
        var year = tempDate.getFullYear()
        for (let i = 0; i < 12; i++) {
          var month = i + 1
          var mon: any = ''
          var d = new Date(year, month, 1) //取当年当月中的第一天
          var lastDay: any = new Date(
            d.getTime() - 1000 * 60 * 60 * 24
          ).getDate() //获取当月最后一天日期
          mon = month < 10 ? '0' + month : month
          var firstDay = year + '-' + mon + '-' + '0' + d.getDate()
          lastDay = year + '-' + mon + '-' + lastDay
          state.allMonthList.push({
            startTime: firstDay,
            endTime: lastDay,
          })
        }
      },
      // 获取选中单位数组
      setUnitList(val: any) {
        console.log(val)
      },
      // 点击填报单位
      addUnit() {
        state.disable = false
        state.showSelectUnit = true
      },
      // 点击报送单位详情
      openDetailInfo() {
        state.disable = true
        state.showSelectUnit = true
      },
      // 回退
      beforeClose() {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '该表单尚未填写完成，确定要取消么？',
            onOk: () => {
              router.go(-1)
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
        })
      },
      changeDate(val: string) {
        if (val) {
          state.dataForm.year = moment(val).format('YYYY')
        }
        console.log(state.dataForm.year)
      },
      // 任务内容-富文本编辑器
      createdTaskEditor() {
        taskEditor = new E('#taskContentEditor')
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

        taskEditor.txt.html(state.msg)
      },
      // 任务备注-富文本编辑器
      createdRemarkEditor() {
        remarkEditor = new E('#remarkEditor')
        remarkEditor.config.height = 'auto'
        remarkEditor.config.showFullScreen = false
        remarkEditor.config.uploadImgServer = '/upload-img'
        remarkEditor.config.placeholder = '请填写审查报告内容!'
        remarkEditor.config.fontSizes = {
          'x-small': { name: '10px', value: '1' },
          small: { name: '13px', value: '2' },
          normal: { name: '16px', value: '3' },
          large: { name: '18px', value: '4' },
          'x-large': { name: '24px', value: '5' },
          'xx-large': { name: '32px', value: '6' },
          'xxx-large': { name: '48px', value: '7' },
        }
        remarkEditor.config.colors = [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf',
          '#FF0000',
        ]
        remarkEditor.config.customUploadImg = function (
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
        remarkEditor.create()
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
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
      },
      // 保存点击
      handleSave() {
        // 获取任务备注
        console.log(taskEditor.txt.html())

        dataFormRef.value.validate((valid: any) => {
          if (valid) {
            console.log(valid)

            // state.dataForm.orgName = this.orgList[0].orgName
            // state.dataForm.orgId = this.orgList[0].id
            // state.dataForm.userList = []
            // state.userList.forEach((item) => {
            //   state.dataForm.userList.push({
            //     uid: item.id,
            //     userName: item.nickName,
            //   })
            // })
            // requestRefers.userOrgAdd(state.dataForm).then((res) => {
            //   Message.success('新建角色成功')
            // })
            // } else {
            //   Message.error('请填写带*内容后再提交!')
          }
        })
      },
      closeChange(val: boolean) {
        state.showSelectUnit = val
      },
    }
    onMounted(() => {
      methods.createdTaskEditor()
      methods.createdRemarkEditor()
      methods.getMonthTime()
    })
    return {
      ...toRefs(state),
      ...methods,
      taskEditor,
      remarkEditor,
      dataFormRef,
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
