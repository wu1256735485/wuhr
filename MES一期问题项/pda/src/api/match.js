import { RequestQuery } from 'common/js/request'

// 工票查询物料
export function getMaterials (data) {
  const url = '/ticketInformation/selectByTicketCodeMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 绑定序列号件
export function binding (data) {
  const url = '/ticketInformation/addTicketInformation'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 搜索序列号
export function searchMatch (data) {
  const url = '/IfsSerialNumber/selectBySeq'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
