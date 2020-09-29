import { RequestQuery } from 'common/js/request'

// 查看工艺文件
export function seeFile(data) {
  const url = '/order/selectByTicketCodeMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 查看工艺文件zip tip
export function getconvertservice(data) {
  const url = '/files/convertservice'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

//查看质保工艺信息接口 
export function getqueryqarouting (data) {
    const url = '/QARouting/queryqarouting'
    return RequestQuery(url, 'GET', data).then((res) => {
      return res.data
    })
  }
