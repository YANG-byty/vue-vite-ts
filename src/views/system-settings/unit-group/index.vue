<template>
  <div class="disFlex">
    <div class="detail-info mr10" style="min-width: 510px">
      <div class="disFlexCenter title mt20">
        <p class="">单位分组</p>
        <Button class="search" type="primary" @click="addGroupFn">
          + 添加分组
        </Button>
      </div>
      <div class="content-box">
        <div class="common-table">
          <Table :columns="groupColumns" :loading="loading" :data="groupList">
            <template #status="{ row }">
              <span :class="row.class">{{ row.statusHide }}</span>
            </template>
            <template #action="{ row }">
              <div class="table-action">
                <span @click="addGroupFn(row)">
                  <i class="iconfont icon-bianji" />
                  编辑
                </span>
                <span @click="groupRemove(row)">
                  <i class="iconfont icon-shanchu" />
                  删除
                </span>
              </div>
            </template>
          </Table>
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
      <div class="detail-top mt20">
        <p class="title">分组名称：市值单位任务发布组</p>
        <div class="detail-item">
          <Row :gutter="100" class="mt20">
            <Col span="24">
              分组备注：2017年4月19日，习近平总书记来到北海市铁山港公用码头，察看码头运营。得知铁山港短短几年货物年吞吐量由100多万吨增加到2000多万吨，总书记很高兴。总书记强调，写好海上丝绸之路新篇章，港口建设和港口经济很重要，一定要把北部湾港口建设好、管理好、运营好，以一流的设施、一流的技术、一流的管理、一流的服务，为广西发展、为“一带一路”建设、为扩大开放合作多作贡献。
            </Col>
          </Row>
        </div>
      </div>
      <div class="detail-info">
        <div class="disFlexCenter title mt20">
          <p class="">分组内单位</p>
          <Button class="search" type="primary" @click="addUnitFn">
            + 添加单位
          </Button>
        </div>
        <div class="content-box">
          <div class="disFlex">
            <FormItem label="报送内容：" class="mr20">
              <Input v-model="dataForm.reporting" />
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
              <template #status="{ row }">
                <span :class="row.class">{{ row.statusHide }}</span>
              </template>
              <template #action="{ row }">
                <div class="table-action">
                  <span @click="removeFn(row)">
                    <i class="iconfont icon-yichu" />
                    移除分组</span
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
  <add-group :value="showAddGroup" @closeChange="closeChange" />
  <!-- 选择组织 -->
  <select-org :value="showSelectOrg" @closeChange="closeChange" />
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import AddGroup from '@/components/AddGroup.vue'
import SelectOrg from '@/components/SelectOrg.vue'
import * as requestRefers from '@/api/settingsApi'
export default {
  components: { AddGroup, SelectOrg },
  setup(props) {
    const state = reactive({
      showAddGroup: false,
      showSelectOrg: false,
      dataForm: <any>{},
      fileList: [],
      filePathList: [],
      groupList: [
        {
          taskName: '莲都区纪委监察委',
        },
      ],
      groupTotal: 0,
      groupParams: {
        limit: 10,
        page: 1,
      },
      groupColumns: [
        {
          title: '分组名称',
          key: 'taskName',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          minWidth: 260,
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200,
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
      // 分组删除
      groupRemove() {},
      addGroupFn() {
        state.showAddGroup = true
      },
      addUnitFn() {
        state.showSelectOrg = true
      },
      // 关闭
      closeChange(val: boolean) {
        state.showSelectOrg = val
        state.showAddGroup = val
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
