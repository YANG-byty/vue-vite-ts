import Cookies from 'js-cookie';
// cookie保存的天数
import config from '@/config';
const { cookieExpires } = config;
/**
 *
 * 设置自定义存储的cookie信息(过期时间未传入则去全局设置，全局设置若无默认1天)
 * */
export const setCookie = (name: any, value: any, expiresTime?: any) => {
  Cookies.set(name, value, { expires: expiresTime || cookieExpires || 1 });
};
/**
 * 清除登录信息
 */
export const clearLoginInfo = () => {
  Cookies.remove('openid');
  Cookies.remove('regId');
  localStorage.clear();
  sessionStorage.clear();
};
/**
 *
 * 获取自定义存储的cookie信息
 * */
export const getCookie = (name: any) => {
  let result: any = '';
  result = Cookies.get(name);

  if (result) return result;
  else return result;
};
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
  let result = '';
  if (
    enumList.length <= 0 ||
    afferentValue === null ||
    !afferentKey ||
    !outKey
  ) {
    return result;
  }

  const resultArray = enumList.filter(
    (item: any) => item[afferentKey] === afferentValue
  );
  if (resultArray.length > 0) {
    // 取第一个
    result = resultArray[0][outKey];
    return result;
  }

  return result;
};
/**
 * 函数防抖
 * functionTimeOut // 函数防抖节流存储对象
 * functionDelay // 延迟执行时间
 * @param that
 * @param fn
 * @param delay
 */
export const debounce = (that: any, fn: any, delay: any) => {
  delay = delay || 3000;

  if (that.functionTimeOut) {
    clearTimeout(that.functionTimeOut);
  }
  const context = that;
  const args = 'arguments';
  that.functionTimeOut = setTimeout(function () {
    fn.apply(context, args);
  }, delay);
};

/**
 * 判断数据是否在数组中
 * @param value
 * @param validList
 * @param key 匹配的关键字
 * @returns {boolean}
 */
export const oneOf = (value: any, validList: any, key: any) => {
  const result = false;
  //判读数组是否有值
  if (validList.length <= 0) {
    return result;
  }

  //对象数组
  if (key) {
    let result = false;
    validList.forEach((item: any) => {
      if (item[key] === value[key]) {
        result = true;
      }
    });
    return result;
  }

  //普通数组
  for (let i = 0; i < validList.length; i++) {
    //普通数组
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
};
