import RequestQuery from 'common/js/exceptionRequest'
import qs from 'qs'
const { EXCEPTION_PENURL, EXCEPTION_SAVEURL } = process.env
const prefix = '/exception/basedata'

export function saveException (data) {
  // return RequestQuery(url, 'POST', qs.stringify(data)).then((res) => {
  //   return res
  // })
  return RequestQuery({
    baseURL: EXCEPTION_SAVEURL,
    url: '/exception/savexception',
    method: 'POST',
    data
  })
}
export function getList () {
  const userInfo = sessionStorage.getItem('userInfo')
  const roleIdsString = userInfo && JSON.parse(userInfo).roleIdsString
  return RequestQuery({
    // baseURL: 'http://10.79.209.68:8008',
    // http://10.167.43.232:8765/mes-backlog/backlog/getBacklogByBelongRole
    baseURL: EXCEPTION_PENURL,
    method: 'GET',
    params: {
      // roleStr: '10111,commonroleid,d5pccpslQ5BoMIYx,IEFphhcsNlpBR0sk,10110',
      roleStr: roleIdsString,
      limit: 1000,
      offset: 1,
      status: 0
    }
  })
}
// 登陆接口自己写
export function etlogin (data) {
  return RequestQuery({
    url: `/mobilemenu/out/getMenusByUser?id=${data}`,
    method: 'GET'
  })
}
export function getexception (data) {
  return RequestQuery({
    // baseURL: 'http://192.168.40.14:8110',
    url: `/exception/getexception?id=${data}`,
    method: 'GET'
    // data: qs.stringify(data)
  })
}
export function getStartDetail (data) {
  // console.log(data)
  return RequestQuery({
    url: `/ticket/getTicket`,
    method: 'GET',
    params: data
    // data: qs.stringify(data)
  })
}
// exception / base / getExceptionTypeList
export function getExceptionTypeList () {
  return RequestQuery({
    url: `exception/base/getExceptionTypeList`,
    method: 'POST'
  })
}

export function handleException (data) {
  // console.log(data)
  return RequestQuery({
    url: `exception/handleException`,
    method: 'POST',
    data: qs.stringify(data)
  })
}
// http://10.167.43.232:8765/noah-cloud-user/user/loginByNFC

export function exceptionLogin (data) {
  return RequestQuery({
    baseURL: 'http://10.167.43.232:8765/noah-cloud-user/',
    url: `loginByNFC`,
    method: 'POST',
    params: data
  })
}
// 根据parentId 查询异常类型数据
// exception/base/getExceptionTypeByParentId
export function getExceptionTypeByParentId (id) {
  return RequestQuery({
    url: '/exception/base/getExceptionTypeByParentId',
    method: 'GET',
    params: id
  })
}
export function getUserByNfc(nfcNo) {
  return RequestQuery({
    url: '/ticket/getUserByNfc',
    method: 'GET',
    params: nfcNo
  })
}
// '/exception/base/getRoleByExceptionName'
export function getRoleByExceptionName() {
  return RequestQuery({
    url: '/exception/base/getRoleByExceptionName',
    method: 'GET'
  })
}
// exception/base/getUserByExceptionCode
export function getUserByExceptionCode (exceptionTypeCode) {
  return RequestQuery({
    url: '/exception/base/getUserByExceptionCode',
    method: 'GET',
    params: exceptionTypeCode
  })
}
export function getMeasureListByExceptionCode (exceptionTypeCode) {
  return RequestQuery({
    url: `/exception/base/getMeasureListByExceptionCode`,
    method: 'GET',
    params: exceptionTypeCode
  })
}
export function getReasonListByExceptionCode (data) {
  return RequestQuery({
    url: `/exception/base/getReasonListByExceptionCode`,
    method: 'GET',
    params: data
    // data: qs.stringify(data)
  })
}
// 获取角色及个人待办
// /exception/activitiBackLog
// http://10.167.43.232:8109/activiti/app/rest/query/tasks
export function activitiBackLog(params) {
  return RequestQuery({
    // baseURL: 'http://192.168.40.13:8110',
    // baseURL: 'http://10.167.43.232:8109',
    // url: `/activiti/app/rest/query/tasks`,
    url: '/exception/activitiBackLog',
    method: 'post',
    data: qs.stringify(params)
    // params: params
    // data: qs.stringify(data)
  })
}
// 根据小组编码查询用户表信息
export function getGroupUserListByGroupCode (data) {
  return RequestQuery({
    url: `${prefix}/getGroupUserListByGroupCode`,
    method: 'get',
    params: data
  })
}
// 根据部门编码查询小组表信息
export function getDeptGroupListByDeptCode (data) {
  return RequestQuery({
    url: `${prefix}/getDeptGroupListByDeptCode`,
    method: 'get',
    params: data
  })
}
// export function getReasonListByExceptionCode
// 根据异常类型编码查询部门信息
export function getTypeDeptList (data) {
  return RequestQuery({
    url: `${prefix}/getTypeDeptList`,
    method: 'get',
    params: data
  })
}
// 查询异常类型
export function getTypeList (data) {
  return RequestQuery({
    url: `${prefix}/getTypeList`,
    method: 'get',
    params: {
      limit: 50,
      offset: 0
    }
  })
}
// 查询待办列表
export function getExceptionBackLog (params) {
  return RequestQuery({
    url: '/exception/getExceptionBackLog',
    method: 'GET',
    params
  })
}
