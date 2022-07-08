<template>
  <div>
    <Drawer
      title="审核日志"
      v-model="visible"
      width="1300"
      :before-close="beforeClose"
    >
      <Row :gutter="20">
        <Col span="17">
          <div class="info-title">
            <span class="left-size">评价对象</span>
          </div>
          <div class="common-table table">
            <Table
              :columns="columns"
              :data="nodeLogInfo"
              @on-row-click="nodeDetailFn"
            >
              <template #processId="{ row }">
                <span class="text-decoration">
                  <span>{{ row.processId }}</span>
                </span>
              </template>
              <template #statusHide="{ row }">
                <span :class="row.class">{{ row.statusHide }}</span>
              </template>
            </Table>
          </div>
          <div class="common-page align-right">
            <Page
              :total="total"
              show-sizer
              show-elevator
              show-total
            />
          </div>
        </Col>
        <Col span="7">
          <div class="info-title">
            <span class="left-size">流程详情</span>
          </div>
          <Card
            :bordered="false"
            dis-hover
            class="process-log"
          >
            <div
              class="step-box"
              v-if="nodeLogInfo.length > 0"
            >
              <div
                :class="'item ' + item.class"
                v-for="(item, index) in nodeLogInfo[activeIndex].nodeList"
                :key="index"
              >
                <div class="round">
                  <i class="iconfont" />
                </div>
                <div class="cont">
                  <!--头部-->
                  <template v-if="item.nodeName || item.deal">
                    <div class="row half">
                      <span class="name">{{ item.nodeName }}</span>
                      <span class="state">{{ item.deal }}</span>
                    </div>
                  </template>

                  <template
                    v-if="item.operationName || item.operateTime || item.action"
                  >
                    <div class="row half text">
                      <span>{{ item.operationName }}
                        <template v-if="item.action">
                          ({{ item.action }})
                        </template></span>
                      <span>{{ item.operateTime }}</span>
                    </div>
                  </template>

                  <!--操作内容-->
                  <template v-if="item.actionRemark">
                    <div class="text">
                      审核意见：{{ item.actionRemark }}
                    </div>
                  </template>

                  <!--抄送人-->
                  <template v-if="item.sendList && item.sendList.length > 0">
                    <div class="people-list">
                      <span
                        v-for="(people, index) in item.sendList"
                        :class="people.ifRead === 1 ? 'read' : ''"
                        :key="'people' + index"
                      >{{ people.operationName
                      }}<i class="iconfont iconradio-active" /></span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { iconEnumList, auditProcessEnumList } from '@/libs/enum';
import { reactive, toRefs, watch } from 'vue';
import { enumConversion } from '@/libs/util';
import { taskStatusEnumList } from '@/libs/enum';
export default {
  props: ['value', 'nodeLogInfo'],
  setup(props, { emit }) {
    const state = reactive({
      auditProcessEnumList: auditProcessEnumList,
      visible: false,
      total: 0,
      taskStatusList: taskStatusEnumList,
      loading: false,
      params: {
        limit: 10,
        page: 1,
      },
      columns: [
        {
          title: '送审时间',
          key: 'createTime',
          align: 'center',
        },
        {
          title: '送审编号',
          slot: 'processId',
          minWidth: 200,
          align: 'center',
        },
        {
          title: '审核流程',
          align: 'center',
          slot: 'statusHide',
        },
        {
          title: '处理结果',
          key: 'nodeName',
          align: 'center',
        },
      ],
      activeIndex: 0,
      nodeLogInfo: [],
    });
    const methods = {
      nodeDetailFn(data: any, index: number) {
        state.activeIndex = index;
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false);
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
        state.params.page = data;
        methods.getDataList();
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data;
        methods.getDataList();
      },
    };
    watch(
      [() => props.value, props.nodeLogInfo],
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal[0];
        state.nodeLogInfo = newVal[1].map((item: any) => {
          item.nodeName = item.approveStatus
            ? item.approveStatus == 'agree'
              ? '同意'
              : '拒绝'
            : null;
          item.statusHide = enumConversion(
            auditProcessEnumList,
            'value',
            item.instanceStatus,
            'label'
          );
          item.class = enumConversion(
            auditProcessEnumList,
            'value',
            item.instanceStatus,
            'class'
          );
          let result = '';
          item.nodeList.map((value: any) => {
            result = enumConversion(iconEnumList, 'value', value.icon, 'class');
            value.class = result;
          });
          return item;
        });
      }
    );
    return {
      ...toRefs(state),
      ...methods,
      ...props,
    };
  },
};
</script>

<style lang="less" scoped>
.info-title {
  padding-left: 0 !important;
}
</style>
