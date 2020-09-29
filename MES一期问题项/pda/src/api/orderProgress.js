import { RequestQuery } from 'common/js/request'

// 根据订单编号查询订单
export function getOrderProgress(data) {
  const url = '/order/selectByOrderIdMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
