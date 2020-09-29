import { RequestQuery } from 'common/js/request'

// 根据员工卡号获取用户信息
export function getNfc(data) {
  // const url = 'http://192.168.40.29:8088/materielHandover/selectNfc'
  const url = '/materielHandover/selectNfc'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 物料交接记录查询
export function recordingSearch(data) {
  const url = '/materielHandoverDtetail/selectByMaterielDtetail'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
