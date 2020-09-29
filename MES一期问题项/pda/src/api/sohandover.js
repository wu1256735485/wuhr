import { RequestQuery } from 'common/js/warehouseRequest'

// 获取集料信息
export function getMaterials (data) {
  const url = '/soaggregate/querysopickingdetailbyaggregatecode'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}

// 发料确认
export function materialsConfirm (data) {
  const url = '/soaggregate/soaggregatehairfeedconfirm'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 收料确认
export function materialsSign (data) {
  const url = '/soaggregate/soaggregatehandover'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
