import { RequestQuery , RequestQueryOne } from 'common/js/request'

// 工票查询
export function getTicket(data) {
  const url = '/newspapeWorker/selectByNewspapeWorkerMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 确认报工
export function confirmOl(data) {
  const url = '/newspapeWorker/updateBynewspapeWorkerMes'
  return RequestQueryOne(url, 'POST', data).then((res) => {
    return res.data
  })
}
