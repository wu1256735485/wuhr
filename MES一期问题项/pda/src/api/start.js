import { RequestQuery } from 'common/js/request'

// 工票查询
export function getTicket (data) {
  const url = '/start/selectByStartCodeMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 变更工票状态
export function changeTicketStatus (data) {
  const url = '/start/isStart'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 暂停原因列表
export function pauseReason (data) {
  const url = '/start/selectInitialization'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 人员退出
export function userTimeout (data) {
  const url = '/newspapeWorker/updateUserOut'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 获取人员信息
export function getNfc (data) {
  const url = '/materielHandover/selectByNfcMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 缺料明细
export function lackDetail (data) {
  const url = '/start/selectTickLack'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 查询变更信息
export function getChangeList (data) {
  const url = '/changeFeign/selectBySiteStorageMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 变更信息状态变更
export function changeInfo (data) {
  const url = '/changeFeign/notifyQA'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
//关键件按钮展示
export function keyButton (data) {
  const url = '/ticketBindingParts/selectByTicketBindingPartsMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
