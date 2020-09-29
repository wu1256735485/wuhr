import { RequestQuery } from 'common/js/request'

// 工票查询
export function getWorkingHours(data) {
  const url = '/personalWorkingHours/selectByCodeMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
