<template>
  <div>
    <Drawer
      :title="title"
      v-model="visible"
      width="600"
      :before-close="beforeClose"
    >
      <Form
        ref="dataFormRef"
        :model="dataForm"
        label-position="left"
        :label-width="90"
      >
        <FormItem label="审核结果：">
          <Select
            v-model="dataForm.auditResult"
            placeholder=""
          >
            <Option
              v-for="item in auditResultList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="赋牌信息：">
          <Select
            v-model="dataForm.board"
            placeholder=""
          >
            <Option
              v-for="item in boardList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="审核备注：">
          <Input
            v-model="dataForm.taskBatch"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            maxlength="40"
            placeholder="请填写审核备注"
          />
        </FormItem>
        <div class="footer-button align-right">
          <Button @click="beforeClose">
            取消
          </Button>
          <Button
            type="primary"
            @click="handleSave"
          >
            保存
          </Button>
        </div>
      </Form>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, ref } from 'vue';
import { boardList, auditResultEnumList } from '@/libs/enum';
export default {
  props: ['value', 'showTitle', 'id'],
  setup(props, { emit }) {
    const dataFormRef = ref();
    const state = reactive({
      title: '修改审核',
      auditResultList: auditResultEnumList,
      visible: false,
      boardList: boardList,
      dataForm: {
        auditResult: 3,
        board: 0,
        ramark: '',
      },
    });
    const methods = {
      // 保存点击
      handleSave() {
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
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false);
      },
    };
    watch(
      [() => props.value, () => props.showTitle],
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal[0];
        state.title = newVal[1];
      }
    );
    return {
      ...toRefs(state),
      ...methods,
      dataFormRef,
    };
  },
};
</script>

<style lang="less" scoped></style>
