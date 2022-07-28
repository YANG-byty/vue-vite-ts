<template>
  <div>
    <Drawer
      :title="title"
      v-model="visible"
      width="600"
      :before-close="beforeClose"
    >
      <Form ref="fromRef" :model="from" label-position="left" :label-width="90">
        <FormItem label="赋牌信息：">
          <Select v-model="from.card" placeholder="">
            <Option
              v-for="item in boardList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="备注信息：">
          <Input
            v-model="from.remark"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            maxlength="40"
            placeholder="请填写备注信息"
          />
        </FormItem> -->
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
  props: ['value', 'dataObj'],
  setup(props, { emit }) {
    const fromRef = ref()
    const state = reactive({
      title: '修改得牌',
      visible: false,
      boardList: boardList,
      from: {
        card: 0,
        ramark: '',
      },
    })
    const methods = {
      // 保存点击
      handleSave() {
        emit('setCard', state.from)
      },
      // 关闭抽屉
      beforeClose() {
        emit('closeChange', false)
      },
    }
    watch(
      [() => props.value, () => props.dataObj],
      (newVal: any, oldVal: any) => {
        //此时返回的是数组,按下标获取对应值
        state.visible = newVal[0]
        state.from = newVal[1]
      }
    )
    return {
      ...toRefs(state),
      ...methods,
      fromRef,
    }
  },
}
</script>

<style lang="less" scoped></style>
