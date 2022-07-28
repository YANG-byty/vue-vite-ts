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
            v-model="dataForm.actionExt"
            placeholder=""
            @on-change="handleSelectFn"
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
          <Select v-model="dataForm.card" placeholder="">
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
            v-model="dataForm.actionRemark"
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
import { boardList } from '@/libs/enum'
export default {
  props: ['value', 'showTitle'],
  setup(props, { emit }) {
    const dataFormRef = ref()
    const state = reactive({
      title: '修改审核',
      auditResultList: [
        {
          value: 'agree',
          label: '同意',
        },
        {
          value: 'disagree',
          label: '拒绝',
        },
      ],
      visible: false,
      boardList: boardList,
      dataForm: {
        actionExt: 'agree',
        card: 0,
        actionRemark: '同意',
      },
    })
    const methods = {
      handleSelectFn(type: string) {
        switch (type) {
          case 'agree':
            state.dataForm.actionRemark = '同意'
            break
          case 'disagree':
            state.dataForm.actionRemark = '拒绝'
            break
        }
      },
      // 保存点击
      handleSave() {
        emit('approvalOperation', state.dataForm)
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
    }
    watch(
      [() => props.value, () => props.showTitle],
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal[0]
        state.title = newVal[1]
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      dataFormRef,
    }
  },
}
</script>

<style lang="less" scoped></style>
