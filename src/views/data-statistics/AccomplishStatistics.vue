<template>
  <div
    class="top-form mt20 disFlexCenter"
    style="justify-content: space-evenly; padding: 20px 0"
  >
    <div
      :class="['block', item.class]"
      v-for="(item, index) in collectList"
      :key="index"
    >
      <div class="num">
        {{ item.num }}
      </div>
      <div>{{ item.title }}</div>
    </div>
  </div>
  <div class="top-form mt20">
    <Form ref="dataFormRef" :model="dataForm" :label-width="100">
      <Row :gutter="88">
        <Col span="7">
          <FormItem label="单位名称：">
            <Input v-model="dataForm.taskBatch" clearable maxlength="40" />
          </FormItem>
        </Col>
        <Col span="2">
          <Button class="reset" @click="resetForm"> 重置 </Button>
        </Col>
        <Col span="2">
          <Button type="primary" class="search" @click="getDataList">
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
  <div class="common-table">
    <div class="table">
      <Table :columns="columns" :loading="loading" :data="dataList">
        <template #unit="{ row }">
          <span class="blue-tag">{{ row.unit }}</span>
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
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      collectList: [
        {
          id: 'reportDeptNum',
          num: 0,
          title: '报送单位',
          class: 'one-option',
        },
        {
          id: 'taskStatusOne',
          num: 0,
          title: '未报送',
          class: 'two-option',
        },
        {
          id: 'taskStatusTwo',
          num: 0,
          title: '审核中',
          class: 'three-option',
        },
        {
          id: 'taskStatusThree',
          num: 0,
          title: '审核通过',
          class: 'one-option',
        },
        {
          id: 'taskStatusZero',
          num: 0,
          title: '审核未通过',
          class: 'two-option',
        },
        {
          id: 'yellowCard',
          num: 0,
          title: '黄牌',
          class: 'three-option',
        },
        {
          id: 'redCard',
          num: 0,
          title: '红牌',
          class: 'one-option',
        },
      ],
      dataForm: <any>{},
      dataList: [
        {
          unit: '百图科技',
          num: 33,
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
          title: '序号',
          type: 'index',
          align: 'center',
          width: 80,
        },
        {
          title: '报送单位',
          slot: 'unit',
          align: 'left',
          ellipsis: true,
          tooltip: true,
          width: 500,
        },
        {
          title: '全部任务',
          key: 'num',
          align: 'center',
        },
        {
          title: '未报送',
          key: 'num',
          align: 'center',
        },
        {
          title: '审核中',
          key: 'num',
          align: 'center',
        },
        {
          title: '审核通过',
          key: 'num',
          align: 'center',
        },
        {
          title: '审核未通过',
          key: 'num',
          align: 'center',
        },
        {
          title: '黄牌数量',
          key: 'num',
          align: 'center',
        },
        {
          title: '红牌数量',
          key: 'num',
          align: 'center',
        },
      ],
    })
    const methods = {
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
        //       item.statusHide = this.enumConversion(planStatusEnumList, 'value', item.taskStatus, 'label');
        //       item.class = this.enumConversion(planStatusEnumList, 'value', item.taskStatus, 'class');
        //     });
        //   });
      },
      // 分页
      pageCurrentChangeHandle(data: number) {
        state.params.page = data
        methods.getDataList()
      },
      // 翻页
      pageSizeChangeHandle(data: number) {
        state.params.limit = data
        methods.getDataList()
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

<style lang="less" scoped>
.common-table {
  height: calc(100vh - 445px) !important;
  :deep(.ivu-table-body) {
    height: calc(100vh - 490px) !important;
  }
}
.block {
  text-align: center;
  font-size: 15px;
  border-radius: 4px;
  width: 150px;
  padding: 12px 0;
  color: #fff;
  .num {
    font-size: 20px;
  }
}
.one-option {
  background: linear-gradient(122deg, #9adbff 0%, #458fff 100%);
}
.two-option {
  background: linear-gradient(118deg, #dbd2ff 0%, #9685ff 100%);
}
.three-option {
  background: linear-gradient(118deg, #ffd2ed 0%, #ff85b1 100%);
}
</style>
