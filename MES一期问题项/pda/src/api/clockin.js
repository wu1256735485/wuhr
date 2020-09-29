import { RequestQuery } from 'common/js/request'
// 打卡人脸识别
export function singleUpload (data) {
  const url = '/userPunchCard/singleUpload'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 添加员工打卡信息
export function saveByUserMes (data) {
  const url = '/userPunchCard/saveByUserMes'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 查询打卡历史记录 
export function selectDetailByDate (data) {
  const url = '/userPunchCard/selectDetailByDate'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

// 查询本次历史记录 
export function punchAstrict (data) {
  const url = '/userPunchCard/punchAstrict'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}

