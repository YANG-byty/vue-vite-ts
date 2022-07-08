<template>
  <div>
    <Drawer
      title="添加租户"
      v-model="visible"
      width="600"
      :before-close="beforeClose"
    >
      <div class="common-table">
        <Table
          :columns="columns"
          :loading="loading"
          :data="dataList"
        >
          <template #action="{ row }">
            <div class="table-action">
              <span @click="selectTenement(row)">
                <Icon type="ios-checkmark-circle-outline" />
                选择</span>
            </div>
          </template>
        </Table>
      </div>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, ref } from 'vue';
export default {
  props: ['value', 'id'],
  setup(props, { emit }) {
    const dataFormRef = ref();
    const state = reactive({
      visible: false,
      dataList: [
        {
          name: '丽水市纪委监委',
        },
      ],
      loading: false,
      columns: [
        {
          title: '租户名称',
          key: 'name',
          align: 'left',
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 150,
        },
      ],
    });
    const methods = {
      selectTenement(row: any) {
        emit('selectTenement', row);
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false);
      },
    };
    watch([() => props.value], (newVal: any, oldVal: any) => {
      //此时返回的是数组,按下标获取对应值
      state.visible = newVal[0];
    });
    return {
      ...toRefs(state),
      ...methods,
      dataFormRef,
    };
  },
};
</script>

<style lang="less" scoped></style>
