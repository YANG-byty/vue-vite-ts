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
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem label="分组名称：" prop="groupName">
          <Input v-model="dataForm.groupName" />
        </FormItem>
        <FormItem label="分组说明：">
          <Input
            v-model="dataForm.taskBatch"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            maxlength="40"
            placeholder="请填写审核备注"
          />
        </FormItem>
        <div class="footer-button align-right">
          <Button @click="beforeClose"> 取消 </Button>
          <Button type="primary" @click="handleSave"> 保存 </Button>
        </div>
      </Form>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, ref } from 'vue'
export default {
  props: ['value', 'id'],
  setup(props, { emit }) {
    const dataFormRef = ref()
    const state = reactive({
      title: '添加分组',
      visible: false,
      dataForm: <any>{},
      ruleValidate: {
        groupName: [
          { required: true, message: '分组名称不能为空', trigger: 'blur' },
        ],
      },
    })
    const methods = {
      // 保存点击
      handleSave() {
        dataFormRef.value.validate((valid: any) => {
          if (valid) {
            console.log(valid)
          }
        })
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
        dataFormRef.value.resetFields()
        emit('closeChange', false)
      },
      resetForm() {
        state.dataForm = {}
      },
    }
    watch([() => props.value], (newVal: any, oldVal: any) => {
      //此时返回的是数组,按下标获取对应值
      state.visible = newVal[0]
      methods.resetForm()
    })
    return {
      ...toRefs(state),
      ...methods,
      dataFormRef,
    }
  },
}
</script>

<style lang="less" scoped></style>
