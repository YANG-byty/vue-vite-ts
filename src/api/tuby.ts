import request from '@/plugins/request'

//上传图片附件
export function uploadFile(data: any) {
  return request({
    url: '/file/filetransfer/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}
// 操作日志
export function metaExecuteLogList(data: any) {
  return request({
    url: '/duty/metaExecuteLog/list',
    method: 'get',
    params: data,
  })
}
// 流程实例详情
export function getInstanceById(data: any) {
  return request({
    url: '/duty/planTask/getInstanceById',
    method: 'post',
    data,
  })
}
// 审核日志
export function nodeLog(data: any) {
  return request({
    url: '/duty/process/node/nodeLog',
    method: 'post',
    data,
  })
}
