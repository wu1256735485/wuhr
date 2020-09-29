import { RequestQuery } from 'common/js/request'

// 工票查询
export function getTicket(data) {
  const url = '/unhealthy/selectByUnhealthyMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

export function confirmOl(data) {
  const url = '/unhealthy/updateByUnhealthyMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
