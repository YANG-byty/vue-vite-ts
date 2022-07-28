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
        <FormItem label="分组名称：" prop="name">
          <Input v-model="dataForm.name" />
        </FormItem>
        <FormItem label="分组说明：">
          <Input
            v-model="dataForm.remark"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            maxlength="125"
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
import { Modal } from 'view-ui-plus'
export default {
  props: ['value', 'data'],
  setup(props, { emit }) {
    const dataFormRef = ref()
    const state = reactive({
      title: '添加分组',
      visible: false,
      dataForm: <any>{},
      ruleValidate: {
        name: [
          { required: true, message: '分组名称不能为空', trigger: 'blur' },
        ],
      },
    })
    const methods = {
      // 保存点击
      handleSave() {
        dataFormRef.value.validate((valid: any) => {
          if (valid) {
            emit('submitFn', state.dataForm)
            methods.resetForm()
            emit('closeChange', false)
          }
        })
      },
      // 关闭抽屉
      beforeClose() {
        return new Promise((resolve: any, reject: any) => {
          Modal.confirm({
            title: '提示',
            content: '该表单尚未填写完成，确定要取消么？',
            onOk: () => {
              dataFormRef.value.resetFields()
              methods.resetForm()
              emit('closeChange', false)
              resolve()
            },
            onCancel: () => {
              return false
            },
          })
        })
      },
      resetForm() {
        state.dataForm = {}
      },
    }
    watch([() => props.value], (newVal: any, oldVal: any) => {
      //此时返回的是数组,按下标获取对应值
      state.visible = newVal[0]
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
