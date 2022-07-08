<template>
  <Drawer
    title="报送记录"
    v-model="visible"
    width="800"
    :before-close="beforeClose"
  >
    <div class="common-table">
      <Table
        :columns="columns"
        :loading="loading"
        :data="dataList"
      >
        <template #status="{ row }">
          <span :class="row.class">{{ row.statusHide }}</span>
        </template>
        <template #action="{ row }">
          <div class="table-action">
            <span @click="openDetailInfo(1, row)">
              <i class="iconfont icon-xiangqing" />
              任务详情</span>
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
  </Drawer>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, watch } from 'vue';
import { taskStatusEnumList } from '@/libs/enum';
import router from '@/router';
export default {
  props: ['value', 'searchTitle'],
  components: {},
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      dataList: [
        {
          taskBatch: 'BSJH202206230001',
          taskName: '学习贯彻重要决策部署、重要会议精神情况',
          deptName: '每季一次',
          num: 33,
          statusHide: '进行中',
          personNum: '3',
        },
      ],
      total: 0,
      taskStatusList: taskStatusEnumList,
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
          // width: 200,
        },
        {
          title: '报送时间',
          key: 'personNum',
          align: 'center',
        },
        {
          title: '报送用户',
          key: 'personNum',
          align: 'center',
        },
        {
          title: '报送状态 / 审核结果',
          slot: 'status',
          align: 'center',
        },

        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100,
        },
      ],
    });
    const methods = {
      // 详情
      openDetailInfo() {
        router.push('/taskPlan/detail');
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
      // 关闭抽屉
      beforeClose() {
        state.visible = false;
        // return new Promise((resolve: any, reject: any) => {
        //   Modal.confirm({
        //     title: '提示',
        //     content: '该表单尚未填写完成，确定要取消么？',
        //     onOk: () => {
        //       state.visible = false
        //       resolve()
        //     },
        //     onCancel: () => {
        //       return false
        //     },
        //   })
        // })
      },
    };
    watch(
      () => props.value,
      (val: boolean) => {
        state.visible = val;
      }
    );
    // value(val) {
    //   this.visible = val;
    //   if (val) {
    //     if (this.id) {
    //       this.title = '编辑';
    //       this.getDetailInfo();
    //       return;
    //     }
    //     this.resetForm();
    //     this.getUserInfo();
    //   }
    //   this.$refs.formValidate.resetFields();
    // },
    // visible(val) {
    //   this.$emit('input', val);
    // }
    onMounted(() => {});
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped></style>
