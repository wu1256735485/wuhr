import { RequestQuery } from 'common/js/request'
// 初始化
export function selectInitialization () {
  const url = '/callMaterial/selectInitialization'
  return RequestQuery(url, 'POST').then((res) => {
    return res.data
  })
}

// 查询接口
export function selectByMes (data) {
  const url = '/callMaterial/selectByMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 选件 查询  默认不查询 参数 partNo 支持物料名称或者物料描述
export function selectByPartMes (data) {
  const url = '/callMaterial/selectByPartMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 提交申请
export function insertSubmission (data) {
  const url = '/callMaterial/insertSubmission'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 查询
export function getselectByMes (data) {
  const url = '/callMaterialpc/selectByMesPc'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

//  根据项目号 查询车号列号接口
export function getselectByCallMes (data) {
  const url = '/IfsSerialNumber/selectByCallMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}