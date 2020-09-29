import { RequestQuery } from 'common/js/warehouseRequest'
// 查询现场出入库
export function searchAcess (data) {
  const url = '/soinstock/queryscenesoinstocklist'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}

// 查询处置代码列表
export function searchCode () {
  const url = '/basicInfo/querydisposition'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}

// 查询报废列表
export function scrapPause () {
  const url = '/basicInfo/queryscrappingcause'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}

// 模糊查询库位信息
export function queryBasic (data) {
  const url = '/basicInfo/querywarehouse'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}

// 提交现场出入库信息
export function submitAcess (data) {
  const url = '/soinstock/savescenesoinstocklist'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 查询处置代码与库位关联信息
export function queryCodeBasic (data) {
  const url = '/basicInfo/querydisposaltolocation'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}

// 打印收料物料标签接口
export function printslwlzpl (data) {
  const url = '/soinstock/printslwlzpl'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 查询现场出入库
export function queryworkorderinstockrecordlist (data) {
  const url = '/soinstock/queryworkorderinstockrecordlist'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
