import { RequestQuery } from 'common/js/request'

// 工票查询关键件
export function getLinchpin(data) {
  const url = '/ticketBindingParts/selectByTicketBindingPartsMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 绑定解绑
export function binding(data) {
  const url = '/ticketBindingParts/updateTicketBindingParts'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
