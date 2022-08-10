import Cookies from './util.cookies'
// cookie保存的天数
import config from '@/config'

const { cookieExpires } = config
/**
 *
 * 设置自定义存储的cookie信息(过期时间未传入则去全局设置，全局设置若无默认1天)
 * */
export const setCookie = (name: any, value: any, expiresTime?: any) => {
  Cookies.set(name, value, { expires: expiresTime || cookieExpires || 1 })
}
/**
 * 清除登录信息
 */
export const clearLoginInfo = () => {
  Cookies.remove('token')
  Cookies.remove('token_type')
  Cookies.remove('nick_name')
  Cookies.remove('user_id')
  localStorage.clear()
  sessionStorage.clear()
}
/**
 *
 * 获取自定义存储的cookie信息
 * */
export const getCookie = (name: any) => {
  let result: any = ''
  result = Cookies.get(name)

  if (result) return result
  else return result
}
/**
 * 枚举数据源
 * @param enumList  枚举数据源
 * @param afferentKey    传入值名称
 * @param afferentValue  传入值
 * @param outKey        传出值名称
 */
export const enumConversion = (
  enumList: any,
  afferentKey: any,
  afferentValue: any,
  outKey: any
) => {
  let result = ''
  if (
    enumList.length <= 0 ||
    afferentValue === null ||
    !afferentKey ||
    !outKey
  ) {
    return result
  }

  const resultArray = enumList.filter(
    (item: any) => item[afferentKey] === afferentValue
  )
  if (resultArray.length > 0) {
    // 取第一个
    result = resultArray[0][outKey]
    return result
  }

  return result
}
/**
 * 函数防抖
 * functionTimeOut // 函数防抖节流存储对象
 * functionDelay // 延迟执行时间
 * @param that
 * @param fn
 * @param delay
 */
export const debounce = (state: any, fn: any, delay?: any) => {
  delay = delay || 3000
  if (state.timer) {
    clearTimeout(state.timer)
  }
  state.timer = setTimeout(function () {
    fn.apply(state)
  }, delay)
}

/**
 * 判断数据是否在数组中
 * @param value
 * @param validList
 * @param key 匹配的关键字
 * @returns {boolean}
 */
export const oneOf = (value: any, validList: any, key: any) => {
  const result = false
  //判读数组是否有值
  if (validList.length <= 0) {
    return result
  }

  //对象数组
  if (key) {
    let result = false
    validList.forEach((item: any) => {
      if (item[key] === value[key]) {
        result = true
      }
    })
    return result
  }

  //普通数组
  for (let i = 0; i < validList.length; i++) {
    //普通数组
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @description: 根据数组内对象某一属性(number类型)进行排序
 * @param {*} source 目标数组
 * @param {*} sortField 排序属性
 * @param {*} sortType ASC DESC 默认升序
 * @return {*}
 */
export const sortFn = (source: any, sortField: string, sortBy = 'ASC') => {
  return source.sort((a: any, b: any) =>
    sortBy === 'ASC' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
  )
}

/**
 * 处理身份证号，加省略号
 * str：要进行隐藏的变量
 * frontLen: 前面需要保留几位
 * endLen: 后面需要保留几位
 * @param str
 * @param frontLen
 * @param endLen
 */
export const hiddenCardId = (str: string, frontLen = 4, endLen = 4) => {
  var len = str.length - frontLen - endLen
  var start = ''
  for (var i = 0; i < len; i++) {
    start += '*'
  }
  return str.substring(0, frontLen) + start + str.substring(str.length - endLen)
}

/**
 * 处理数字，加逗号
 * @param str
 */
export const handalNumber = (str: string) => {
  return str
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/,$/, '')
    .split('')
    .reverse()
    .join('')
}
