import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
import router from '@/router'
import {Toast} from 'cube-ui'
Vue.use(Toast)
Vue.use(router)
import {
  getNoahsessionID,
  getNoaToken
} from '@/common/js/auth'

const user_service = axios.create({
  baseURL: process.env.BASEDATA_BASE_API, // api 的 base_url
  timeout: 60000 // request timeout
})

// 请求拦截器
user_service.interceptors.request.use(
  config => {
    const url = config.url
    if (url.indexOf('login') > -1) {} else if (store.getters.token) {
      // 请求之前设置noaToken、noahsessionID
      // 让每个请求携带token
      // let token = sessionStorage.getItem('tokenStr')
      // let session = sessionStorage.getItem('sessionStr')
      let token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMDI5MSIsInVzZXJJZCI6IjAwMjkxIiwidXNlck5hbWUiOiIwMDI5MSIsIm5hbWUiOiLmr5vnkZ7kuJoiLCJwYXNzd29yZCI6IjRjMjdkNWUxZDczYzJkNWUxYWExODQ4ZmQ4ZDAzYzc0IiwicGVybWlzc2lvbiI6IjEwMTExLE1kRVVnQTE1dzFvUXRZOW8sZ0F0aDFVeFUxaGRSODhBUSxJZFZBZ1J0NDQ5WWNSSnNCLElWbFFBb1FzNWhsZ2Rrc0ksY29tbW9ucm9sZWlkIiwiZXhwIjoxNTk5NDYwMzgzfQ.f0b004YWMCNtPDrqVrVdZtzGLeOPkCwBxNeHvMvaH-OWGHrGbJU0r1gEZ1SueOQZOg1T6LRFJxKnAjGeET2i2X2wwHKcXLMcVXyb4m3KvqzCLaMpDGKO-tL2lOxbYlm3BqWhsGsWxG1tgKffDSLQ9Ma1QtFCwYz8VPQie3TlHMI'
      let session = '5f3b010f-db43-4327-8f6e-9fb8a6d20bd8'
      config.headers['noaToken'] = token
      config.headers['noahsessionID'] = session
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// 响应拦截器
user_service.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
   const status = error.response.status
   if (status=== 307 || status=== 900) {
    Toast.$create({
      type: 'txt',
      time: 2000,
      zIndex: 990,
      txt: '登录超时,请重新登录'
    }).show()
    router.push('/') 
   } else if (status === 403) {
    Toast.$create({
      type: 'txt',
      time: 2000,
      txt: '您没有权限执行该操作'
    }).show()
   }
   return Promise.reject(status)
  }
)
export function requestLogin(data) {
  // const url = 'http://10.167.43.155:8765/noah-cloud-user/loginByNFC'
  const url = 'http://10.167.43.170:8765/noah-cloud-user/loginByNFC'
  let params = new URLSearchParams()
  params.append('nfcNo', data.nfcNo)
  return axios({
    url: url,
    method: 'post',
    data: params
  }).then((result) => {
    if (result.status === 200) {
      if(result.data.code === 500){
        Toast.$create({
          type: 'txt',
          time: 2000,
          txt: "该卡未绑定人员!"
        }).show()
        return
      }else{
      sessionStorage.setItem('tokenStr', result.headers.noatoken)
      sessionStorage.setItem('sessionStr', result.headers.noahsessionid)
      sessionStorage.setItem('personnelCode', result.data.data.username)
      }
      
    }
    return Promise.resolve(result.data)
  })
}
export function getUserMenu(data) {
  // const url = 'http://10.167.43.155:8765/noah-cloud-user/mobilemenu/out/getMenusByUser'
  const url = 'http://10.167.43.170:8765/noah-cloud-user/mobilemenu/out/getMenusByUser'
  let token = sessionStorage.getItem('tokenStr')
  let session = sessionStorage.getItem('sessionStr')
  return axios({
    url: url,
    method: 'get',
    headers: {
      noaToken: token,
      noahsessionID: session
    },
    params: data
  }).then((result) => {
    return Promise.resolve(result.data)
  })
}
/**
 * params {url} 请求地址
 * params {method} 请求方式
 * params {data} 发送给服务端的数据
 * params {headers} 请求头设置
 */
const debug = process.env.NODE_ENV === 'production'
export function RequestQuery(url, method = 'get', data) {
  const code = sessionStorage.getItem('personnelCode')
  const userInfo = JSON.stringify({ 'code': code })
  // const userInfo = JSON.stringify({ 'code': '06897' })
  // const userInfo = JSON.stringify({ 'code': '00005' })
  // const userInfo = JSON.stringify({ 'code': '03433' })

  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': userInfo
  }
  // if (debug) {
    return method === 'GET' ?
      user_service({
        url: url,
        method: method,
        headers: header,
        params: data
      }).then((result) => {
        return Promise.resolve(result)
      }) : user_service({
        url: url,
        method: method,
        headers: header,
        data: data
      }).then((result) => {
        return Promise.resolve(result)
      })
  // } 
  // else {
    // return method === 'GET' ?
    //   axios({
    //     url: '/pro' + url,
    //     method: method,
    //     headers: header,
    //     params: data
    //   }).then((result) => {
    //     return Promise.resolve(result)
    //   }) : axios({
    //     url: '/pro' + url,
    //     method: method,
    //     headers: header,
    //     data: data
    //   }).then((result) => {
    //     return Promise.resolve(result)
    //   })
  // }
}

// const debug = process.env.NODE_ENV === 'production'
export function RequestQueryOne(url, method = 'get', data) {
  const code = sessionStorage.getItem('personnelCode')
  const userInfo = JSON.stringify({ 'code': code })
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': userInfo
  }
    return method === 'GET' ?
      user_service({
        url: url,
        method: method,
        headers: header,
        params: data,
        timeout:5000
      }).then((result) => {
        return Promise.resolve(result)
      }) : user_service({
        url: url,
        method: method,
        headers: header,
        data: data,
        timeout:5000
      }).then((result) => {
        return Promise.resolve(result)
      })
}
