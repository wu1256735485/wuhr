import { RequestQuery } from 'common/js/request'

// 查询当前登录人工区
export function searchWorkArea(data) {
  const url = '/start/selectWorkCode'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 根据工区查询工票号
export function searchTicketCode(data) {
  const url = 'start/selectWorkCodeByTic'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 选中确认工票
export function checkedTicket(data) {
  const url = '/start/selectQueueByTic'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}