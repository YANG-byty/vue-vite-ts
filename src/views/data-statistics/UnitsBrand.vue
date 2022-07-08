<template>
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
    <Table :columns="columns" :loading="loading" :data="dataList">
      <template #unit="{ row }">
        <span class="blue-tag">{{ row.unit }}</span>
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
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
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
          minWidth: 400,
        },
        {
          title: '黄牌数量',
          key: 'num',
          align: 'center',
          width: 200,
        },
        {
          title: '红牌数量',
          key: 'num',
          align: 'center',
          width: 200,
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
        //       item.statusHide = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'label');
        //       item.class = this.enumConversion(taskStatusEnumList, 'value', item.taskStatus, 'class');
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
.block {
  text-align: center;
  font-size: 15px;
  background-color: #efefef;
  width: 150px;
  padding: 12px 0;
  .num {
    font-size: 20px;
  }
}
</style>
