<template>
  <div>
    <Drawer
      title="操作日志"
      v-model="visible"
      width="700"
      :before-close="beforeClose"
    >
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
          title: '操作时间',
          key: 'createTime',
          align: 'center',
        },
        {
          title: '操作类型',
          key: 'operation',
          align: 'center',
        },
        {
          title: '操作用户',
          key: 'userName',
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
      [() => props.value, () => props.nodeLogInfo],
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal[0];
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
