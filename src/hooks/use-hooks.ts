import { ref } from 'vue'

export function useHooks() {
  const showAddGroup = ref(false)
  const showSelectOrg = ref(false)
  const addUnitFn = () => {
    showAddGroup.value = true
  }
  const closeChange = (val: boolean) => {
    showSelectOrg.value = val
    showAddGroup.value = val
  }
  return { showAddGroup, showSelectOrg, addUnitFn, closeChange }
}

export function useUnit() {
  const showSelectUnit = ref(false)
  const addUnitFn = () => {
    showSelectUnit.value = true
  }
  const closeChange = (val: boolean) => {
    showSelectUnit.value = val
  }
  return { showSelectUnit, addUnitFn, closeChange }
}
