import { reactive, onMounted } from 'vue'
export default function () {
  //展示的数据  可以通过App.vue 界面去隐藏
  let state = reactive({
    showAddGroup: false,
    showSelectOrg: false,
  })

  let methods = {
    // 点击添加单位
    addUnitFn() {
      state.showSelectOrg = true
    },
    // 关闭
    closeChange(val: boolean) {
      state.showSelectOrg = val
      state.showAddGroup = val
    },
  }

  //现实之后调用 挂载完毕
  onMounted(() => {})
  return { state, methods }
}
