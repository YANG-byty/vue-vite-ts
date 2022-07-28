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
            <div class="table">
              <Table
                :columns="columns"
                :data="nodeLogInfo"
                @on-row-click="nodeDetailFn"
                maxHeight="580"
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
          </div>
        </Col>
        <Col span="7">
          <div class="info-title">
            <span class="left-size">流程详情</span>
          </div>
          <Card :bordered="false" dis-hover class="process-log">
            <div class="step-box" v-if="nodeLogInfo.length > 0">
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
                      <span
                        >{{ item.operationName }}
                        <template v-if="item.action">
                          ({{ item.action }})
                        </template></span
                      >
                      <span>{{ item.operateTime }}</span>
                    </div>
                  </template>

                  <!--操作内容-->
                  <template v-if="item.actionRemark">
                    <div class="text">审核意见：{{ item.actionRemark }}</div>
                  </template>

                  <!--抄送人-->
                  <template v-if="item.sendList && item.sendList.length > 0">
                    <div class="people-list">
                      <span
                        v-for="(people, index) in item.sendList"
                        :class="people.ifRead === 1 ? 'read' : ''"
                        :key="'people' + index"
                        >{{ people.operationName
                        }}<i class="iconfont iconradio-active"
                      /></span>
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
import {
  iconEnumList,
  auditProcessEnumList,
  planStatusEnumList,
} from '@/libs/enum'
import { reactive, toRefs, watch } from 'vue'
import { enumConversion } from '@/libs/util'

export default {
  props: ['value', 'nodeLogInfo'],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      auditProcessEnumList: auditProcessEnumList,
      taskStatusList: planStatusEnumList,
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
      nodeLogInfo: <any>[],
    })
    const methods = {
      nodeDetailFn(data: any, index: number) {
        state.activeIndex = index
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
    }
    watch(
      () => props.value,
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal
      }
    )
    watch(
      () => props.nodeLogInfo,
      (newVal: any) => {
        console.log(newVal)
        return
        state.nodeLogInfo = newVal
        state.nodeLogInfo.map((item: any) => {
          item.nodeName = item.approveStatus
            ? item.approveStatus == 'agree'
              ? '同意'
              : '拒绝'
            : null
          item.statusHide = enumConversion(
            auditProcessEnumList,
            'value',
            item.instanceStatus,
            'label'
          )
          item.class = enumConversion(
            auditProcessEnumList,
            'value',
            item.instanceStatus,
            'class'
          )
          let result = ''
          item.nodeList.map((value: any) => {
            result = enumConversion(iconEnumList, 'value', value.icon, 'class')
            value.class = result
          })
          return item
        })
      }
    )
    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
.info-title {
  padding-left: 0 !important;
}
</style>
