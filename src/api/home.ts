import request from '../plugins/request';
/**
 * 获取所有菜单（正式+灰度）
 * @param {*} params
 */
export const getAllMenuList = () => {
  return request({
    url: '/home/menu/getAllMenuList',
    method: 'get',
  });
};
